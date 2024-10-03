package poly.foodease.Controller.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import poly.foodease.Model.Entity.FoodVariations;
import poly.foodease.Repository.FoodVariationsDao;
import poly.foodease.Service.FoodVariationsService;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class FoodVariationsApi {
	
	@Autowired
	FoodVariationsService foodVariationsService;
	@Autowired
	FoodVariationsDao dao;
	
	@GetMapping("/findFoodVariationByMainDishes")
	public ResponseEntity<List<FoodVariations>> findFoodVariationByMainDishes()
	{
		List<FoodVariations> ListfoodVariations = foodVariationsService.findByCategoryMainDishes();
		return ResponseEntity.ok(ListfoodVariations);
	}
	@GetMapping("/findFoodVariationByDrink")
	public ResponseEntity<List<FoodVariations>> findFoodVariationByDrink()
	{
		List<FoodVariations> ListfoodVariations = foodVariationsService.findByCategoryDrink();
		return ResponseEntity.ok(ListfoodVariations);
	}
	@GetMapping("/findVaritionById/{id}")
	public ResponseEntity<FoodVariations> findVariationById (@PathVariable ("id") Integer id)
	{
		return ResponseEntity.ok(foodVariationsService.findById(id).get());
	}
	@GetMapping("/findVaritionById1")
	public ResponseEntity<FoodVariations> findVariationById1 ()
	{		
		return ResponseEntity.ok(foodVariationsService.findById(6).get());
	}
	
	@GetMapping("/findFoodVariationBySize")
	public ResponseEntity<FoodVariations> findFoodSizeBySize(@RequestParam Integer id,@RequestParam String sizeName)
	{
		FoodVariations foodVariations = foodVariationsService.findFoodVariationBySize(id,sizeName);
		return ResponseEntity.ok(foodVariations);
	}


}
