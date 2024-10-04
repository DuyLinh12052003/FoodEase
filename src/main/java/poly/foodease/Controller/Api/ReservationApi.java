package poly.foodease.Controller.Api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import poly.foodease.Model.Request.ReservationRequest;
import poly.foodease.Model.Response.ReservationResponse;
import poly.foodease.Service.ReservationService;

import java.util.List;

@RestController
@RequestMapping("/api/reservation")
public class ReservationApi {


    @Autowired
    private ReservationService reservationService;

    // Lấy API thông tin bàn đặt từ sever về
    @PostMapping
    public ResponseEntity<ReservationResponse> createReservation(@RequestBody ReservationRequest request) {
        ReservationResponse response = reservationService.createReservation(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Tra về API người dungf lấy lịch sử đặt bàn
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<ReservationResponse>> getUserReservationHistory(@PathVariable Long userId){
        List<ReservationResponse> reservationHistory = reservationService.getUserReservationHistory(userId);
        return new ResponseEntity<>(reservationHistory, HttpStatus.OK);
    }


}
