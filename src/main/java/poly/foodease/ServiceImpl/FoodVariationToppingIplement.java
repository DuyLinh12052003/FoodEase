package poly.foodease.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.FoodVariationToppings;
import poly.foodease.Repository.FoodVariatonToppingDao;
import poly.foodease.Service.FoodVariationToppingService;

@Service
public class FoodVariationToppingIplement implements FoodVariationToppingService {
@Autowired
FoodVariatonToppingDao foodVariatonToppingDao;
	@Override
	public List<FoodVariationToppings> findFoodVariationToppingById(Integer id) {
		// TODO Auto-generated method stub
		return foodVariatonToppingDao.findFoodVariationToppingById(id);
	}

	
}
