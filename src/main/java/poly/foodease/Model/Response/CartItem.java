package poly.foodease.Model.Response;
import poly.foodease.Model.Entity.foodVariations;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {
    private Integer quantity;
    private foodVariations foodVariation;
    private Double price;
}
