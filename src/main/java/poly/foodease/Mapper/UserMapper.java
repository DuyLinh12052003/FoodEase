package poly.foodease.Mapper;

import org.mapstruct.Mapper;
import poly.foodease.Model.Entity.User;
import poly.foodease.Model.Response.UserResponse;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

    public UserResponse convertEnToRes(User user){
        return UserResponse.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .fullname(user.getFullname())
                .build();
    }
}
