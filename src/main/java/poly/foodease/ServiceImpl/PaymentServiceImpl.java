package poly.foodease.ServiceImpl;

import com.mservice.pay.Pay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import poly.foodease.Mapper.OrderMapper;
import poly.foodease.Model.Entity.Order;
import poly.foodease.Model.Request.OrderDetailsRequest;
import poly.foodease.Model.Request.OrderRequest;
import poly.foodease.Model.Response.*;
import poly.foodease.Repository.OrderRepo;
import poly.foodease.Service.CartService;
import poly.foodease.Service.OrderDetailsService;
import poly.foodease.Service.OrderService;
import poly.foodease.Service.PaymentService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    OrderService orderService;
    @Autowired
    private CartService cartService;
    @Autowired
    private OrderDetailsService orderDetailsService;

    public PaymentInfo createPaymentInfo(String orderInfo, Integer paymentStatus, String totalPrice, String paymentDateTime, String transactionId){
        PaymentInfo paymentInfo = new PaymentInfo(orderInfo,paymentStatus,paymentDateTime,totalPrice,transactionId);
        System.out.println( "Payment Info " + paymentInfo);
        return paymentInfo;
    }
    public OrderResponse createOrder(Integer cartId, String couponId , Integer paymentMethodId, Integer shipMethodId){
        System.out.println("Payment Service Impl ");
        System.out.println(cartId);
        System.out.println(paymentMethodId);
        System.out.println(shipMethodId);
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setUserId(1);
        orderRequest.setTotalPrice(cartService.getTotalPrice(cartId));
        orderRequest.setTotalQuantity(cartService.getTotalQuantity(cartId) );
        orderRequest.setOrderStatusId(2);
        orderRequest.setPaymentMethodId(paymentMethodId);
        orderRequest.setShipMethodId(shipMethodId);
        orderRequest.setDeliveryAddress("You Address");
        if(!couponId.equals("null") ){
            orderRequest.setCouponId(Integer.valueOf(couponId));
        }
       // System.out.println( orderRequest);
        return orderService.createOrder(orderRequest);
    }
    public List<OrderDetailsResponse> createOrderDetails(Integer orderId, Integer cartId){
        OrderDetailsRequest orderDetailsRequest = new OrderDetailsRequest();
        List<OrderDetailsResponse> orderDetailsResponses = new ArrayList<>();
        Cart cart = cartService.getCart(cartId);
        for (Map.Entry<Integer , CartItem> cartItem : cart.getItems().entrySet()){
            orderDetailsRequest.setFoodVaId(cartItem.getKey());
            System.out.println("Food Va Id " + cartItem.getKey());
            orderDetailsRequest.setOrderId(orderId);
            orderDetailsRequest.setPrice(cartItem.getValue().getPrice());
            orderDetailsRequest.setQuantity(cartItem.getValue().getQuantity());
            OrderDetailsResponse orderDetailsResponse = orderDetailsService.createOrderDetails(orderDetailsRequest);
            orderDetailsResponses.add(orderDetailsResponse);
        }
        return orderDetailsResponses;
    }
}
