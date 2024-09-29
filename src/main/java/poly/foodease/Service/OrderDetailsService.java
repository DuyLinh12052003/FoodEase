package poly.foodease.Service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Request.OrderDetailsRequest;
import poly.foodease.Model.Response.OrderDetailsResponse;

import java.util.Optional;

@Service
public interface OrderDetailsService {
    Page<OrderDetailsResponse> getAllOrderDetails(Integer pageCurrent, Integer pageSize, String sortOrder, String sortBy);
    Optional<OrderDetailsResponse> getOrderDetails(Integer orderDetailsId);
    Page<OrderDetailsResponse> getOrderDetailsByOrderId(Integer orderId, Integer pageCurrent, Integer pageSize, String sortOrder, String sortBy);
    OrderDetailsResponse createOrderDetails(OrderDetailsRequest orderDetailsRequest);
    Optional<OrderDetailsResponse> updateOrderDetails(Integer orderDetailsId, OrderDetailsRequest orderDetailsRequest);
}
