package poly.foodease.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import poly.foodease.Model.Entity.foodSize;


public interface FoodSizeDao extends JpaRepository<foodSize, Integer>{
	@Query("SELECT fs FROM foodSize fs where fs.foodSizeName Like ?1")
	foodSize findFoodSizeBySize (String sizeName);
}
