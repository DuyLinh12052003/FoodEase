package poly.foodease.Mapper;

import org.mapstruct.Mapper;
import poly.foodease.Model.Entity.Coupon;
import poly.foodease.Model.Response.CouponResponse;

@Mapper(componentModel = "spring")
public class CouponMapper {
    public CouponResponse convertEnToResponse(Coupon coupon){
        return CouponResponse.builder()
                .couponId(coupon.getCouponId())
                .code(coupon.getCode())
                .startDate(coupon.getStartDate())
                .endDate(coupon.getEndDate())
                .discountPercent(coupon.getDiscountpercent())
                .build();
    }
}
