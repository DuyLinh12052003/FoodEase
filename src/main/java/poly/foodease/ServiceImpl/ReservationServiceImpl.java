package poly.foodease.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Mapper.ReservationMapper;
import poly.foodease.Model.Entity.ResTable;
import poly.foodease.Model.Entity.Reservation;
import poly.foodease.Model.Entity.User;
import poly.foodease.Model.Request.ReservationRequest;
import poly.foodease.Model.Response.ReservationResponse;
import poly.foodease.Repository.ResTableRepo;
import poly.foodease.Repository.ReservationRepository;
import poly.foodease.Repository.UserRepo;
import poly.foodease.Service.ReservationService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ReservationServiceImpl implements ReservationService {


    @Autowired
    private ResTableRepo resTableRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReservationMapper reservationMapper;

    @Autowired
    private UserRepo userRepository;


    @Override
    public ReservationResponse createReservation(ReservationRequest request) {

        // Kiểm tra xem bàn còn trống không
        Optional<ResTable> tableOptional = resTableRepository.findByIdAndIsAvailable(request.getTableId(), true);
        if(!tableOptional.isPresent()){
            throw new RuntimeException("Table not available or does not exits. ");
        }

        // Lấy thông tin người dùng từ userId
        Optional<User> userOptional = userRepository.findById(Math.toIntExact(request.getUserId()));
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User does not exist.");
        }

        ResTable resTable = tableOptional.get();
        User user = userOptional.get();

        // Chuyển đổi ReservationRequest sang Reservation Entity
        Reservation reservation = reservationMapper.toEntity(request);
        reservation.setResTable(resTable);
        reservation.setUser(user);

        // Lưu thông tin đặt bàn
        Reservation savedReservation = reservationRepository.save(reservation);

        // Đánh dấu bàn đã có người đặt
        resTable.setAvailable(false);
        resTableRepository.save(resTable);

        // Chuyển đổi Reservation entity sang ReservationResponse và trả về
        return reservationMapper.toResponse(savedReservation);
    }

    @Override
    public List<ReservationResponse> getUserReservationHistory(Long userId) {

        // Lấy tất cả các bàn đã đặt của user dựa trên userId
        List<Reservation> reservations = reservationRepository.findByUserUserId(userId);

        // Chuyển đổi danh sách entity sang danh sachs DTO để trả về
        return reservations.stream()
                .map(reservationMapper::toResponse)
                .collect(Collectors.toList());
    }
}
