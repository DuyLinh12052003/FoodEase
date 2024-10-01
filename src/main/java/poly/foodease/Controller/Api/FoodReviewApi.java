package poly.foodease.Controller.Api;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import poly.foodease.Model.Entity.FoodReview;
import poly.foodease.Service.FoodReviewService;
import poly.foodease.Service.UploadFileService;


@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class FoodReviewApi {
	@Autowired
	FoodReviewService foodReviewService;
	@Autowired
	UploadFileService uploadFileService;
	@GetMapping("/findfoodReviewByFoodId/{id}")
	public ResponseEntity<List<FoodReview>> findfoodReviewByFoodId(@PathVariable ("id") Integer id)
	{
		List<FoodReview> list=foodReviewService.findFoodReviewByFoodId(id);
		return ResponseEntity.ok(list);
	}
	
	@PostMapping("/comment")
	ResponseEntity<?>postComment (@RequestParam("file") MultipartFile file,@RequestParam("rating") Integer rating,@RequestParam("review") String review,
			@RequestParam("foodId") Integer foodId)
	{
		try {
			FoodReview foodReview =new FoodReview();
			foodReview.setRating(rating);
			foodReview.setReview(review);
			foodReview.setReviewDate(new Date());
			 if(!file.isEmpty())
			    {
			    	 String fileName=uploadFileService.uploadFile(file);
			    	 foodReview.setImageUrl(fileName);
			 		System.out.println("tên file là:"+fileName);
			    }
			 foodReview.setUserId(2);
			 foodReview.setFoodId(foodId);
			 foodReviewService.save(foodReview);
			 System.out.println("đã thực hiện comment");
				return ResponseEntity.ok("đã comment thành công");
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("không thành công comment");
			
			e.printStackTrace();
			
		}
		return null;
		
	
	}

}
