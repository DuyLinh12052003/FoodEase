package poly.foodease.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.Order;
import poly.foodease.Model.Request.OrderRequest;
import poly.foodease.Model.Response.OrderResponse;

import java.util.List;
import java.util.Optional;

@Service
public interface OrderService {
    Page<OrderResponse> getAllOrder(Integer pageCurrent, Integer pageSize, String sortOrder, String sortBy);
    Optional<OrderResponse> getOrderByOrderId(Integer orderId);
    OrderResponse createOrder(OrderRequest orderRequest);
    Optional<OrderResponse> updateOrder (Integer orderId, OrderRequest orderRequest);
    Page<OrderResponse> getOrderByUserName(String userName,Integer pageCurrent, Integer pageSize, String sortOrder, String sortBy);
    Page<OrderResponse> getOrderByStatusId(String userName, Integer orderStatusId ,Integer pageCurrent, Integer pageSize, String sortOrder, String sortBy);
    OrderResponse changeOrderStatus(Integer orderId, Integer orderStatusId);
    List<OrderResponse> changeOrderStatusToDelived();
    List<OrderResponse> findAll();
}
