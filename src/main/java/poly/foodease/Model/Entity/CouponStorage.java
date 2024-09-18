package poly.foodease.Model.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="coupon_storage")
public class CouponStorage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="coupon_storage_id")
    private Integer couponStorageId;

}
