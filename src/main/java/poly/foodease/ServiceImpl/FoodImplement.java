package poly.foodease.ServiceImpl;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.FoodImage;
import poly.foodease.Model.Entity.Foods;
import poly.foodease.Model.Request.FoodRequest;
import poly.foodease.Model.Response.FoodResponse;
import poly.foodease.Repository.FoodCategoryDao;
import poly.foodease.Repository.FoodImageDao;
import poly.foodease.Repository.FoodsDao;
import poly.foodease.Service.FoodsService;


@Service
public class FoodImplement implements FoodsService {


	@Autowired
	FoodsDao foodRepository;

	@Override
	public List<Foods> findAll() {
		return foodRepository.findAll();
	}

	@Override
	public List<Foods> findByCategoryMainDishes() {
		return null;
	}

	@Override
	public List<Foods> findByCategoryDrink() {
		return null;
	}

	@Override
	public FoodResponse createFood(FoodRequest foodRequest) {

		Foods newFood = Foods.builder()
				.foodName(foodRequest.getFoodName())
				.description(foodRequest.getDescription())
				.basePrice(foodRequest.getBasePrice())
				.imageUrl(foodRequest.getImage())
				.discount(foodRequest.getDiscount())
				.categoryId(foodRequest.getCategoryId())
				.build();

		Foods savedFood = foodRepository.save(newFood);

		return FoodResponse.builder()
				.foodName(savedFood.getFoodName())
				.description(savedFood.getDescription())
				.basePrice(savedFood.getBasePrice())
				.createDate(savedFood.getCreatedAt())
				.build();
	}

	@Override
	public FoodResponse updateFood(int foodId, FoodRequest foodRequest) {
		return null;
	}

	@Override
	public void deleteFood(int foodId) {
		Foods food = foodRepository.findById(foodId).get();
		foodRepository.deleteById(food.getFoodId());
	}
}
