package poly.foodease.Model.Request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodRequest {
    private String foodName;
    private String description;
    private double basePrice;
    private String image;
    private int discount;
    private int categoryId;
}
