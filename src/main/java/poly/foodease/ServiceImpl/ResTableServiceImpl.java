package poly.foodease.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.foodease.Model.Entity.ResTable;
import poly.foodease.Repository.ResTableRepo;
import poly.foodease.Service.ResTableService;

@Service
public class ResTableServiceImpl implements ResTableService {

    @Autowired
    private ResTableRepo restaurantTableRepository;

    @Override
    public ResTable createTable(ResTable table) {
        return restaurantTableRepository.save(table);
    }

    @Override
    public List<ResTable> getAvailableTables() {
        return restaurantTableRepository.findByIsAvailableTrue(); // Giả sử bạn có phương thức này trong repository
    }

    @Override
    public ResTable findTableById(Integer id) {
        Optional<ResTable> optionalTable = restaurantTableRepository.findById(id);
        return optionalTable.orElse(null); // Trả về null nếu không tìm thấy
    }

    @Override
    public List<ResTable> findAvailableTablesByCapacity(int guests) {
        // Giả sử bạn có một dung lượng tối thiểu và tối đa
        int minCapacity = guests;
        int maxCapacity = guests + 1; // hoặc theo cách bạn muốn

        return restaurantTableRepository.findByCapacityBetween(minCapacity, maxCapacity);
    }
}
