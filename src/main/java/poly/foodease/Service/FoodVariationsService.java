package poly.foodease.Service;

import poly.foodease.Model.Entity.foodVariations;

import java.util.List;
import java.util.Optional;

public interface FoodVariationsService {

	List<foodVariations> findByCategoryMainDishes();
	List<foodVariations> findByCategoryDrink();
	Optional<foodVariations> findById(Integer id);
	foodVariations findFoodVariationBySize(Integer id,String Size);
}
