package poly.foodease.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poly.foodease.Model.Entity.Coupon;

public interface CouponRepo extends JpaRepository<Coupon,Integer> {
}
