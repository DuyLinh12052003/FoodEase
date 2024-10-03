package poly.foodease.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import poly.foodease.Model.Entity.FoodCategories;


public interface FoodCategoryService {
	
	List<FoodCategories> findAll();
} 
