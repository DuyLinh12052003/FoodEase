package poly.foodease.Model.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationRequest {

    private String name;
    private String email;
    private String phone;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private Integer guests;
    private Integer tableId; // ID của bàn được đặt
    private String tableName;

}
