package poly.foodease.Controller.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import poly.foodease.Model.Entity.FoodVariationToppings;
import poly.foodease.Repository.FoodVariatonToppingDao;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class FoodVariationToppingApi {
@Autowired
FoodVariatonToppingDao foodVariatonToppingDao;

@GetMapping("/findVariationTopping/{id}")
public ResponseEntity<List<FoodVariationToppings>> findVariationTopping(@PathVariable("id") Integer id)
{
	return ResponseEntity.ok(foodVariatonToppingDao.findFoodVariationToppingById(id));
}
	

}
