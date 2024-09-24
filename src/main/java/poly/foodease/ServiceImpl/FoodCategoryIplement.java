package poly.foodease.ServiceImpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.foodCategories;
import poly.foodease.Repository.FoodCategoryDao;
import poly.foodease.Service.FoodCategoryService;

import java.util.List;


@Service
public class FoodCategoryIplement implements FoodCategoryService {
	@Autowired
	FoodCategoryDao foodCategoryDao;
	@Override
	public List<foodCategories> findAll() {
		// TODO Auto-generated method stub
		return foodCategoryDao.findAll();
	}



}
