package poly.foodease.Model.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name ="order_time")
    private LocalTime orderTime;

    @Column(name="delivery_address")
    private String deleveryAddress;

    @Column(name="update_at")
    private LocalDateTime updateAt;

    @Column(name="total_price")
    private Double totalPrice;

    @Column(name="total_quantity")
    private Integer totalQuantity;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="ship_id")
    private ShipMethod shipMethod;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="payment_id")
    private PaymentMethod paymentMethod;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name ="order_status_id")
    private OrderStatus orderStatus;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name ="coupon_id")
    private Coupon coupon;

    @JsonIgnore
    @OneToMany(mappedBy = "order")
    private List<OrderDetails> orderDetails;
}
