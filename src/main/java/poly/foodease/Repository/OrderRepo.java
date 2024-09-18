package poly.foodease.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poly.foodease.Model.Entity.Order;

public interface OrderRepo extends JpaRepository<Order ,Integer> {
}
