package poly.foodease.Model.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "restables")
@Builder
// Bảng các bàn có trong nhà hàng
public class ResTable implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "table_id")
    private int tableId;

    @Column(name = "table_name")
    private String tableName;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "is_available")
    private Boolean isAvailable;

    public ResTable(Integer tableId) {
        this.tableId = tableId;
    }

}
