package poly.foodease.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.FoodCategories;
import poly.foodease.Model.Request.FoodCategoriesRequest;
import poly.foodease.Model.Response.FoodCategoriesReponse;
import poly.foodease.Repository.FoodCategoryDao;
import poly.foodease.Service.FoodCategoryService;


@Service
public class FoodCategoryIplement implements FoodCategoryService {

	@Autowired
	FoodCategoryDao foodCategoryDao;
	@Override
	public List<FoodCategories> findAll() {
		return foodCategoryDao.findAll();
	}

	@Override
	public FoodCategoriesReponse createCategories(FoodCategoriesRequest foodCategoriesRequest) {

		FoodCategories newCategories =FoodCategories.builder()
				.cartegoryName(foodCategoriesRequest.getFoodCategoriesName())
				.build();

		FoodCategories saveCategories = foodCategoryDao.save(newCategories);
		return FoodCategoriesReponse.builder()
				.foodCategoriesID(saveCategories.getCategoryId())
				.foodCategoriesName(saveCategories.getCartegoryName())
				.build();
	}

	@Override
	public void deleteCategories(Integer id) {
		FoodCategories foodCategories = foodCategoryDao.findById(id).get();
		foodCategoryDao.deleteById(foodCategories.getCategoryId());
	}


}
