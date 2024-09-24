package poly.foodease.Controller.Api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import poly.foodease.Model.Entity.foodVariations;
import poly.foodease.Repository.FoodVariationsDao;
import poly.foodease.Service.FoodVariationsService;


@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class FoodVariationsApi {
	
	@Autowired
	FoodVariationsService foodVariationsService;
	@Autowired
	FoodVariationsDao foodVariationsDao;
	@Autowired
	FoodVariationsDao dao;


	@GetMapping("/findFoodVariationByMainDishes")
	public ResponseEntity<List<foodVariations>> findFoodVariationByMainDishes()
	{
		List<foodVariations> ListfoodVariations = foodVariationsService.findByCategoryMainDishes();
		return ResponseEntity.ok(ListfoodVariations);
	}
	@GetMapping("/findFoodVariationByDrink")
	public ResponseEntity<List<foodVariations>> findFoodVariationByDrink()
	{
		List<foodVariations> ListfoodVariations = foodVariationsService.findByCategoryDrink();
		return ResponseEntity.ok(ListfoodVariations);
	}
	@GetMapping("/findVaritionById/{id}")
	public ResponseEntity<foodVariations> findVariationById (@PathVariable ("id") Integer id)
	{
		return ResponseEntity.ok(foodVariationsService.findById(id).get());
	}
	
	@GetMapping("/findFoodVariationBySize")
	public ResponseEntity<foodVariations> findFoodSizeBySize(@RequestParam Integer id,@RequestParam String sizeName)
	{
		foodVariations foodVariations = foodVariationsService.findFoodVariationBySize(id,sizeName);
		return ResponseEntity.ok(foodVariations);
	}
	

}
