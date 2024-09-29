package poly.foodease.Model.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="food_categories")
public class foodCategories {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int categoryId;
    private String cartegoryName;
    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Foods> foods;
}
