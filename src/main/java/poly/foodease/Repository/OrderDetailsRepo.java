package poly.foodease.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poly.foodease.Model.Entity.OrderStatus;

public interface OrderDetailsRepo extends JpaRepository<OrderStatus, Integer> {
}
