package poly.foodease.Service;

import poly.foodease.Model.Entity.FoodVariationToppings;

import java.util.List;


public interface FoodVariationToppingService {

	List<FoodVariationToppings> findFoodVariationToppingById(Integer id);
}
