package poly.foodease.Service;

import poly.foodease.Model.Entity.FoodImage;

import java.util.List;


public interface FoodImageService {
List<FoodImage> findFoodImageByFoodId(Integer id);
}
