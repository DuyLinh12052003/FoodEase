package poly.foodease.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.FoodSize;
import poly.foodease.Repository.FoodSizeDao;
import poly.foodease.Service.FoodSizeService;


@Service
public class FoodSizeImplement implements FoodSizeService {
@Autowired
FoodSizeDao foodSizeDao;
	
	@Override
	public FoodSize findFoodSizeBySize(String foodSizeName) {
		// TODO Auto-generated method stub
		return foodSizeDao.findFoodSizeBySize(foodSizeName);
	}

	@Override
	public List<FoodSize> findAll() {
		// TODO Auto-generated method stub
		return foodSizeDao.findAll();
	}

	

}
