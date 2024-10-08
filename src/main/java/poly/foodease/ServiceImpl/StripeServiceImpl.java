package poly.foodease.ServiceImpl;


import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Response.OrderDetailsResponse;
import poly.foodease.Model.Response.OrderResponse;
import poly.foodease.Model.Response.PaymentInfo;
import poly.foodease.Service.CartService;
import poly.foodease.Service.PaymentService;
import poly.foodease.Service.StripeService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class StripeServiceImpl {
    @Autowired
    private StripeService stripeService;
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private CartService cartService;

    public String createPaymentUrlByStripe(String orderInfo, Integer totalPrice, String baseReturnUrl , List<Map<String,Object>> cartItems) throws StripeException {
        String paymentUrl;
        try {
            paymentUrl = stripeService.createCheckoutSession(orderInfo,totalPrice,baseReturnUrl,cartItems);
        } catch (StripeException e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
        return paymentUrl;
    }


        public PaymentInfo returnPaymentByStripe(HttpServletRequest request) throws IOException {
        Session session = stripeService.returnPayment(request.getParameter("session_id"));
        PaymentInfo paymentInfo = new PaymentInfo();
        Integer paymentStatus ;
        String orderInfo_Parameter =session.getMetadata().get("orderInfo");
        String totalPrice_Parameter  =session.getMetadata().get("totalPrice");
        String dateTime_Parameter = session.getMetadata().get("dateTime");
        String transactionId_Parameter =  session.getId();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime dateTime = LocalDateTime.parse(dateTime_Parameter, formatter);

        String couponId = "null";
        String orderInfo= "null";
        if (orderInfo_Parameter != null && orderInfo_Parameter.contains("|couponId:")) {
            // Tách chuỗi ban đầu theo "|couponId:"
            String[] parts = orderInfo_Parameter.split("\\|couponId:");
            // Phần đầu là orderInfo
            orderInfo = parts[0].trim();
            // Phần thứ hai là couponId
            if (parts.length > 1) {
                couponId= parts[1].trim();
            }
        }
//        String jwtToken = request.getHeader("Authorization").substring(7);
//        String username = jwtUtils.extractUsername(jwtToken);
        if(session.getPaymentStatus().equals("paid")){
            paymentStatus=1;
            // Tạo Hóa Đơn
            OrderResponse orderResponse = paymentService.createOrder(Integer.valueOf(orderInfo), couponId, 1, 1);
            // Sau khi tạo hóa đơn thành công, tạo hóa đơn chi tiết
            List<OrderDetailsResponse> orderDetailResponses = paymentService.createOrderDetails(orderResponse.getOrderId(),Integer.valueOf(orderInfo));
            // Tạo mã Qr , gửi email
            //  paymentService.sendEmail(username, orderResponse, orderDetailResponses);
            // Xử lý cập nhật nghiệp vụ coupon
          //  paymentService.updateCouponStorageAndUsedCount(username, couponId);
        }else{
            paymentStatus =0;
        }
        paymentInfo =paymentService.createPaymentInfo(orderInfo, paymentStatus, dateTime_Parameter , totalPrice_Parameter , transactionId_Parameter );
        // Xóa thông tin giỏ hàng khi hoàn tất
        cartService.removeCart(Integer.valueOf(orderInfo));
        return paymentInfo;
    }
}

