package poly.foodease.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.FoodReview;
import poly.foodease.Repository.FoodReviewDao;
import poly.foodease.Service.FoodReviewService;


@Service
public class FoodReviewImplement implements FoodReviewService {
		@Autowired
		FoodReviewDao foodReviewDao;
		@Override
	public List<FoodReview> findFoodReviewByFoodId(Integer id) {
		// TODO Auto-generated method stub
		return foodReviewDao.findFoodReviewByFoodId(id);
	}
		@Override
		public FoodReview save(FoodReview foodReview) {
			// TODO Auto-generated method stub
			return foodReviewDao.save(foodReview);
		}

	@Override
	public List<FoodReview> findByFilter(Integer rating, Integer month, Integer year) {
		return  foodReviewDao.findByFilter(rating, month, year);
	}


}
