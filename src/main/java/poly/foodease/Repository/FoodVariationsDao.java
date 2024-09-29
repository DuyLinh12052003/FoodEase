package poly.foodease.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import poly.foodease.Model.Entity.foodVariations;


public interface FoodVariationsDao extends JpaRepository<foodVariations, Integer>{
@Query("SELECT fv FROM foodVariations fv where fv.food.categoryId = 1 and fv.foodSize.foodSizeId= 1")
List<foodVariations> findByCategoryMainDishes();
@Query("SELECT fv FROM foodVariations fv where fv.food.categoryId = 2 and fv.foodSize.foodSizeId= 1")
List<foodVariations> findByCategoryDrink();

@Query("SELECT fv FROM foodVariations fv where fv.foodId = ?1 and fv.foodSize.foodSizeName like ?2")
foodVariations findFoodVariationBySize( Integer id,  String sizeName);
}
