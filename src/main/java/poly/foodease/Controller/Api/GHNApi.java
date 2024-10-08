package poly.foodease.Controller.Api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import poly.foodease.Service.GHNService;

import java.util.HashMap;
import java.util.Map;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/GHN")
public class GHNApi {

    @Autowired
    GHNService ghnService;

    @PostMapping("/getProvince")
    public ResponseEntity<Object> getProvince(){
        Map<String,Object> result = new HashMap<>();
        try {
            result.put("success",true);
            result.put("message","get Province");
            result.put("data", ghnService.getProvince());
        }catch (Exception e){
            result.put("success",false);
            result.put("message",e.getMessage());
            result.put("data", null);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/getDistrict/{provinceId}")
    public ResponseEntity<Object> getDistrictByProvinceId(
            @PathVariable("provinceId") Integer provinceId
    )  {
        Map<String,Object> result = new HashMap<>();
        try {
            result.put("success",true);
            result.put("message","get District");
            result.put("data", ghnService.getDistrict(provinceId));
        }catch (Exception e){
            result.put("success",false);
            result.put("message",e.getMessage());
            result.put("data", null);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/getWard/{districtId}")
    public ResponseEntity<Object> getWard(
            @PathVariable("districtId") Integer districtId
    ){
        Map<String,Object> result = new HashMap<>();
        try {
            result.put("success",true);
            result.put("message","get Ward");
            result.put("data", ghnService.getWard(districtId));
        }catch (Exception e){
            result.put("success",false);
            result.put("message",e.getMessage());
            result.put("data", null);
        }
        return ResponseEntity.ok(result);
    }
}
