package poly.foodease.Service;

import poly.foodease.Model.Entity.foodSize;

import java.util.List;


public interface FoodSizeService {
	foodSize findFoodSizeBySize(String foodSizeName);
	List<foodSize> findAll();
}
