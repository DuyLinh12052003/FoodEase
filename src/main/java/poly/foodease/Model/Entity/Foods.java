package poly.foodease.Model.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="foods")
public class Foods {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int foodId ;
    private String foodName;
    private String description;
    private double basePrice;
    private String imageUrl;
    private Date createdAt;
    private Date updatedAt;
    private int categoryId;
    @Column(name="id_price")
    private String idPrice;
    @ManyToOne @JoinColumn(name="categoryId",insertable = false,updatable = false)
    private foodCategories category;
    @OneToMany(mappedBy = "food")
    @JsonIgnore
    private List<foodVariations> foodVariations;
}
