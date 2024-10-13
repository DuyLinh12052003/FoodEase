import React, { useEffect, useState } from 'react';
import './OrderStatus.css';
import axiosConfig from '../../../Config/AxiosConfig';
import CustomAlert from '../../../Config/CustomAlert';
import { useForm } from 'react-hook-form';


const OrderStatus = () => {
    const [selectedStatusId, setSelectedStatusId] = useState(0);
    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [sortOrder, setSortOrder] = useState("desc");
    const [sortBy, setSortBy] = useState("orderId");
    const [alert,setAlert] = useState(null);
    const {register, handleSubmit, reset , formState : {errors}} = useForm();

    const userName = localStorage.getItem('userNameLogin');

    const fetchOrder = async () => {
        try {
            const resOrderByStatusId = await axiosConfig.get(`/order/orderHistoryByOrderStatus/${userName}`, {
                params: {
                    pageCurrent: pageCurrent,
                    pageSize: pageSize, 
                    sortOrder: sortOrder,
                    sortBy: sortBy,
                    orderStatusId: selectedStatusId
                }
            });
            setOrders(resOrderByStatusId.data.data.content);
            console.log(resOrderByStatusId.data.data.content);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Fetch order status options
    const fetchOrderStatus = async () => {
        try {
            const resOrderStatus = await axiosConfig.get(`/orderStatus`);
            setOrderStatus(resOrderStatus.data.data);
            console.log(resOrderStatus.data.data);
        } catch (error) {
            console.error('Error fetching order statuses:', error);
        }
    };

    const handleOrderByStatus = (orderStatusId) => {
        setSelectedStatusId(orderStatusId);
    };

    const getOrderActions = (orderStatusId, order) => {
        const actions = {
            1: [
                { label: "Cancel Order", onClick: () => handleCancelOrder(order,orderStatus.find(item => item.orderStatusName === "Cancelled")) },
                { label: "Payment Continue", onClick: () => handlePaymentContinue(order) },
            ],
            2: [
                { label: "Cancel Order", onClick: () => handleCancelOrder(order,orderStatus.find(item => item.orderStatusName === "Cancelled")) },
            ],
            3: [
                { label: "See Shipping", onClick: () => handleSeeShipping(order) },
            ],
            4: [
                { label: "Complete Order", onClick: () => handleCompleteOrder(order,orderStatus.find(item => item.orderStatusName === "Completed")) },
                { label: "Return Request", onClick: () => handleReturnRequestOrder(order,orderStatus.find(item => item.orderStatusName === "Return Requested")) },
            ],
            5: [
                { label: "Cancel Return Request", onClick: () => handleCancelReturnRequest(order,orderStatus.find(item => item.orderStatusName === "Completed")) },
            ],
            6: [
                { label: "Review", onClick: () => handleReviewOrder(order) },
            ],
        };
        return actions[orderStatusId] || [];
    };

    const handleCancelOrder = async (order ,orderStatus) => {
      console.log(orderStatus);
        try {
            const resCancelOrder = await axiosConfig.get(`/order/changeOrderStatus/${order.orderId}/${orderStatus.orderStatusId}`);
            console.log(resCancelOrder.data);
            setAlert({type : 'success' , message : `Cancelling order: ${order.orderId}`});
            fetchOrder();
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    const handlePaymentContinue = async (order) => {
        try {
            alert(`Continuing payment for order: ${order.orderId}`);
        } catch (error) {
            console.error('Error continuing payment:', error);
        }
    };

    const handleSeeShipping = async (order) => {
        try {
            alert(`Viewing shipping for order: ${order.orderId}`);
        } catch (error) {
            console.error('Error viewing shipping:', error);
        }
    };

    const handleCompleteOrder = async (order,orderStatus) => {
        try {
            const resCompleteOrder = await axiosConfig.get(`/order/changeOrderStatus/${order.orderId}/${orderStatus.orderStatusId}`);
            console.log(resCompleteOrder.data);
            setAlert({type : 'success' , message : `Complete Order orderId: ${order.orderId}`});
            fetchOrder();
        } catch (error) {
            setAlert({type : 'error' , message : `Error Completing Order order: ${order.orderId}`});
        }
    };

    const handleReturnRequestOrder = async (order,orderStatus) => {
        try {
            const resReturnRequestOrder = await axiosConfig.get(`/order/changeOrderStatus/${order.orderId}/${orderStatus.orderStatusId}`);
            console.log(resReturnRequestOrder.data);
            setAlert({type : 'success' , message : `Return Request Order order: ${order.orderId}`});
            fetchOrder();
        } catch (error) {
            setAlert({type : 'error' , message : `Return Request Order order: ${order.orderId} Failed`});
        }
    };

    const handleCancelReturnRequest = async (order,orderStatus) => {
        try {
            const resCancelReturnRequest = await axiosConfig.get(`/order/changeOrderStatus/${order.orderId}/${orderStatus.orderStatusId}`);
            console.log(resCancelReturnRequest.data);
            setAlert({type : 'success' , message : `Complete Order orderId: ${order.orderId}`});
            fetchOrder();
        } catch (error) {
            setAlert({type : 'success' , message : `Error cancelling return request: orderId: ${order.orderId}`});
        }
    };

    const handleReviewOrder = async (order) => {
        try {
            alert(`Reviewing order: ${order.orderId}`);
        } catch (error) {
            console.error('Error reviewing order:', error);
        }
    };

    useEffect(() => {
        fetchOrder();
        fetchOrderStatus();
    }, [pageCurrent, pageSize, sortOrder, sortBy, selectedStatusId]);

    return (
      <>
        <div className="order-status-container">
          {alert && (
            <CustomAlert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}
      
          <header>
            <h1>Order Status</h1>
            <ul className="order-status-bar">
              <li
                value={0}
                onClick={() => handleOrderByStatus(0)}
                className={selectedStatusId === 0 ? 'active' : ''}
              >
                All Orders
              </li>
              {orderStatus.map((item) => (
                <li
                  key={item.orderStatusId}
                  value={item.orderStatusId}
                  className={selectedStatusId === item.orderStatusId ? 'active' : ''}
                  onClick={() => handleOrderByStatus(item.orderStatusId)}
                >
                  {item.orderStatusName}
                </li>
              ))}
            </ul>
          </header>
      
          {orders.map((order, index) => (
            <div key={index} className="order-status">
              <div className="order-status-shop-info">
                <div className="food-name">Order Info: {order.orderId}</div>
                <div>Order Date: {order.orderTime} {order.orderDate}</div>
                <div>Status: {order.orderStatus.orderStatusName}</div>
              </div>
      
              {order.orderDetails.map((item) => (
                <div key={item.orderDetailsId} className="order-status-details">
                  <img
                    src={`/assets/images/${item.foodVariations.food.imageUrl}`}
                    alt="Product"
                    className="order-status-product-img"
                  />
                  <div className="order-status-product-info">
                    <p className="order-status-food-name">{item.foodVariations.food.foodName}</p>
                    <p className="order-status-category-name">Category: {item.foodVariations.food.category.cartegoryName}</p>
                    <p>
                      {(
                        item.foodVariations.food.basePrice + item.foodVariations.foodSize.price
                      ).toLocaleString('en-US')} $ x {item.quantity} items
                    </p>
                    <div className="order-status-actions">
                      {getOrderActions(order.orderStatus.orderStatusId, order).map((action, index) => (
                        <button
                          key={index}
                          className="order-status-return"
                          onClick={action.onClick}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <p className="price">Total Price: <span>{order.totalPrice.toLocaleString()}₫</span></p>
            </div>
          ))}
        </div>

        <div>
          
        </div>
        </>
      );
      
};

export default OrderStatus;
