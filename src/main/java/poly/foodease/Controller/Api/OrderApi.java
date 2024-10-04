package poly.foodease.Controller.Api;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import poly.foodease.Service.OrderService;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/order")
public class OrderApi {

    @Autowired
    OrderService orderService;

    @GetMapping("/orderHistory/{userName}")
    public ResponseEntity<Object> getOrdersByUserName(
            @PathVariable("userName") String userName,
            @RequestParam("pageCurrent") Integer pageCurrent,
            @RequestParam("pageSize") Integer pageSize,
            @RequestParam("sortOrder") String sortOrder,
            @RequestParam("sortBy") String sortBy
    ){
        Map<String,Object> result = new HashMap<>();
        System.out.println("Get Order By UserName");
        System.out.println(orderService.getOrderByUserName(userName, pageCurrent, pageSize, sortOrder, sortBy));
        try {
            result.put("success", true);
            result.put("message","Get Orders by userName");
            result.put("data",orderService.getOrderByUserName(userName, pageCurrent, pageSize, sortOrder, sortBy));
        }catch (Exception e){
            result.put("success", false);
            result.put("message",e.getMessage());
            result.put("data",null);
        }
        return ResponseEntity.ok(result);
    }
}
