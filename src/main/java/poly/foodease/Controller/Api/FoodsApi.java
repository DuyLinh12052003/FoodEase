package poly.foodease.Controller.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import poly.foodease.Service.FoodCategoryService;
import poly.foodease.Service.FoodsService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class FoodsApi {
	@Autowired
	FoodsService foodService;
	@Autowired
	FoodCategoryService foodCategoryService;
//	@GetMapping("/findByCategoryMainDishes")
//	public ResponseEntity<List<Foods>> findByCategoryMainDishes()
//	{
//		List<Foods> findByCategoryMainDishes =foodService.findByCategoryMainDishes();
//		return ResponseEntity.ok(findByCategoryMainDishes);
//	}
//	@GetMapping("/findByCategoryDrink")
//	public ResponseEntity<List<Foods>> findByCategoryDrink ()
//	{
//		List<Foods> findByCategoryDrink =foodService.findByCategoryDrink();
//		return ResponseEntity.ok(findByCategoryDrink);
//	}
//	

}
