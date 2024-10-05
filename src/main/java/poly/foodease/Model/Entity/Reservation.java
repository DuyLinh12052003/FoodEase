package poly.foodease.Model.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Table(name = "reservations")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
// Bảng đặt bàn
public class Reservation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "table_id", nullable = false)
    private ResTable resTable;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String customerName;
    private int numberOfGuests;
    private LocalDateTime reservationTime;

}
