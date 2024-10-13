package poly.foodease.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poly.foodease.Model.Entity.ResTable;

import java.util.List;
import java.util.Optional;
public interface ResTableRepo extends JpaRepository<ResTable, Integer> {
    List<ResTable> findAllByIsAvailable(boolean isAvailable);

    Boolean existsByTableName(String name);

    List<ResTable> findByIsAvailableTrue(); // Định nghĩa phương thức

    List<ResTable> findByCapacityBetween(int minCapacity, int maxCapacity);
}
