<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axiosConfig from '../../../Config/AxiosConfig';
import CouponForm from './CouponForm';
=======
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import CouponForm from './CouponForm';
import axiosConfig from '../../../Config/AxiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62

const CouponFormPage = () => {

    const {couponId} = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [couponById,setCouponById] = useState();
<<<<<<< HEAD
    const navigate = useNavigate();
=======
    const [imageCoupon,setImageCoupon] = useState([]);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62

    useEffect (() => {
        if(couponId ){
            fectchCoupon();
        }
    },[couponId]);
    const fectchCoupon = async () => {
        try {
            const resCouponByCouponId = await axiosConfig.get(`/coupon/${couponId}`);
            console.log(resCouponByCouponId.data.data);
            setCouponById(resCouponByCouponId.data.data);
            const couponById = resCouponByCouponId.data.data;
            reset({
                couponId : couponId , 
                code : couponById.code , 
                description : couponById.description , 
                startDate : couponById.startDate , 
                endDate : couponById.endDate , 
                useLimit : couponById.useLimit , 
                usedCount: couponById.usedCount , 
                discountPercent: couponById?.discountPercent ? couponById.discountPercent * 100 : 0 ,
                maxDiscountAmount : couponById.maxDiscountAmount
            })
<<<<<<< HEAD
=======
            const copponData = resCouponByCouponId.data.data;
            const resImage = await axiosConfig.get(`/files/coupon/${copponData.imageUrl}`,{responseType : 'blob'});
            setImageCoupon(URL.createObjectURL(resImage.data));

>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
        } catch (error) {
            console.error('error in Coupons')
        }
    }

    const formatNumber = (value) => {
        return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
      };

    const submitCoupon = async (data)=> {
        const formData = new FormData();
        console.log(data.discountPercent);
        data.discountPercent = data.discountPercent / 100;
        console.log(data.discountPercent);
        const payload = {
            ...data
        }
        formData.append('couponRequest',new Blob([JSON.stringify(payload)], {type : 'application/json'}));
<<<<<<< HEAD
        try {
            if(couponId){
                const resCouponUpdate= await axiosConfig.put(`/coupon/${couponId}`,formData,{headers : {'Content-Type' : 'multipart/form-data'}});
=======

        const files= await handleImage();
        if(files.length > 0){
          for(const file of files ){
            formData.append("couponImage",file);
          }
        }

        try {
            if(couponId){
                const resCouponUpdate= await axiosConfig.put(`/coupon/coupon/${couponId}`,formData,{headers : {'Content-Type' : 'multipart/form-data'}});
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
                if(resCouponUpdate.data.data !== null){
                    alert('Update Coupon Success');
                }
                console.log(resCouponUpdate.data.data);
            }else{
<<<<<<< HEAD
                const resCouponCreate = await axiosConfig.post(`/coupon`,formData,{headers : {'Content-Type' : 'multipart/form-data'}});
=======
                const resCouponCreate = await axiosConfig.post(`/coupon/coupon`,formData,{headers : {'Content-Type' : 'multipart/form-data'}});
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
                if(resCouponCreate.data.data !== null){
                    alert('Create Coupon Success');
                }
                console.log(resCouponCreate.data.data);
            }
            navigate(`/admin/coupons`);
        } catch (error) {
            console.error('error in submitCoupon',error);
        }
    }
<<<<<<< HEAD
=======

    const handleImage = async () =>{
        // Khi liên kết useRef với input file , truy cập vào current.files để lấy ra files
        // Lúc này files là 1 đối tượng FileList, kh phải mảng nhưng sẽ chứa danh sách tệp chọn từ thẻ input 
        // Và sử dụng như 1 mảng thông thường
        let files = fileInputRef.current.files;
        // Kiểm tra nếu files không được chọn thì
        if( files.length === 0){
          return [];
        }
        // Nếu files được chọn, chuyển files thành mảng và trả về 
          return Array.from(files);
      }
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
    
    return (
        <div>
            <CouponForm
            register ={register}
            handleSubmit = {handleSubmit}
<<<<<<< HEAD
=======
            handleImage = {handleImage}
            fileInputRef = {fileInputRef}
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
            reset = {reset}
            submitCoupon = {submitCoupon}
            couponId = {couponId}
            errors = {errors}
<<<<<<< HEAD
=======
            imageCoupon = {imageCoupon}
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
             /> 
        </div>
    );
};

export default CouponFormPage;