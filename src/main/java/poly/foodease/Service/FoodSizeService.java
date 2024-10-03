package poly.foodease.Service;

import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.FoodSize;

import java.util.List;

@Service
public interface FoodSizeService {
	FoodSize findFoodSizeBySize(String foodSizeName);
	List<FoodSize> findAll();
}
