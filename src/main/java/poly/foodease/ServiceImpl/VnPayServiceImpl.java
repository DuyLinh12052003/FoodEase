package poly.foodease.ServiceImpl;


import com.google.zxing.WriterException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Response.OrderDetailsResponse;
import poly.foodease.Model.Response.OrderResponse;
import poly.foodease.Model.Response.PaymentInfo;
import poly.foodease.Service.CartService;
import poly.foodease.Service.PaymentService;
import poly.foodease.Service.VnPayService;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class VnPayServiceImpl {

    @Autowired
    private VnPayService vnPayService;
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private CartService cartService;

    // Tạo giao dịch bằng và trả về đường dẫn giúp dẫn tới trang thanh toán của VnPay
    public String createPaymentUrl(int totalPrice, String orderInfo, String returnUrl ) throws UnsupportedEncodingException {
        System.out.println("returnUrlr" + returnUrl);
        String paymentUrl= vnPayService.createOrder(totalPrice, orderInfo, returnUrl );
        return paymentUrl;
    }

    public PaymentInfo returnPayment(HttpServletRequest request) throws IOException, ParseException, WriterException {
        PaymentInfo  paymentInfo = new PaymentInfo();
        // request chứa thông tin sẽ được đưa vào hàm orderReturn để kiếm tra bảo mật và cập nhật trạng thái
        // Sau đó trả về trạng thái thanh toán và các thông tin liên quan .
        int paymentStatus = vnPayService.orderReturn(request);
        // tao dto paymentInfo de lay du lieu payment cho font-end ;
        request.setCharacterEncoding("UTF-8");
        String totalPrice =request.getParameter("vnp_Amount");
        System.out.println("Total Price Vn Pay : "+ totalPrice);
        String vnp_PayDate = request.getParameter("vnp_PayDate");
        String vnp_OrderInfo= request.getParameter("vnp_OrderInfo");
        String vnp_TransactionId = request.getParameter("vnp_TransactionId");
        // OrderInfo do nguoi dung tu dinh nghia, o day dinh nghia la cardId == key trong Map<CartId,Cart> MapStore
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime dateTime = LocalDateTime.parse(vnp_PayDate, formatter);

        System.out.println("OrderInfo " + vnp_OrderInfo);
        String couponId = "null";
        String orderInfo= null;
        if (vnp_OrderInfo != null && vnp_OrderInfo.contains("|couponId:")) {
            // Tách chuỗi ban đầu theo "|couponId:"
            String[] parts = vnp_OrderInfo.split("\\|couponId:");
            // Phần đầu là orderInfo
            orderInfo = parts[0].trim();
            // Phần thứ hai là couponId
            if (parts.length > 1) {
                couponId= parts[1].trim();
            }
        }
//        String jwtToken = request.getHeader("Authorization").substring(7);
//        String username = jwtUtils.extractUsername(jwtToken);

        if(paymentStatus ==1 ){
            System.out.println("Payment Success");
            paymentInfo = paymentService.createPaymentInfo(orderInfo, paymentStatus, vnp_PayDate, totalPrice, vnp_TransactionId);
            // Tạo hóa đơn
            OrderResponse orderResponse = paymentService.createOrder(Integer.valueOf(orderInfo), couponId, 1, 1);
            // Dùng orderId vừa tạo để tạo hóa đơn chi tiết
            List<OrderDetailsResponse> orderDetailResponse = paymentService.createOrderDetails(orderResponse.getOrderId(),Integer.valueOf(orderInfo));
            // Xử lý Coupon usedCount và CouponStorage
//           paymentService.updateCouponStorageAndUsedCount(username,couponId);
//            // Gửi Email
            paymentService.sendEmail("huongpham",orderResponse ,orderDetailResponse );
            System.out.println("Payment Success1");
            cartService.removeCart(Integer.valueOf(orderInfo));
        }else{
            System.out.println("Payment Failed");
            paymentInfo.setPaymentStatus(0);
        }
        System.out.println(paymentInfo + "Payment Info Return");
        return paymentInfo;
    }

}
