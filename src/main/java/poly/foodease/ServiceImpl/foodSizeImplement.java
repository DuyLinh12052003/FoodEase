package poly.foodease.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.foodease.Model.Entity.foodSize;
import poly.foodease.Repository.FoodSizeDao;
import poly.foodease.Service.FoodSizeService;

@Service
public class foodSizeImplement implements FoodSizeService {
@Autowired
FoodSizeDao foodSizeDao;
	
	@Override
	public foodSize findFoodSizeBySize(String foodSizeName) {
		// TODO Auto-generated method stub
		return foodSizeDao.findFoodSizeBySize(foodSizeName);
	}

	@Override
	public List<foodSize> findAll() {
		// TODO Auto-generated method stub
		return foodSizeDao.findAll();
	}

	

}
