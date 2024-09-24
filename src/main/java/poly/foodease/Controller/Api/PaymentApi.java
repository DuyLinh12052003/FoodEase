package poly.foodease.Controller.Api;

import com.stripe.exception.StripeException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import poly.foodease.ServiceImpl.MomoServiceImpl;
import poly.foodease.ServiceImpl.PayPalServiceImpl;
import poly.foodease.ServiceImpl.StripeServiceImpl;
import poly.foodease.ServiceImpl.VnPayServiceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/payment")
public class PaymentApi {

    @Autowired
    VnPayServiceImpl vnPayService;
    @Autowired
    PayPalServiceImpl payPalService;
    @Autowired
    StripeServiceImpl stripeService;
    @Autowired
    MomoServiceImpl momoService;


    @PostMapping("/byVnpay/{totalPrice}/{orderInfo}")
    public ResponseEntity<Object> paymentVnPay(
            @PathVariable("totalPrice") int totalPrice,
            @PathVariable("orderInfo") String orderInfo,
            @RequestParam(value = "couponId",required = false) Integer couponId,
            @RequestParam("baseReturnUrl") String baseReturnUrl
    ){
        orderInfo = orderInfo + "|couponId:" + couponId;
        Map<String,Object> result = new HashMap<>();
        try {
            result.put("success",true);
            result.put("message","Create Url Payment With VnPay");
            result.put("data",vnPayService.createPaymentUrl(totalPrice, orderInfo, baseReturnUrl));
        }catch (Exception e){
            result.put("success",false);
            result.put("message",e.getMessage());
            result.put("data",null);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/byPaypal/{totalPrice}/{orderInfo}")
    public ResponseEntity<Object> paymentByPayPal(
            @PathVariable("totalPrice") Integer totalPrice,
            @PathVariable("orderInfo") String orderInfo,
            @RequestParam(value = "couponId",required = false) Integer couponId,
            @RequestParam("baseReturnUrl") String baseReturnUrl
    ){
        orderInfo = orderInfo + "|couponId:" + couponId;
        Map<String,Object> result = new HashMap<>();
        try {
            result.put("success",true);
            result.put("message","Create Url Payment with PayPal");
            result.put("data",payPalService.createPaymentUrl(totalPrice, orderInfo, baseReturnUrl, baseReturnUrl));
        }catch (Exception e){
            result.put("success",false);
            result.put("message",e.getMessage());
            result.put("data",null);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/byStripe/{totalPrice}/{orderInfo}")
    public ResponseEntity<Object> createPaymentWithStripe(
            @PathVariable("totalPrice") Integer totalPrice,
            @PathVariable("orderInfo") String orderInfo,
            @RequestParam(value = "couponId",required = false) Integer couponId,
            @RequestParam("baseReturnUrl") String baseReturnUrl,
            @RequestBody List<Map<String,Object>> cartItems
    ) throws StripeException {
        orderInfo= orderInfo + "|couponId:" + couponId;
        System.out.println("Stripe " + cartItems);
        Map<String,Object> result = new HashMap<>();
        try {
            result.put("success",true);
            result.put("message","Create Payment Url with Stripe");
            result.put("data",stripeService.createPaymentUrlByStripe(orderInfo, totalPrice, baseReturnUrl, cartItems));
        }catch (Exception e){
            result.put("success",false);
            result.put("message",e.getMessage());
            result.put("data",null);
        }
        return ResponseEntity.ok(result);
    }


    @PostMapping("/byMomo/{totalPrice}/{orderInfo}/{username}")
    public ResponseEntity<Object> createPaymentByMomo(
            @PathVariable("totalPrice") long totalPrice,
            @PathVariable("orderInfo") String orderInfo,
            @PathVariable("username") String username,
            @RequestParam(value = "couponId",required = false) Integer couponId,
            @RequestParam("baseReturnUrl") String baseReturnUrl
    ){
        System.out.println("payment Momo");
        orderInfo= orderInfo + "|couponId:" + couponId;
        Map<String,Object> result = new HashMap<>();
        try {
            result.put("success",true);
            result.put("message","Create Payment With Momo");
            result.put("data",momoService.createUrlPaymentMomo(orderInfo,totalPrice,baseReturnUrl,username));
        }catch (Exception e){
            result.put("success",false);
            result.put("message",e.getMessage());
            result.put("data",null);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/ipn")
    public void checkPaymentByIpnMomo(@RequestBody Map<String, String> ipnData) throws Exception {
        System.out.println("IPN Data" + ipnData);
        momoService.verifyPayment(ipnData);
    }

    @GetMapping("/byMomo/getPaymentInfo")
    public ResponseEntity<Object> getPaymentInfoByMomo(HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        System.out.println("Get Payment Info byMomo");
        try {
            result.put("success",true);
            result.put("message","Get Payment Info By Momo");
            result.put("data",momoService.returnPayment(request));
        }catch (Exception e){
            result.put("success",false);
            result.put("message",e.getMessage());
            result.put("data",null);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/byVnpay/getPaymentInfo")
    public ResponseEntity<Object> getPaymentInfoByVnPay(HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        System.out.println("Get Payment Info VnPay");
        try {
            result.put("success",true);
            result.put("message","Get Payment Info By Vnpay");
            result.put("data",vnPayService.returnPayment(request));
        }catch (Exception e){
            result.put("success",false);
            result.put("message",e.getMessage());
            result.put("data",null);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/byPaypal/getPaymentInfo")
    public ResponseEntity<Object> getPaymentInfoByPaypal(HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        System.out.println("Get Payment Info PayPal");
        try {
            result.put("success",true);
            result.put("message","Get Payment Info By PayPal");
            result.put("data",payPalService.returnPayment(request));
        }catch (Exception e){
            result.put("success",false);
            result.put("message",e.getMessage());
            result.put("data",null);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/byStripe/getPaymentInfo")
    public ResponseEntity<Object> getPaymentInfoBySripe(HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        System.out.println("get payment Info by Stripe");
        try {
            result.put("success",true);
            result.put("message","Get Payment Info By Stripe");
            result.put("data",stripeService.returnPaymentByStripe(request));
        }catch (Exception e){
            result.put("success",false);
            result.put("message",e.getMessage());
            result.put("data",null);
        }
        return ResponseEntity.ok(result);
    }

}
