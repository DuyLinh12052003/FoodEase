import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axiosConfig from '../../../Config/AxiosConfig';
import CouponForm from './CouponForm';

const CouponFormPage = () => {

    const {couponId} = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [couponById,setCouponById] = useState();
    const navigate = useNavigate();

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
        try {
            if(couponId){
                const resCouponUpdate= await axiosConfig.put(`/coupon/${couponId}`,formData,{headers : {'Content-Type' : 'multipart/form-data'}});
                if(resCouponUpdate.data.data !== null){
                    alert('Update Coupon Success');
                }
                console.log(resCouponUpdate.data.data);
            }else{
                const resCouponCreate = await axiosConfig.post(`/coupon`,formData,{headers : {'Content-Type' : 'multipart/form-data'}});
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
    
    return (
        <div>
            <CouponForm
            register ={register}
            handleSubmit = {handleSubmit}
            reset = {reset}
            submitCoupon = {submitCoupon}
            couponId = {couponId}
            errors = {errors}
             /> 
        </div>
    );
};

export default CouponFormPage;