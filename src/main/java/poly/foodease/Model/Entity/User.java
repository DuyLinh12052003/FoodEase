package poly.foodease.Model.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Integer userId;

    @Column(name="user_name")
    private String userName;

    @Column(name="fullname")
    private String fullname;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Order> order;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<CouponStorage> couponStorages;

    @OneToMany (mappedBy = "user")
    @JsonIgnore
    private List<FoodReview> foodReviews;

}
