package poly.foodease.Mapper;

import org.mapstruct.Mapper;

import poly.foodease.Model.Entity.Foods;
import poly.foodease.Model.Response.FoodResponse;

@Mapper(componentModel = "spring")
public abstract class FoodMapper {
public FoodResponse converEntoResponse(Foods foods) {
	return FoodResponse.builder()
			.foodId(foods.getFoodId())
			.foodName(foods.getFoodName())
			.description(foods.getDescription())
			.basePrice(foods.getBasePrice())
			.imageUrl(foods.getImageUrl())
			.createdAt(foods.getCreatedAt())
			.updatedAt(foods.getUpdatedAt())
			.discount(foods.getDiscount())
			.categoryId(foods.getCategoryId())
			.foodVariations(foods.getFoodVariations())
			.foodImage(foods.getFoodImage())
			.foodReviews(foods.getFoodReviews())
			.build();
}
}
