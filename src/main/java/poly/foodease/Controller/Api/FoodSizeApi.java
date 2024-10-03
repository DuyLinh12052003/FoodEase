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
import poly.foodease.Model.Entity.FoodSize;
import poly.foodease.Service.FoodSizeService;


@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class FoodSizeApi {
	@Autowired
	FoodSizeService foodSizeService;
	@GetMapping("/findFoodSizeBySize")
	public ResponseEntity<FoodSize> findFoodSizeBySize(@RequestParam String sizeName)
	{
		FoodSize foodSize = foodSizeService.findFoodSizeBySize(sizeName);
		return ResponseEntity.ok(foodSize);
	}
	@GetMapping("/findAllFoodSize")
	public ResponseEntity<List<FoodSize>> findAllFoodSize()
	{
		return ResponseEntity.ok(foodSizeService.findAll());
	}
	

}
