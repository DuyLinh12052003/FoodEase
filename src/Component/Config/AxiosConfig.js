import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Thêm interceptor để chèn token vào header Authorization
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No token found"); // Cảnh báo nếu không có token
    }
    
    if (process.env.NODE_ENV === "development") {
      console.log("Request Config:", config); // Logging cấu hình request
    }

    return config;
  },
  (error) => {
    console.error("Request Error:", error); // Logging lỗi request
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý phản hồi từ server
axiosConfig.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Response Data:", response.data); // Logging dữ liệu phản hồi
    }
    return response;
  },
  (error) => {
    console.error("Response Error:", error); // Logging lỗi phản hồi
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Invalid Token"); // Xử lý khi token không hợp lệ
        window.location.href = "/login"; // Điều hướng đến trang đăng nhập
      } else if (error.response.status === 403) {
        console.error("Forbidden: You do not have access to this resource."); // Xử lý lỗi 403
      } else {
        console.error(
          `Error ${error.response.status}: ${
            error.response.data.message || "Unknown error"
          }`
        );
      }
    } else {
      console.error("Network Error:", error.message); // Xử lý lỗi mạng không có response
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
