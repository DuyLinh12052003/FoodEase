import React, { useEffect, useState } from 'react';
import './OrderStatus.css';
import axiosConfig from '../../../Config/AxiosConfig';

const OrderStatus = () => {
    const  [orders,setOrders] = useState([]);
    const [orderDetails,setOrderDetails] = useState([]);
    const [pageCurrent,setPageCurrent] = useState(0);
    const [pageSize,setPageSize] = useState(8);
    const [sortOrder,setSortOrder] = useState("desc");
    const [sortBy,setSortBy] = useState("orderId");
    const userName = localStorage.getItem('userNameLogin');
    useEffect(() => {
        fetchOrder();
    },[pageCurrent,pageSize,sortOrder,sortBy]);
    const fetchOrder = async () => {
        try {
            const resOrderByUserName = await axiosConfig.get(`/order/orderHistory/${userName}` , 
                {
                    params : {
                        pageCurrent : pageCurrent,
                        pageSize : pageSize, 
                        sortOrder : sortOrder , 
                        sortBy : sortBy
                    }
                }
            );
            console.log(resOrderByUserName.data.data.content);
            setOrders(resOrderByUserName.data.data.content);
        } catch (error) {
            console.error('error in fetch Orders', error)
        }
    }

    return (
        <div className="containerMyOrder">
            <header>
                <h1>Order Status</h1>
                <ul className="status-bar">
                    <li>All</li>
                    <li>Pending Payment</li>
                    <li>Shipping</li>
                    <li>Awaiting Delivery</li>
                    <li>Completed</li>
                    <li>Canceled</li>
                    <li>Return/Refund</li>
                </ul>
            </header>

            {orders.map((order, index) => (
                <div key={index} className="order">
                    <div className="shop-info">
                        <div className="food-name">Order Info: {order.orderId}</div>
                        <div>Order Date: {order.orderDate}</div>
                        <div>Status: {order.orderStatus.orderStatusName}</div>
                    </div>
                    {order.orderDetails.map((item, index) => (
                        <div key={item.orderDetailsId} className="order-details">
                            <img
                                src={`/assets/images/${item.foodVariations.food.imageUrl}`}
                                alt="Product Image"
                                className="product-img"
                                style={{ width: '180px', height: '180px' }}
                            />
                            <div className="product-info">
                                <p className="food-name">{item.foodVariations.food.foodName}</p>
                                <p className="category-name">Category: {item.foodVariations.food.category.cartegoryName}</p>
                                <p>
                                    {(item.foodVariations.food.basePrice + item.foodVariations.foodSize.price).toLocaleString('en-US')} $
                                    x {item.quantity} items
                                </p>

                                <div className="actions">
                                    <button className="return">Free Return within 15 days</button>
                                    <button className="review-btn">Review</button>
                                    <button className="request-return">Request Return/Refund</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <p className="price">Total Price: <span>{order.totalPrice.toLocaleString()}₫</span></p>
                </div>
            ))}
        </div>
    );
};

export default OrderStatus;
