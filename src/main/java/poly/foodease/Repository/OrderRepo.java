package poly.foodease.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;
import poly.foodease.Model.Entity.Order;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order ,Integer> {

    @Query("SELECT o FROM Order o JOIN o.user u WHERE u.userName LIKE  :userName")
    Page<Order> getOrdersByUserName(@Param("userName") String userName, Pageable pageable);

    @Query("SELECT o FROM Order o JOIN o.orderStatus ost JOIN o.user u WHERE ost.orderStatusId = :orderStatusId AND u.userName=:userName")
    Page<Order> getOrderByStatusId(@Param("userName") String userName , @Param("orderStatusId") Integer orderStatusId , Pageable pageable);

    @Query("SELECT o FROM Order o JOIN o.orderStatus ost WHERE ost.orderStatusId = :orderStatusId")
    List<Order> getOrderIsShipping(@RequestParam("orderStatusId") Integer orderStatusId);

    @Query("SELECT o FROM Order o JOIN o.orderStatus ost WHERE ost.orderStatusId IN :orderStatusIds")
    List<Order> getOrdersToUpdate(@Param("orderStatusIds") List<Integer> orderStatusIds);

}
