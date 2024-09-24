package poly.foodease.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import poly.foodease.Model.Entity.Order;

public interface OrderRepo extends JpaRepository<Order ,Integer> {

    @Query("SELECT o FROM Order o JOIN o.user u WHERE u.userName LIKE  :userName")
    Page<Order> getOrdersByUserName(@Param("userName") String userName, Pageable pageable);
}
