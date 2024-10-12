package poly.foodease.Service;

import poly.foodease.Model.Entity.Foods;
import poly.foodease.Model.Response.FoodResponse;

import java.util.List;



public interface FoodsService {

	List<FoodResponse> findAll();
	
}
