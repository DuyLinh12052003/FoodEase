package poly.foodease.Model.Entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FoodVariationToppingsId implements Serializable {

	  private int foodVariationId;
	  private int toppingId;

}
