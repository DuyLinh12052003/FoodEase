package poly.foodease.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.FoodVariations;
import poly.foodease.Repository.FoodVariationsDao;
import poly.foodease.Service.FoodVariationsService;


@Service
public class FoodVariationsImplement implements FoodVariationsService {
@Autowired
FoodVariationsDao foodVariationsDao;
	@Override
	public List<FoodVariations> findByCategoryMainDishes() {
		// TODO Auto-generated method stub
		return foodVariationsDao.findByCategoryMainDishes();
	}
	@Override
	public List<FoodVariations> findByCategoryDrink() {
		// TODO Auto-generated method stub
		return foodVariationsDao.findByCategoryDrink();
	}
	@Override
	public Optional<FoodVariations> findById(Integer Id) {
		// TODO Auto-generated method stub
		return foodVariationsDao.findById(Id);
	}
	@Override
	public FoodVariations findFoodVariationBySize(Integer id, String sizeName) {
		// TODO Auto-generated method stub
		return foodVariationsDao.findFoodVariationBySize(id, sizeName);
	}
//	@Override
//	public List<FoodVariationDTO> findByCategoryMainDishesDTO() {
//		// TODO Auto-generated method stub
//		List<FoodVariations> List=foodVariationsDao.findAll();
//		return FoodvariationMapper.INSTANCE.toDTOList(List);
//	}
	



}
