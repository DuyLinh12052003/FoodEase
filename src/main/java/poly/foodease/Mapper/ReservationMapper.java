package poly.foodease.Mapper;


import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import poly.foodease.Model.Entity.Reservation;
import poly.foodease.Model.Request.ReservationRequest;
import poly.foodease.Model.Response.ReservationResponse;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    ReservationMapper INSTANCE = Mappers.getMapper(ReservationMapper.class);

    Reservation toEntity(ReservationRequest request);

    ReservationResponse toResponse(Reservation reservation);

}
