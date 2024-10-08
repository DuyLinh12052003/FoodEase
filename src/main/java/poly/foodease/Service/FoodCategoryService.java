package poly.foodease.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.FoodCategories;

@Service
public interface FoodCategoryService {
	
	List<FoodCategories> findAll();
} 
