package poly.foodease.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.FoodImage;
import poly.foodease.Repository.FoodImageDao;
import poly.foodease.Service.FoodImageService;


@Service
public class FoodImageImplement implements FoodImageService {
	@Autowired
	FoodImageDao foodImageDao;

	@Override
	public List<FoodImage> findFoodImageByFoodId(Integer id) {
		// TODO Auto-generated method stub
		return foodImageDao.findFoodImageByFoodId(id);
	}
	
	

}
