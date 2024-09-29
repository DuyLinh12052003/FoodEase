package poly.foodease.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poly.foodease.Model.Entity.User;

public interface UserRepo extends JpaRepository<User,Integer> {
}
