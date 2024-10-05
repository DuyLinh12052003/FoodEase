package poly.foodease.Service;

import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.Foods;
import poly.foodease.Model.Request.FoodRequest;
import poly.foodease.Model.Response.FoodResponse;

import java.util.List;
import java.util.Optional;


@Service
public interface FoodsService {

	List<Foods> findAll();
	List<Foods> findByCategoryMainDishes();
	List<Foods> findByCategoryDrink();
	FoodResponse createFood(FoodRequest foodRequest);

	List<FoodResponse> getAllFoods();

	Optional<FoodResponse> getFoodById(int foodId);

	FoodResponse updateFood(int foodId, FoodRequest foodRequest);

	void deleteFood(int foodId);


}
