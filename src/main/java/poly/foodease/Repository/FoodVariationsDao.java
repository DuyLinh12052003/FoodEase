package poly.foodease.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import poly.foodease.Model.Entity.FoodVariations;


public interface FoodVariationsDao extends JpaRepository<FoodVariations, Integer>{
@Query("SELECT fv FROM FoodVariations fv where fv.food.categoryId = 1 and fv.foodSize.foodSizeId= 1")
List<FoodVariations> findByCategoryMainDishes();
@Query("SELECT fv FROM FoodVariations fv where fv.food.categoryId = 2 and fv.foodSize.foodSizeId= 1")
List<FoodVariations> findByCategoryDrink();

@Query("SELECT fv FROM FoodVariations fv where fv.foodId = ?1 and fv.foodSize.foodSizeName like ?2")
FoodVariations findFoodVariationBySize( Integer id,  String sizeName);
}
