package poly.foodease.ServiceImpl;


import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Response.OrderDetailsResponse;
import poly.foodease.Model.Response.OrderResponse;
import poly.foodease.Model.Response.PaymentInfo;
import poly.foodease.Service.CartService;
import poly.foodease.Service.PayPalService;
import poly.foodease.Service.PaymentService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class PayPalServiceImpl {
    @Autowired
    PayPalService paypalService;

    public static final String SUCCESS_URL = "/thanks/paypal";
    public static final String CANCEL_URL = "/thanks/paypal";
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private CartService cartService;

    public String createPaymentUrl(Integer totalPrice,String orderInfo,String cancelUrl,String successUrl) throws PayPalRESTException {
        String urlPayment = "";
        Payment payment = paypalService.createPayment(
                Double.valueOf(totalPrice),orderInfo,
                cancelUrl +CANCEL_URL,successUrl +SUCCESS_URL  );
        for (Links link : payment.getLinks()) {
            if (link.getRel().equals("approval_url")) {
                urlPayment = link.getHref();
            }
        }
        return urlPayment;
    }

    public PaymentInfo returnPayment(HttpServletRequest request) throws PayPalRESTException, IOException {
        PaymentInfo paymentInfo = new PaymentInfo() ;
        // Tạo ra đối tượng payment đại diện cho gia dịch
        Payment payment = paypalService.executePayment(request);
        // System.out.println(payment.toJSON());
        String paymentId =payment.getId();
        String datetime_parameter = payment.getCreateTime();
        String orderInfo_parameter = "";
        String totalPrice = "";
        String transactionId = "";
        Integer paymentStatus ;
        String couponId = "null";
        String orderInfo= null;
        // Parse dayTime từ request sang LocalDateTime
        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime dateTime = LocalDateTime.parse(datetime_parameter, DateTimeFormatter.ISO_DATE_TIME).plusHours(7);
        // Lấy jwtToken từ request và lấy ra user;
//        String jwtToken = request.getHeader("Authorization").substring(7);
//        String username = jwtUtils.extractUsername(jwtToken);

        for (Transaction transaction : payment.getTransactions()){
            transactionId = transaction.getRelatedResources().get(0).getSale().getId();
            totalPrice = transaction.getAmount().getTotal();
            orderInfo_parameter = transaction.getDescription();
        }
        // Xử lý tách orderId và couponId từ request
        if (orderInfo_parameter != null && orderInfo_parameter.contains("|couponId:")) {
            // Tách chuỗi ban đầu theo "|couponId:"
            String[] parts = orderInfo_parameter.split("\\|couponId:");
            // Phần đầu là orderInfo
            orderInfo = parts[0].trim();
            // Phần thứ hai là couponId
            if (parts.length > 1) {
                couponId= parts[1].trim();
            }
        }
        // Lấy ra State của payment , nếu approved thì xử lý nghiệp vụ và hóa đơn
        if(payment.getState().equals("approved")){
            paymentStatus= 1;
            // Tạo hóa đơn
            System.out.println("Payment By Paypal Success");
            OrderResponse orderResponse = paymentService.createOrder(Integer.valueOf(orderInfo), couponId, 1, 1);
            // Tạo hóa đơn chi tiết
            List<OrderDetailsResponse> orderDetailResponses = paymentService.createOrderDetails(orderResponse.getOrderId() , Integer.valueOf(orderInfo));
            // Xử lý nghiệp vụ CouponCout và CouponStorage
//            paymentService.updateCouponStorageAndUsedCount(username, couponId);
//            // Gửi email, tạo qr
//            paymentService.sendEmail(username, orderResponse, orderDetailResponses);
            // Xóa thông tin giỏ hàng trong Map sau khi hoàn tất
            cartService.removeCart(Integer.valueOf(orderInfo));
        }else{
            System.out.println("Thaat Baii");
            paymentStatus = 0;
        }
        paymentInfo = paymentService.createPaymentInfo(orderInfo,paymentStatus,datetime_parameter,totalPrice,transactionId);
        return paymentInfo;
    }

}
