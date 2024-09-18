package poly.foodease.Mapper;

import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import poly.foodease.Model.Entity.Order;
import poly.foodease.Model.Response.OrderResponse;

@Mapper(componentModel = "spring")
public abstract class OrderMapper {
    @Autowired
    CouponMapper couponMapper;


        public OrderResponse convertEnToRes(Order order){
            return OrderResponse.builder()
                    .orderId(order.getOrderId())
                    .orderDate(order.getOrderDate())
                    .orderTime(order.getOrderTime())
                    .coupon(couponMapper.convertEnToResponse(order.getCoupon()))
                    .orderStatus()
        }
}
