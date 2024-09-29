package poly.foodease.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.foodVariations;
import poly.foodease.Repository.FoodVariationsDao;
import poly.foodease.Service.FoodVariationsService;


@Service
public class FoodVariationsImplement implements FoodVariationsService {
@Autowired
FoodVariationsDao foodVariationsDao;
	@Override
	public List<foodVariations> findByCategoryMainDishes() {
		// TODO Auto-generated method stub
		return foodVariationsDao.findByCategoryMainDishes();
	}
	@Override
	public List<foodVariations> findByCategoryDrink() {
		// TODO Auto-generated method stub
		return foodVariationsDao.findByCategoryDrink();
	}
	@Override
	public Optional<foodVariations> findById(Integer Id) {
		// TODO Auto-generated method stub
		return foodVariationsDao.findById(Id);
	}
	@Override
	public foodVariations findFoodVariationBySize(Integer id, String sizeName) {
		// TODO Auto-generated method stub
		return foodVariationsDao.findFoodVariationBySize(id, sizeName);
	}
	



}
