import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axiosConfig from '../../../Config/AxiosConfig';
import CartList from './CartList';
import CouponPopup from './CouponPopup';
import DeliveryAddressPopup from './DeliveryAddressPopup';
import './Payment.css';
import PaymentPopup from './PaymentPopup';
const CartPage = () => {
    const {cartId} = useParams();

    const [isOpenPayment,setIsOpentPayment] = useState(false);
    const [isOpenCoupon,setIsOpentCoupon] = useState(false);
    const {register,handleSubmit, reset} = useForm();
    const [cart,setCart] = useState([]);
    const [cartItem,setCartItem] = useState([]);
    const [totalQuantity,setTotalQuantity] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [quantity,setQuantity] = useState();
    const [couponId,setCouponId] = useState();
    const [coupons,setCoupons] = useState([]);
    const [checkCoupon,setCheckCoupon] = useState(null);
    const [finalToTalPrice,setFinalToTalPrice] = useState(0);
    const [discountAmount,setDiscountAmount] = useState(0);
    const [isOpenDelivery,setIsOpentDelivery] = useState(false);
    const [provinceData,setProvinceData] = useState([]);
    const [districtData,setDistrictData] = useState([]);
    const [wardData,setWardData] = useState([]);
    const [services,setServices] = useState([]);
    const [serviceId,setServiceId] = useState([]);
    const [districtIdChoose,setDistrictIdChoose] = useState();
    const [fee,setFee] = useState([]);
    const [wardIdChoose,setWardIdChoose] = useState();

    const baseReturnUrl = window.location.origin;

    useEffect (() => {
        fecthGetCartByCartId();
    },[cartId,cart]);

    const fecthGetCartByCartId = async () => {
      try {
        const resCartByCartId = await axiosConfig.get(`/cart/${cartId}`);
        const resToTalQuantity = await axiosConfig.get(`/cart/${cartId}/totalQuantity`);
        const resToTalPrice = await axiosConfig.get(`/cart/${cartId}/totalPrice`);

        const cartItem = Object.values(resCartByCartId.data.data.items);
        setCartItem(cartItem);
        setTotalQuantity(resToTalQuantity.data.data);
        setTotalPrice(resToTalPrice.data.data);
        const foodVaData = cartItem.map(item => item.foodVariation);
        // const imagePromise = foodVaData.map(foodVa => {
        //     return foodVa.image
        // })
      } catch (error) {
        console.log('error in fectGetCartByCartId',error);
      }
    }

    const handleAddCartItem = async (delta, foodVaId) => {
        try {
        const resCart = await axiosConfig.post(`/cart/addCartItem/${cartId}/${foodVaId}/${delta}`);
        setCart(resCart.data.data);
        } catch (error) {
        console.error('error in add CartItem',error);
        }
    }
    const removerCart = async (foodVaId) => {
        try {
            const removeCartItem = await axiosConfig.delete(`/cart/${cartId}/${foodVaId}`);
        } catch (error) {
            console.error('error in remove CartItem',error);
        }
    }

    const hanldePayment = async (totalPrice,paymethod)=> {
        try {
            let resPaymentUrl;
            console.log(totalPrice);
            console.log(paymethod);
            if(paymethod === "vnpay"){
                 resPaymentUrl= await axiosConfig.post(`/payment/byVnpay/${totalPrice}/${cartId}`,null,
                    {
                        params : 
                        { 
                            baseReturnUrl : baseReturnUrl,
                            couponId : couponId
                        }
                    }
                );
            console.log(resPaymentUrl.data);
            }else if(paymethod === "paypal"){
                resPaymentUrl = await axiosConfig.post(`/payment/byPaypal/${totalPrice}/${cartId}`,null,
                    {
                        params : 
                        {
                            baseReturnUrl : baseReturnUrl,
                            couponId : couponId
                        }
                    }
                )
            }else if(paymethod === "stripe"){
                const data = cartItem.map((item) => {
                    return {
                        idPrice: item.foodVariation.food.priceId,
                        quantity:item.quantity
                    }
                })
                console.log(data);
                resPaymentUrl = await axiosConfig.post(`/payment/byStripe/${totalPrice}/${cartId}`,data,
                {
                    params : 
                    {
                        baseReturnUrl : baseReturnUrl ,
                        couponId : couponId                  
                    }
                }
                )
            }else if(paymethod === "momo"){
                console.log("momo");

                //console.log(user.username);
                const username = 'huongpham';
                resPaymentUrl = await axiosConfig.post(`/payment/byMomo/${totalPrice}/${cartId}/${username}`,null,
                {
                    params : 
                    {
                        baseReturnUrl : baseReturnUrl ,
                        couponId : couponId
                    }
                }
                )
            }
            console.log(resPaymentUrl);
             
            if(resPaymentUrl){
                // Khi gửi yêu cầu thanh toán lên server, nó sẽ tạo ra 1 url thanh toán trả về
                // Chuyển vị trí của trang web đến theo đường dẫn 
                window.location.href= resPaymentUrl.data.data;
            } else {
                console.error('Payment URL is missing.');
            }
        } catch (error) {
            console.error("Error in Fetch Payment ", error);
        }
    }

    const handlePaymentPopup = async () => {
        setIsOpentPayment(!isOpenPayment);
    }
    const handleCouponPopup = async () => {
        setIsOpentCoupon(!isOpenCoupon);
        const username = 'huongpham';
        try {
            const resCouponsByUserName = await axiosConfig.get(`/couponStorage/${username}/yourCoupon`);
            console.log(resCouponsByUserName.data);
            setCoupons(resCouponsByUserName.data.data);
        } catch (error) {
            console.error('error in fetch handleCouponPopup', error);
        }
    }

    const handleUseCoupon = async (code) => {
        console.log(code);
        try {
            const resCheckCouponByCode = await axiosConfig.get(`/coupon/checkCoupon/${code}`);
            console.log(resCheckCouponByCode.data.data.data.couponId);
            setIsOpentCoupon(!isOpenCoupon);
            setCheckCoupon(resCheckCouponByCode.data.data);
            setCouponId(resCheckCouponByCode.data.data.data.couponId);
            let discountAmount = resCheckCouponByCode?.data.data.data.discountPercent * totalPrice;
            if(discountAmount > resCheckCouponByCode?.data.data.data.maxDiscountAmount){
                discountAmount = resCheckCouponByCode?.data.data.data.maxDiscountAmount;
            }
            setDiscountAmount(discountAmount);
            setFinalToTalPrice(totalPrice - discountAmount);
            console.log(totalPrice - discountAmount);
        } catch (error) {
            console.error('error in handleUseCoupon',error);
        }
    }
    const handleDeliveryAddress = async () => {
        setIsOpentDelivery(!isOpenDelivery);
        try {
            const resProvince = await axiosConfig.post(`/ship/getProvince`);
            // In ra toàn bộ phản hồi
            console.log("Dữ liệu nhận được từ server:", resProvince.data);
            // Phân tích cú pháp chuỗi JSON trong thuộc tính data
            const parsedData = JSON.parse(resProvince.data.data);
            // Kiểm tra và lấy mảng data
            if (parsedData && parsedData.data && Array.isArray(parsedData.data)) {
                // Lưu dữ liệu vào một mảng
                const provinces = parsedData.data.map(province => ({
                    id: province.ProvinceID,
                    name: province.ProvinceName
                }));
                // provinces.forEach(province => {
                //     console.log(`Province ID: ${province.id}, Province Name: ${province.name}`);
                // });
                setProvinceData(provinces); // Lưu mảng provinces vào state
            } else {
                console.error('Dữ liệu không phải là mảng hoặc không đúng định dạng:', parsedData);
            }
        } catch (error) {
            console.error('Có lỗi xảy ra trong handleDeliveryAddress:', error.message);
        }
    };

    const handleChooseDistrictByProvinceId= async(provinceId) => {
        try {
            const resDistrictByProvince= await axiosConfig.post(`/ship/getDistrict/${provinceId}`);
            const districtsData = JSON.parse(resDistrictByProvince.data.data);
            if (districtsData && districtsData.data && Array.isArray(districtsData.data)) {
                // Lưu dữ liệu vào một mảng
                const districts = districtsData.data.map(district => ({
                    districtId: district.DistrictID,
                    districtName: district.DistrictName
                }));
            setDistrictData(districts);
            }
        } catch (error) {
            console.error('error in handle Choose District By ProvinceId',error);            
        }
    }
    const handleChooseWardByDistrictId = async(districtId) => {
        try {
            setDistrictIdChoose(districtId);
            const resWardByDistrictId = await axiosConfig.post(`/ship/getWard/${districtId}`);
            const wardData = JSON.parse(resWardByDistrictId.data.data);
            if(wardData && Array.isArray(wardData.data)){
                const wards = wardData.data.map(ward => ({
                    wardId : ward.WardCode,
                    wardName : ward.WardName
                }))
                setWardData(wards);
                if(wards !== null ){
                    handleShipService(districtId);
                }
            }
        } catch (error) {
            console.error('error in handle Choose Province',error);            
        }
    }
    const handleShipService = async (districtId) => {
        try {
            const resShipService = await axiosConfig.post(`/ship/getShipService/${districtId}`);
            const shipServiceData = JSON.parse(resShipService.data.data);
            if(shipServiceData && Array.isArray(shipServiceData.data)){
                const services = shipServiceData.data.map(service => ({
                    serviceId : service.service_type_id,
                    serviceName : service.short_name,
                    extraFeeId : service.ecom_extra_cost_id
                }))
                setServices(services);
            }
        } catch (error) {
            console.error('error n handleShip Service',error);
        }
    }
    const handleChooseWardId = async (wardId) => {
        console.log(wardId);
        setWardIdChoose(wardId);
    }
    const handleChooseShipService = async (serviceId) => {
        setServiceId(serviceId);
    }
    const handleCalculateFee = async() => {
        try {
            console.log('District ID:', districtIdChoose);
            console.log('Ward ID:', wardIdChoose);
            const resFee = await axiosConfig.post(`/ship/getFee/${districtIdChoose}/${serviceId}/${wardIdChoose}`);
            const feeData = JSON.parse(resFee.data.data);
            console.log(feeData.data);
                alert('Choose Ship Service Success');
                setFee(feeData.data.total);
                console.log(feeData.data);
        } catch (error) {
            console.error('error in handleCalculateFee', error);
        }
    };
    
    return (
        <div>
            <CartList
            handlePaymentPopup ={handlePaymentPopup}
            handleCouponPopup = {handleCouponPopup}
            cartItem = {cartItem}
            totalQuantity = {totalQuantity}
            totalPrice = {totalPrice}
            handleAddCartItem = {handleAddCartItem}
            checkCoupon = {checkCoupon}
            handleUseCoupon = {handleUseCoupon}
            discountAmount = {discountAmount}
            handleDeliveryAddress = {handleDeliveryAddress}
             />

            <PaymentPopup
            isOpenPayment={isOpenPayment}
            handlePaymentPopup={handlePaymentPopup}
            totalPrice = {finalToTalPrice > 0 ? finalToTalPrice : totalPrice}
            hanldePayment={hanldePayment}
             />
             <CouponPopup
             isOpenCoupon = {isOpenCoupon}
             handleCouponPopUp={handleCouponPopup}
             coupons = {coupons}
             handleUseCoupon = {handleUseCoupon}
              />
              <DeliveryAddressPopup 
              isOpenDelivery={isOpenDelivery}
              handleDeliveryAddress = {handleDeliveryAddress}
              provinceData = {provinceData}
              handleChooseDistrictByProvinceId = {handleChooseDistrictByProvinceId}
              districtData = {districtData}
              handleChooseWardByDistrictId = {handleChooseWardByDistrictId}
              wardData = {wardData}
              services = {services}
              handleChooseShipService = {handleChooseShipService}
              handleCalculateFee = {handleCalculateFee}
              fee = {fee}
              handleChooseWardId = {handleChooseWardId}
              />
        </div>
    );
};

export default CartPage;