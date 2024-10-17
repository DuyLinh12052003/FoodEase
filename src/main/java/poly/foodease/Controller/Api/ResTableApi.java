package poly.foodease.Controller.Api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poly.foodease.Mapper.ResTableMapper;
import poly.foodease.Model.Entity.ResTable;
import poly.foodease.Model.Request.ResTableRequest;
import poly.foodease.Model.Response.ResTableResponse;
import poly.foodease.Service.ResTableService;

@RestController
@RequestMapping("/api/tables")
@CrossOrigin("*")
public class ResTableApi {

    @Autowired
    private ResTableService restaurantTableService;

    @Autowired
    private ResTableMapper restaurantTableMapper;

    @PostMapping
    public ResponseEntity<ResTableResponse> createTable(@RequestBody ResTableRequest tableRequest) {
        ResTable table = restaurantTableMapper.toEntity(tableRequest);
        ResTable savedTable = restaurantTableService.createTable(table);
        ResTableResponse response = restaurantTableMapper.toResponse(savedTable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/available/{guests}")
    public ResponseEntity<List<ResTable>> getAvailableTables(@PathVariable int guests) {
        List<ResTable> availableTables = restaurantTableService.findAvailableTablesByCapacity(guests);
        return ResponseEntity.ok(availableTables);
    }
}
