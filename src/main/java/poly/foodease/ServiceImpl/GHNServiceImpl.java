package poly.foodease.ServiceImpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import poly.foodease.Service.GHNService;

import java.util.HashMap;
import java.util.Map;


@Service
public class GHNServiceImpl implements GHNService {
    @Autowired
    private RestTemplate restTemplate;

    private final String GHN_URL_PUBLIC = "https://online-gateway.ghn.vn/shiip/public-api/";
    private final String TOKEN = "58983ae0-8322-11ef-bbb6-a2edf3918909";

    public String getProvince (){
        String getProvince= "master-data/province";
        HttpHeaders headers = new HttpHeaders();
        headers.set("token", TOKEN);
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        ResponseEntity<String > response= restTemplate.exchange(GHN_URL_PUBLIC + getProvince, HttpMethod.POST,requestEntity,String.class);
        return response.getBody();
    }
    public String getDistrict(Integer provinceId) throws JsonProcessingException {
        String getDistrict = "master-data/district";
        HttpHeaders headers = new HttpHeaders();
        headers.set("token", TOKEN);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Tạo một map cho nội dung yêu cầu
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("province_id", provinceId);

        // Chuyển đổi map thành JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonRequestBody = objectMapper.writeValueAsString(requestBody);

        HttpEntity<String> requestEntity = new HttpEntity<>(jsonRequestBody, headers);
        ResponseEntity<String> response = restTemplate.exchange(GHN_URL_PUBLIC + getDistrict, HttpMethod.POST, requestEntity, String.class);
        return response.getBody();
    }
    public String getWard(Integer districtId) throws JsonProcessingException {
        String getWard = "master-data/ward";
        HttpHeaders headers = new HttpHeaders();
        headers.set("token", TOKEN);
        headers.setContentType(MediaType.APPLICATION_JSON);
        // Tạo một map cho nội dung yêu cầu
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("district_id", districtId);

        // Chuyển đổi map thành JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonRequestBody = objectMapper.writeValueAsString(requestBody);

        HttpEntity<String> requestEntity = new HttpEntity<>(jsonRequestBody, headers);
        ResponseEntity<String> response = restTemplate.exchange(GHN_URL_PUBLIC + getWard, HttpMethod.POST, requestEntity, String.class);
        return response.getBody();
    }

}
