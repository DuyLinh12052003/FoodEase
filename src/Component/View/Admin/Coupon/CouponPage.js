import React, { useEffect, useState } from 'react';
import CouponList from './CouponList';
import axiosConfig from '../../../Config/AxiosConfig';
import { useNavigate } from 'react-router-dom';

const CouponPage = () => {

    const [pageCurrent,setPageCurrent] = useState(0);
    const [pageSize,setPageSize] = useState(8);
    const [sortOrder,setSortOrder] = useState("desc");
    const [sortBy,setSortBy] = useState("couponId");
    const [coupons,setCoupons] = useState([]);
<<<<<<< HEAD
    const [totalPage,setTotalPage] = useState();
    const navigate = useNavigate();
=======
    const [totalPage,setTotalPage] = useState(0);
    const [imageCoupons,setImageCoupons] = useState({});
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62

    useEffect(()  => {
        fetchCoupons();
    },[pageCurrent,pageSize,sortOrder,sortBy]);

    const fetchCoupons = async () => {
        try {
            const resCouponse = await axiosConfig.get(`/coupon`, 
                {
                    params : {
                        pageCurrent : pageCurrent, 
                        pageSize : pageSize,
                        sortOrder : sortOrder,
                        sortBy : sortBy
                    }
                }
            )
            setCoupons(resCouponse.data.data.content);
            setTotalPage(resCouponse.data.data.totalPages);
<<<<<<< HEAD
            console.log(resCouponse.data);
=======
          
            const couponData = resCouponse.data.data.content;
            console.log(couponData);
            const imagePromises = couponData.map(async coupon => {
               try {
                   const { data } = await axiosConfig.get(`/files/coupon/${coupon.imageUrl}`, { responseType: 'blob' });
                   return { [coupon.couponId]: URL.createObjectURL(data) };
               } catch (error) {
                   return { [coupon.couponId]: null };
               }
           }); 
           const images = Object.assign({}, ...(await Promise.all(imagePromises)));
           console.log(images);
           setImageCoupons(images);
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
        } catch (error) {
            console.error('error in fetchCoupons',error);
        }
    }
    const handleSortBy = async(value) => {
        setSortBy(value);
    }
    const handleSortOrder = async (value) => {
        setSortOrder(value);
    }
    const handlePageCurrent = async (value) => {
        setPageCurrent(value);
    }
    const handlePageSize = async (value) => {
        setPageSize(value);
    }

    return (
        <div>
            <CouponList
            coupons = {coupons}
            handleSortBy = {handleSortBy}
            handleSortOrder = {handleSortOrder}
            handlePageCurrent = {handlePageCurrent}
            handlePageSize = {handlePageSize}
            pageCurrent={pageCurrent}
            totalPage={totalPage}
<<<<<<< HEAD
=======
            imageCoupons = {imageCoupons}
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
             />
        </div>
    );
};

export default CouponPage;