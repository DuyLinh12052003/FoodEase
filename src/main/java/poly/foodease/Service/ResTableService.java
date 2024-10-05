package poly.foodease.Service;

import java.util.List;

import poly.foodease.Model.Entity.ResTable;

public interface ResTableService {
    List<ResTable> getAvailableTables();

    ResTable findTableById(Integer tableId);

    ResTable createTable(ResTable table);
    
    List<ResTable> findAvailableTablesByCapacity(int guests);

}
