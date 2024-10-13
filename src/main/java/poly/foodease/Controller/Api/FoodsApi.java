package poly.foodease.Controller.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import poly.foodease.Model.Entity.Foods;
import poly.foodease.Model.Request.FoodRequest;
import poly.foodease.Model.Response.FoodResponse;
import poly.foodease.Service.FoodsService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/foods")
public class FoodsApi {

	@Autowired
	private FoodsService foodService;


	@GetMapping
	public List<Foods> getAll(){
		return foodService.findAll();
	}

	@PostMapping
	public FoodResponse createFood(@RequestBody FoodRequest foodRequest){
		return foodService.createFood(foodRequest);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteFood(@PathVariable int id){
		foodService.deleteFood(id);
		return ResponseEntity.noContent().build();
	}



}
