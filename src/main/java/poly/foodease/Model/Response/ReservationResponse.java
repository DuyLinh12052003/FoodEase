package poly.foodease.Model.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationResponse {

    private Long reservationId;
    private Long tableId;
    private String customerName;
    private int numberOfGuests;
    private LocalDateTime reservationTime;
    private boolean isSuccessful;

}
