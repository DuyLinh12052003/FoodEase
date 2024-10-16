package poly.foodease.Controller.Api;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import poly.foodease.Mapper.OrderMapper;
import poly.foodease.Model.Entity.FoodReview;
import poly.foodease.Model.Response.OrderResponse;
import poly.foodease.Service.FoodReviewService;
import poly.foodease.Service.OrderService;
import poly.foodease.Utils.MessageResponse;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class StatisticalApi {

    private final OrderService orderService;
    private final FoodReviewService foodReviewService;

    @GetMapping("/order/statistical")
    public ResponseEntity<MessageResponse> statistical(@RequestParam("month") Integer months, @RequestParam("year") Integer year) {
        List<OrderResponse> orderResponses = orderService.findDate(months, year);

        Map<Integer, Double> dailyRevenue = new HashMap<>();

        for (int day = 1; day <= 31; day++) {
            int finalDay = day;
            double totalRevenueForDay = orderResponses.stream()
                    .filter(order -> order.getOrderDate().getDayOfMonth() == finalDay)
                    .mapToDouble(OrderResponse::getTotalPrice)
                    .sum();
            if (totalRevenueForDay > 0) {
                dailyRevenue.put(day, totalRevenueForDay);
            }
        }


        Map<String, Object> chartData = new HashMap<>();
        chartData.put("labels", dailyRevenue.keySet());
        chartData.put("values", dailyRevenue.values());
        return new ResponseEntity<>(MessageResponse.builder()
                .code(200)
                .date(LocalDate.now())
                .message("Get Data successfully")
                .data(chartData)
                .build(), HttpStatus.OK);

    }

    @GetMapping("/food-review/filter")
    public ResponseEntity<List<FoodReview>> filterFoodReviews(
            @RequestParam(required = false) Integer rating,
            @RequestParam Integer month,
            @RequestParam Integer year
    ) {
        List<FoodReview> filteredReviews = foodReviewService.findByFilter(rating, month, year);

        return new ResponseEntity<>(filteredReviews, HttpStatus.OK);
    }

}
