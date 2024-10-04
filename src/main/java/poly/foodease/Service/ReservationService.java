package poly.foodease.Service;


import org.springframework.stereotype.Service;
import poly.foodease.Model.Request.ReservationRequest;
import poly.foodease.Model.Response.ReservationResponse;

import java.util.List;

@Service
public interface ReservationService {

    ReservationResponse createReservation(ReservationRequest request);

    List<ReservationResponse> getUserReservationHistory(Long userId);

}
