import React, { useEffect, useState } from 'react';
import CartList from './CartList';
import PaymentPopup from './PaymentPopup';
import './Payment.css';
import CouponPopup from './CouponPopup';
import { useParams } from 'react-router-dom';
import axiosConfig from '../../../Config/AxiosConfig';
import { useForm } from 'react-hook-form';
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
                        idPrice: item.foodVariation.food.idPrice,
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
            console.log(resCheckCouponByCode.data);
            setIsOpentCoupon(!isOpenCoupon);
            setCheckCoupon(resCheckCouponByCode.data.data);
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
        </div>
    );
};

export default CartPage;