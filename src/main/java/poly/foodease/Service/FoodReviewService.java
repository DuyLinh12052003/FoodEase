package poly.foodease.Service;

import org.springframework.stereotype.Service;
import poly.foodease.Model.Entity.FoodReview;

import java.util.List;

@Service
public interface FoodReviewService {
	List<FoodReview> findFoodReviewByFoodId(Integer id);
	FoodReview save(FoodReview foodReview);
	List<FoodReview>  findByFilter(Integer rating,Integer month,Integer year );
}
