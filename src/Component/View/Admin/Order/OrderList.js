import React,{useState,useEffect} from 'react';
import Modal from './Modal';
import axiosConfig from '../../../Config/AxiosConfig';
const OrderList = () => {
  const [order,setOrder]=useState([]);
  const [orderDetails, setOrderDetails] = useState([]); 

  const [selectedItem, setSelectedItem] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const featchOrderList = async ()=>{
  try {
    const responseOrder = await axiosConfig('/order/findAll')
    .then(responseOrder =>{
      setOrder(responseOrder.data)
      console.log(responseOrder.data)
    })
  } catch (error) {
    console.log(error,'Lỗi nhận dử liệu order')
  }
}


const handleInfoClick = (item,order) => {
  setSelectedItem(item);
  setOrderDetails(order);
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedItem(null);
};
 useEffect (()=>{
  featchOrderList();
},[]);
    return (
      <div className="body " >
        <div id="reportsPage">
      <div id="home">
        <div className="container">
          <div className="row tm-content-row">
           
           

            <div className="col-12 tm-block-col">
              <div className=" ">
                <h2 className="tm-block-title">Orders List</h2>
                <table className="table">
                  <thead>
                    
                    <tr>
                      <th scope="col">ORDER NO.</th>
                      <th scope="col">Order Date</th>
                      <th scope="col">Order Time</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Delivery Address</th>
                      <th scope="col">	Order Status</th>
                      <th scope="col">Payment Method</th>
                      <th scope="col">Ship Method</th>
                      <th scope="col">Total Price</th>
                      <th scope="col">Total Quantity</th>
                      <th scope="col">Funtion</th>

                    </tr>
                  </thead>
                  <tbody>
                  {order.map((item,index)=>(
                        <tr key={item.orderId}>
                        <th scope="row">{index+1}</th>
                        <td>  {(() => {
                      const orderDate = new Date(item.orderDate);
                      return `${orderDate.getFullYear()}/${String(orderDate.getMonth() + 1).padStart(2, '0')}/${String(orderDate.getDate()).padStart(2, '0')}`;
                  })()}</td>
                      
                        <td><b>{item.orderTime}</b></td>
                        <td><b>{item.user.fullName}</b></td>
                        <td><b>{item.deleveryAddress}</b></td>
                        <td>{item.orderStatus.orderStatusName}</td>
                        <td>{item.paymentMethod.paymentName}</td>
                        <td>{item.shipMethod.shipName}</td>
                        <td>{item.totalPrice.toLocaleString('vi-VN')}đ</td>              
                        <td>{item.totalQuantity}</td>
                        <td onClick={() => handleInfoClick(item.orderId,item)}>
                <i className="fa-solid fa-circle-info fa-lg"></i>
              </td>
                      </tr>
                  ))
                    }
                  
                   
                  </tbody>
                </table>
                {isModalOpen && (
        <Modal
          item={selectedItem}
          order={orderDetails}
          onClose={handleCloseModal}
        />
      )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    );
};

export default OrderList;