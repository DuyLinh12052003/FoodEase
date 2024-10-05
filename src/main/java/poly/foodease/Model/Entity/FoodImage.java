package poly.foodease.Model.Entity;

import java.util.List;

import aj.org.objectweb.asm.commons.Remapper;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="foods_image")
@Builder
public class FoodImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int foodsImageId;
	@ElementCollection // Chú ý ánh xạ danh sách chuỗi
	private List<String> images;
	private int foodId;
	
	@OneToMany (mappedBy = "foodImage")
	@JsonIgnore
	private List<Foods> foods;

}
