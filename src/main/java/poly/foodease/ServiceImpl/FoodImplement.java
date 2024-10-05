package poly.foodease.ServiceImpl;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Mapper.FoodMapper;
import poly.foodease.Model.Entity.FoodImage;
import poly.foodease.Model.Entity.Foods;
import poly.foodease.Model.Request.FoodRequest;
import poly.foodease.Model.Response.FoodResponse;
import poly.foodease.Repository.FoodCategoryDao;
import poly.foodease.Repository.FoodImageDao;
import poly.foodease.Repository.FoodsDao;
import poly.foodease.Service.FoodsService;


@Service
public class FoodImplement implements FoodsService {
	
	@Autowired
	FoodsDao foodsDao;

	@Autowired
	private FoodMapper foodMapper;

	@Autowired
	private FoodImageDao foodImageRepository;

	@Autowired
	private FoodCategoryDao foodCategoriesRepository;

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

	@Override
	public FoodResponse createFood(FoodRequest foodRequest) {
		// Tạo đối tượng Foods
		Foods food = foodMapper.toEntity(foodRequest);
		Foods savedFood = foodsDao.save(food);

		// Lưu thông tin ảnh
		return getFoodResponse(foodRequest, savedFood);
	}

	private FoodResponse getFoodResponse(FoodRequest foodRequest, Foods savedFood) {
		if (foodRequest.getImageUrl() != null) {
			for (String imageUrl : foodRequest.getImageUrl()) {
				FoodImage foodImage = FoodImage.builder()
						.images(Collections.singletonList(imageUrl))
						.foodId(savedFood.getFoodId()) // Liên kết đến thực phẩm
						.build();
				foodImageRepository.save(foodImage);
			}
		}

		return foodMapper.toResponse(savedFood);
	}

	@Override
	public List<FoodResponse> getAllFoods() {
		List<Foods> foodsList = foodsDao.findAll();
		return foodsList.stream()
				.map(foodMapper::toResponse)
				.toList();
	}

	@Override
	public Optional<FoodResponse> getFoodById(int foodId) {
		return foodsDao.findById(foodId)
				.map(foodMapper::toResponse);
	}

	@Override
	public FoodResponse updateFood(int foodId, FoodRequest foodRequest) {
		Foods existingFood = foodsDao.findById(foodId)
				.orElseThrow(() -> new RuntimeException("Food not found"));

		existingFood.setFoodName(foodRequest.getFoodName());
		existingFood.setDescription(foodRequest.getDescription());
		existingFood.setBasePrice(foodRequest.getBasePrice());
		existingFood.setDiscount(foodRequest.getDiscount());
		existingFood.setCategoryId(foodRequest.getCategoryId());

		Foods updatedFood = foodsDao.save(existingFood);

		// Xóa tất cả ảnh cũ của thực phẩm trước khi thêm ảnh mới
		foodImageRepository.deleteByFoodId(foodId);

		// Lưu ảnh mới
		return getFoodResponse(foodRequest, updatedFood);
	}


	// Xóa món ăn
	@Override
	public void deleteFood(int id) {
		foodImageRepository.deleteByFoodId(id); // Xóa ảnh liên quan đến thực phẩm
		foodsDao.deleteById(id);
	}


}
