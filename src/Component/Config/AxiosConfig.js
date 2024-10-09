import axios from 'axios';
<<<<<<< HEAD
const axiosConfig = axios.create({
    baseURL : 'http://localhost:8080/api'
});

axiosConfig.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwtToken');
        if(token ){
            config.headers['Authorization'] = `Bearer ${token}`;
=======

const axiosConfig = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Thêm interceptor để chèn token vào header Authorization
axiosConfig.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; 
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

<<<<<<< HEAD
axiosConfig.interceptors.response.use(
    response => response,
    error => {
        if(error.response && error.response.status === 401){
            console.error('Invalid Token');
        }
        return Promise.reject(error);
    }
)

export default axiosConfig;
=======
// Thêm interceptor để xử lý phản hồi từ server
axiosConfig.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error('Invalid Token'); // Xử lý khi token không hợp lệ
            }
        }
        return Promise.reject(error); 
    }
);

export default axiosConfig;
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
