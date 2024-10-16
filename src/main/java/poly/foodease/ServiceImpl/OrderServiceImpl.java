package poly.foodease.ServiceImpl;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import poly.foodease.Mapper.OrderMapper;
import poly.foodease.Model.Entity.Order;
import poly.foodease.Model.Request.OrderRequest;
import poly.foodease.Model.Response.OrderResponse;
import poly.foodease.Repository.OrderRepo;
import poly.foodease.Service.OrderService;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private  OrderRepo orderRepo;
    @Autowired
    private OrderMapper orderMapper;


    @Override
    public Page<OrderResponse> getAllOrder(Integer pageCurrent, Integer pageSize, String sortOrder, String sortBy) {
        Sort sort = Sort.by(new Sort.Order(Objects.equals(sortOrder, "asc") ? Sort.Direction.ASC : Sort.Direction.DESC,sortBy ));
        Pageable pageable = PageRequest.of(pageCurrent,pageSize,sort);
        Page<Order> orderPage = orderRepo.findAll(pageable);
        List<OrderResponse> orders = orderPage.getContent().stream()
                .map(orderMapper :: convertEnToRes)
                .collect(Collectors.toList());
        return new PageImpl<>(orders,pageable, orderPage.getTotalPages());
    }

    @Override
    public Optional<OrderResponse> getOrderByOrderId(Integer orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Not found Order"));
        return Optional.of(orderMapper.convertEnToRes(order));
    }

    @Override
    public OrderResponse createOrder(OrderRequest orderRequest) {
        Order order = orderMapper.convertReqToEn(orderRequest);
        Order orderCreated = orderRepo.save(order);
        System.out.println("Create Order");
        return orderMapper.convertEnToRes(orderCreated);
    }

    @Override
    public Optional<OrderResponse> updateOrderResponse(Integer orderId, OrderRequest orderRequest) {
        return Optional.of(orderRepo.findById(orderId).map(orderExists -> {
            Order order = orderMapper.convertReqToEn(orderRequest);
            order.setOrderId(orderExists.getOrderId());
            Order orderUpdated= orderRepo.save(order);
            return orderMapper.convertEnToRes(orderUpdated);
        })
                .orElseThrow(() -> new EntityNotFoundException("not found Order")));
    }

    @Override
    public Page<OrderResponse> getOrderByUserName(String userName,Integer pageCurrent, Integer pageSize, String sortOrder, String sortBy) {
        Sort sort = Sort.by(new Sort.Order(Objects.equals(sortOrder, "asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy));
        Pageable pageable = PageRequest.of(pageCurrent, pageSize, sort);
        Page<Order> orderPage = orderRepo.getOrdersByUserName(userName,pageable);
        List<OrderResponse> orders= orderPage.getContent().stream()
                .map(orderMapper :: convertEnToRes)
                .collect(Collectors.toList());
        return new PageImpl<>(orders,pageable,orderPage.getTotalElements());
    }

    @Override
    public List<OrderResponse> findDate(Integer month, Integer year) {
        return orderRepo.findByDate(month,year).stream().map(orderMapper::convertEnToRes).toList();
    }
}
