package poly.foodease.Model.Entity;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="food_variations")
public class foodVariations implements Serializable{

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "food_variation_id")
	private int foodVariationId;
	private String imageUrl;
	private Date createdAt;
	private Date updatedAt;
	private int quantityStock;
	private int foodId;
	private int foodSizeId;
	@ManyToOne @JoinColumn(name="foodId",insertable = false,updatable = false)
	private Foods food;
	
	@ManyToOne @JoinColumn(name="foodSizeId",insertable = false,updatable = false)
	private foodSize foodSize;
	
	@OneToMany (mappedBy = "foodVariations")
	@JsonIgnore
	private Set<foodVariationToppings> foodVariationToppings;

	@JsonIgnore
	@OneToMany(mappedBy = "foodVariations")
	private List<OrderDetails> orderDetails;

}
