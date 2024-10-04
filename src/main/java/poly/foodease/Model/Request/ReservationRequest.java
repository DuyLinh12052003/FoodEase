package poly.foodease.Model.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationRequest {

    private Long tableId;
    private Long userId;
    private int numberOfGuests;
    private LocalDateTime reservationTime;

}
