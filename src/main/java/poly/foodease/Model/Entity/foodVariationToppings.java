package poly.foodease.Model.Entity;

import java.io.Serializable;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="food_variation_toppings")
public class foodVariationToppings implements Serializable{
	@EmbeddedId
	private FoodVariationToppingsId id;
	private int foodVariationId;
	private int toppingId;

	  @ManyToOne
	  @JsonIgnore
	    @MapsId("foodVariationId")
	    @JoinColumn(name = "foodVariationId", insertable = false, updatable = false)
	    private foodVariations foodVariations;

	    @ManyToOne
	    @JsonIgnore
	    @MapsId("toppingId")
	    @JoinColumn(name = "toppingId", insertable = false, updatable = false)
	    private toppings toppings;
}
