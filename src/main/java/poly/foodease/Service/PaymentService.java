package poly.foodease.Service;

import org.springframework.stereotype.Service;
import poly.foodease.Model.Response.OrderDetailsResponse;
import poly.foodease.Model.Response.OrderResponse;
import poly.foodease.Model.Response.PaymentInfo;

import java.util.List;

@Service
public interface PaymentService {
    PaymentInfo createPaymentInfo(String orderInfo, Integer paymentStatus, String totalPrice, String paymentDateTime, String transactionId);
    OrderResponse createOrder(Integer cartId, String couponId , Integer paymentMethodId, Integer shipMethodId);
    List<OrderDetailsResponse> createOrderDetails(Integer orderId, Integer cartId);

}
