package poly.foodease.Service;

import poly.foodease.Model.Entity.Foods;

import java.util.List;



public interface FoodsService {

	List<Foods> findAll();
	List<Foods> findByCategoryMainDishes();
	List<Foods> findByCategoryDrink();
}
