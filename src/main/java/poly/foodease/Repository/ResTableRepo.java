package poly.foodease.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import poly.foodease.Model.Entity.ResTable;

import java.util.Optional;
public interface ResTableRepo extends JpaRepository<ResTable, Long> {
    Optional<ResTable> findByIdAndIsAvailable(Long id, boolean isAvailable);
}
