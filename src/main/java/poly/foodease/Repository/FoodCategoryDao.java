package poly.foodease.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poly.foodease.Model.Entity.foodCategories;

public interface FoodCategoryDao extends JpaRepository<foodCategories, Integer>{

}
