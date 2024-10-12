package poly.foodease.Controller.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poly.foodease.Model.Entity.FoodVariations;
import poly.foodease.Model.Response.FoodResponse;
import poly.foodease.Service.FoodCategoryService;
import poly.foodease.Service.FoodsService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/user/food")
public class FoodsApi {
	@Autowired
	FoodsService foodService;
	@Autowired
	FoodCategoryService foodCategoryService;
	

//	@GetMapping("/findByCategoryDrink")
//	public ResponseEntity<List<Foods>> findByCategoryDrink ()
//	{
//		List<Foods> findByCategoryDrink =foodService.findByCategoryDrink();
//		return ResponseEntity.ok(findByCategoryDrink);
//	}
//	
	
	@GetMapping("/findMain")
	public ResponseEntity<List<FoodResponse>> findAll()
	{
		List<FoodResponse> list = foodService.findAll();
		return ResponseEntity.ok(list);
	}

}
