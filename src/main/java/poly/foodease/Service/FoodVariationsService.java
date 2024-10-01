package poly.foodease.Service;

import poly.foodease.Model.Entity.FoodVariations;

import java.util.List;
import java.util.Optional;


public interface FoodVariationsService {

	List<FoodVariations> findByCategoryMainDishes();
	List<FoodVariations> findByCategoryDrink();
	Optional<FoodVariations> findById(Integer id);
	FoodVariations findFoodVariationBySize(Integer id,String Size);
	
//	List<FoodVariationDTO> findByCategoryMainDishesDTO();
}
