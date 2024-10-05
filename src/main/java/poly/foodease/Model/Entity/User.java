package poly.foodease.Model.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
