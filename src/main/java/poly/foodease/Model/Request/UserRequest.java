package poly.foodease.Model.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String username;
    private String fullname;
    private String password;
    private Boolean gender;
    private String address;
    private String imageUrl;
    private String phonenumber;
    private LocalDate birthday;
    private String email;
    private Boolean status;
    private List<Integer> roleIds ;
}