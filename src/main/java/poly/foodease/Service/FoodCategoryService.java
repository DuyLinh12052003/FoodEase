package poly.foodease.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import poly.foodease.Model.Entity.FoodCategories;
import poly.foodease.Model.Request.FoodCategoriesRequest;
import poly.foodease.Model.Response.FoodCategoriesReponse;


public interface FoodCategoryService {
	
	List<FoodCategories> findAll();

	FoodCategoriesReponse createCategories(FoodCategoriesRequest foodCategoriesRequest);

	void deleteCategories(Integer id);
}
