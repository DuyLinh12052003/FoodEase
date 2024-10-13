package poly.foodease.Model.Request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AdminTableRequest {
    private int capacity;
    private boolean is_available;
    private String tableName;
}
