package poly.foodease.Model.Response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodResponse {
    private int foodId;
    private String foodName;
    private String description;
    private double basePrice;
    private List<String> imageUrl;
    private Date createdAt;
    private Date updatedAt;
    private int discount;
    private int categoryId;
    private List<FoodVariationResponse> variations;
}
