package poly.foodease.Model.Entity;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="foods")
public class Foods implements Serializable{

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int foodId ;
	private String foodName;
	private String description;
	private double basePrice;
	private String imageUrl;
	private Date createdAt;
	private Date updatedAt;
	private int discount;
	private int categoryId;
	@ManyToOne @JoinColumn(name="categoryId",insertable = false,updatable = false)
	private FoodCategories category;
	@OneToMany(mappedBy = "food")
	@JsonIgnore
	private List<FoodVariations> foodVariations;
	
	@ManyToOne @JoinColumn(name ="foodId",insertable = false,updatable = false)
	private	FoodImage foodImage;
	@OneToMany(mappedBy = "food")
	@JsonIgnore
	private List<FoodReview> foodReviews;
}
