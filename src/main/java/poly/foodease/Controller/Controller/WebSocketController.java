package poly.foodease.Controller.Controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    // MessageMapping là endpoint để client kết nối và gửi tin nhắn ("/app/messages")
    // SendTo sẽ gửi tin nhắn từ hàm sendMessage về tất ca client đã đăng ký với đường dẫn /topic/message
    @MessageMapping("/messages")
    @SendTo("/topic/messages")
    public String sendMessage(String message) {
        System.out.println("Message " + message);
        String introduceMess = "Chào mừng bạn đến với web đặt đồ ăn trực tuyến của chúng tôi," +
                "  bạn có thể dễ dàng đặt món ăn từ các nhà hàng yêu thích," +
                " giao hàng tận nơi nhanh chóng và tiện lợi! Chúng tôi có thể giúp gì cho bạn ?";
        String couponMess = "Đây là những chương trình khuyến mãi mà chúng tôi có";
        String orderHisMess = "Đây là lịch sử hóa đơn của bạn";
        if(message.contains("mã giảm giá") || message.contains("chương trình khuyến mãi!")){
            return couponMess ;
        }else if(message.contains("lịch sử hóa đơn") || message.contains("order history")){
            return orderHisMess;
        }
        return introduceMess;
    }
}
