package poly.foodease.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poly.foodease.Model.Entity.FoodVariationToppingsId;
import poly.foodease.Model.Entity.foodVariationToppings;


public interface FoodVariatonToppingDao extends JpaRepository<foodVariationToppings, FoodVariationToppingsId>{

}
