package poly.foodease.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import poly.foodease.Model.Entity.toppings;

public interface ToppingDao extends JpaRepository<toppings, Integer> {

}
