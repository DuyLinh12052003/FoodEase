package poly.foodease.Service;

import java.util.List;

import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.Reservation;
@Service
public interface ReservationService {
    Reservation createReservation(Reservation reservation);

    List<Reservation> getAllReservations();

    Reservation updateReservationStatus(Integer Id, String status);

    Reservation getReservationById(Integer id); // Phương thức lấy đặt bàn theo ID

    void acceptReservation(Reservation reservation);

    void cancelReservation(Reservation reservation);

    Reservation save(Reservation reservation);

    Reservation findById(Integer id);

}