package poly.foodease.Mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import poly.foodease.Model.Entity.Foods;
import poly.foodease.Model.Request.FoodRequest;
import poly.foodease.Model.Response.FoodResponse;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FoodMapper {

    FoodMapper INSTANCE = Mappers.getMapper(FoodMapper.class);

    // Ánh xạ Foods sang FoodResponseDTO
    @Mapping(target = "imageUrl", source = "foodImage.images") // ánh xạ trực tiếp từ foodImage.images
    FoodResponse toResponse(Foods food);

    // Phương thức ánh xạ cho danh sách ảnh
    default List<String> mapImagesToList(String images) {
        return List.of(images.split(",")); // chuyển đổi chuỗi thành danh sách
    }

    default String mapListToImages(List<String> imageUrls) {
        return String.join(",", imageUrls); // chuyển đổi danh sách thành chuỗi
    }

    // Ánh xạ FoodRequestDTO sang Foods
    Foods toEntity(FoodRequest foodRequestDTO);

}
