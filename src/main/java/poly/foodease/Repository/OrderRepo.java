package poly.foodease.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import poly.foodease.Model.Entity.Order;
import poly.foodease.Model.Response.OrderResponse;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order ,Integer> {

    @Query("SELECT o FROM Order o JOIN o.user u WHERE u.userName LIKE  :userName")
    Page<Order> getOrdersByUserName(@Param("userName") String userName, Pageable pageable);

    @Query("SELECT o FROM Order o  WHERE MONTH(o.orderDate) = :month AND YEAR(o.orderDate) = :year")
    List<Order> findByDate(@Param("month") Integer month, @Param("year") Integer year);

}
