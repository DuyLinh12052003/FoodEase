package poly.foodease.Service;

import java.util.List;

import poly.foodease.Model.Response.FoodResponse;



public interface FoodsService {

	List<FoodResponse> findAll();
	
}
