package poly.foodease.Model.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {
    private Double totalPrice;
    private Integer totalQuantity;
    private Integer couponId;
    private Integer paymentMethodId;
    private Integer shipMethodId;
    private Integer userId;
    private Integer orderStatusId;
}
