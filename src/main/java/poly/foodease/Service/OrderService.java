package poly.foodease.Service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Request.OrderRequest;
import poly.foodease.Model.Response.OrderResponse;

import java.util.List;
import java.util.Optional;

@Service
public interface OrderService {
    Page<OrderResponse> getAllOrder(Integer pageCurrent, Integer pageSize, String sortOrder, String sortBy);
    Optional<OrderResponse> getOrderByOrderId(Integer orderId);
    OrderResponse createOrder(OrderRequest orderRequest);
    Optional<OrderResponse> updateOrderResponse(Integer orderId, OrderRequest orderRequest);
    Page<OrderResponse> getOrderByUserName(String userName,Integer pageCurrent, Integer pageSize, String sortOrder, String sortBy);
    List<OrderResponse> findDate(Integer month, Integer year);
}
