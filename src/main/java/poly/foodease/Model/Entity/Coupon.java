package poly.foodease.Model.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="coupons")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="coupon_id")
    private Integer couponId;

    @Column(name="code")
    private String code;

    @Column(name="discountpercent")
    private Double discountpercent;

    @Column(name ="start_date")
    private LocalDate startDate;

    @Column(name="end_date")
    private LocalDate endDate;

    @Column(name ="use_limit")
    private Integer userLimit;

    @Column(name="used_count")
    private Integer usedCount;

    @JsonIgnore
    @OneToMany(mappedBy = "coupon")
    private List<Order> orders;
}
