package poly.foodease.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.Foods;
import poly.foodease.Repository.FoodsDao;
import poly.foodease.Service.FoodsService;

@Service
public class FoodImplement implements FoodsService {
	
	@Autowired
	FoodsDao foodsDao;
	@Override
	public List<Foods> findAll() {
		
		return foodsDao.findAll();
	}
	@Override
	public List<Foods> findByCategoryMainDishes() {
		// TODO Auto-generated method stub
		return foodsDao.findByCategoryMainDishes();
	}
	@Override
	public List<Foods> findByCategoryDrink() {
		// TODO Auto-generated method stub
		return foodsDao.findByCategoryDrink();
	}

	

}
