package poly.foodease.ServiceImpl;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import poly.foodease.Mapper.OrderMapper;
import poly.foodease.Mapper.OrderReturnMapper;
import poly.foodease.Model.Entity.OrderDetails;
import poly.foodease.Model.Entity.OrderReturn;
import poly.foodease.Model.Request.OrderRequest;
import poly.foodease.Model.Request.OrderReturnRequest;
import poly.foodease.Model.Response.OrderResponse;
import poly.foodease.Model.Response.OrderReturnResponse;
import poly.foodease.Repository.OrderDetailsRepo;
import poly.foodease.Repository.OrderReturnRepo;
import poly.foodease.Service.OrderDetailsService;
import poly.foodease.Service.OrderReturnService;
import poly.foodease.Service.OrderService;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderReturnServiceImpl implements OrderReturnService {
    @Autowired
    OrderReturnRepo orderReturnRepo;
    @Autowired
    OrderReturnMapper orderReturnMapper;
    @Autowired
    OrderDetailsService orderDetailsService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private OrderDetailsRepo orderDetailsRepo;

    @Override
    public Page<OrderReturnResponse> getAllOrderReturn(Integer pageCurrent, Integer pageSize, String orderBy, String sortBy) {
        Sort sort = Sort.by(new Sort.Order(Objects.equals(orderBy, "asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy));
        Pageable pageable = PageRequest.of(pageCurrent, pageSize, sort);
        Page<OrderReturn> orderReturns = orderReturnRepo.findAll(pageable);
        List<OrderReturnResponse> orderReturnResponses = orderReturns.getContent().stream()
                .map(orderReturnMapper :: convertEnToRes)
                .collect(Collectors.toList());
        return new PageImpl<>(orderReturnResponses,pageable,orderReturns.getTotalElements());
    }

    @Override
    public List<OrderReturnResponse> getOrderReturnByOrderId(Integer orderId) {
        List<OrderReturn> orderReturns = orderReturnRepo.getOrderReturnByOrderId(orderId);
        return orderReturns.stream()
                .map(orderReturnMapper :: convertEnToRes)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderReturnResponse> createOrderReturn(OrderReturnRequest orderReturnRequest) {
        Integer orderId = orderReturnRequest.getOrderId();
//
//         List<OrderReturnResponse> orderReturnResponse = orderDetailsService.getOrderDetailsByOrderId(orderId).stream().map(orderDetail -> {
//            // Lấy ra list orderDetails từ orderId , sau đó tạo orderReturn theo từng productVariation
//            Integer foodVaId = orderDetail.getFoodVariations().getFoodVariationId();
//            orderReturnRequest.setFoodVaId(foodVaId);
//            OrderReturn orderReturn = orderReturnMapper.convertReqToEn(orderReturnRequest);
//                    System.out.println("Count");
//            OrderReturn orderReturnCreated = orderReturnRepo.save(orderReturn);
//            // Sau khi tạo bảng cho orderReturn , tiến hành cập nhật thông tin của bảng order và OrderDetail
//            return orderReturnMapper.convertEnToRes(orderReturnCreated);
//            })
//                .collect(Collectors.toList());
//
//        OrderResponse orderResponse = orderService.getOrderByOrderId(orderId)
//                .orElseThrow(()-> new EntityNotFoundException("Not found Order"));
//        OrderRequest orderRequest = orderMapper.convertResToReq(orderResponse);
//        // Sau khi lấy được order , thay đổi status thành số 4 -> Return Request
//        orderRequest.setOrderStatusId(5);
//        System.out.println("orderRequest" + orderRequest);
//        orderService.updateOrder(orderId, orderRequest);
        List<OrderReturnResponse> orderReturnResponse = orderDetailsRepo.getOrderDetailsByOrderId(orderId).stream().map(orderDetail -> {
                Integer foodVaId = orderDetail.getFoodVariations().getFoodVariationId();
                orderReturnRequest.setFoodVaId(foodVaId);
                OrderReturn orderReturn = orderReturnMapper.convertReqToEn(orderReturnRequest);
                OrderReturn orderReturnCreated = orderReturnRepo.save(orderReturn);
                return  orderReturnMapper.convertEnToRes(orderReturnCreated);
                })
                .collect(Collectors.toList());
        return orderReturnResponse;
    }

    @Override
    public List<OrderReturnResponse> approveOrderReturnRequest(Integer orderId,Boolean approve) {
        // Hàm xử lý khi admin phê duyệt Return
        // Nếu approve = true, cập nhật đơn hàng thành Returned, chuyển trạng thái orderReturn thành refund
        // Nếu approve = flase , chuyển đơn hàng về trạng thái Success! , chuyển trạng thái của orderReturn từ pending thành cancel
        OrderResponse orderResponse = orderService.getOrderByOrderId(orderId)
                .orElseThrow(()-> new EntityNotFoundException("Not found Order"));
        OrderRequest orderRequest = orderMapper.convertResToReq(orderResponse);
        // Lấy ra list orderReturn, tùy theo approve thay đổi status và update
        List<OrderReturnResponse> orderReturnResponse = this.getOrderReturnByOrderId(orderId).stream().map(orderReturn -> {
            if(approve){
                orderReturn.setStatus("Refunded");
            }else{
                orderReturn.setStatus("Refuse");
            }
            OrderReturnRequest orderReturnRequest = orderReturnMapper.convertResToReq(orderReturn);
                    System.out.println("OrderReturnRequest" + orderReturnRequest);
            OrderReturnResponse orderReturnUpdated = this.updateOrderReturn(orderReturn.getOrderReturnId(), orderReturnRequest)
                    .orElseThrow(() -> new EntityNotFoundException("Not found Order"));
            return orderReturnUpdated;
        })
                .collect(Collectors.toList());
        if(approve ){
            orderRequest.setOrderStatusId(7);
        }else{
            orderRequest.setOrderStatusId(6);
        }
        orderService.updateOrder(orderId, orderRequest);
        return orderReturnResponse;
    }

    @Override
    public Optional<OrderReturnResponse> updateOrderReturn(Integer oderReturnId, OrderReturnRequest orderReturnRequest) {
        return orderReturnRepo.findById(oderReturnId).map(orderReturnExists -> {
            OrderReturn orderReturn = orderReturnMapper.convertReqToEn(orderReturnRequest);
            orderReturn.setOrderReturnId(orderReturnExists.getOrderReturnId());
            OrderReturn orderReturnUpdated = orderReturnRepo.save(orderReturn);
            return orderReturnMapper.convertEnToRes(orderReturnUpdated);
        });
    }
}
