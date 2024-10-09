
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axiosConfig from "../../../Config/AxiosConfig";
import Order from "../Details/Order";
import "./FoodMenu.css";

const FoodMenu = () => {
const [mainDishes,setMainDishes] = useState([]);
const [page,setPage] = useState(0);
const [TotalPage,setTotalPage] = useState();
const fetchMaindDishes = async ()=>{
  try{
     await axiosConfig.get(`/user/foodvariation/findFoodVariationByMainDishes?page=${page}`)
    .then(response =>{
      setMainDishes(response.data.content);
      console.log(response.data);
 
      setTotalPage(response.data.totalPages);
    })
  }
  catch(err){
    console.log(err ,'Lỗi không nhận dữ liệu');
  }
};
const Next = () => {
  setPage(prevPage => {
    if (prevPage >= TotalPage -1) {
      return 0; // Đặt lại page về 0 nếu prevPage lớn hơn hoặc bằng totalPages
    }
    return prevPage + 1; // Tăng page lên 1 nếu chưa quá totalPages
  });
};
  const Previous = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  }
useEffect(()=>{
  fetchMaindDishes();
  console.log(mainDishes)
},[page]);
const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (Food) => {
   
    setSelectedProduct(Food);
    console.log(Food ,'Dữ liệu food')
  };

  const closeModal = () => {
    setSelectedProduct(null);
    
  };
  
    if(mainDishes == null ){
      return null;
    }


  return (
    <div>
    <div className="menu-container ">
     
    {mainDishes.map((item) => (
      <div key={item.foodVariationId} className="menu-item">
        <div className="image-discount">
          <Link to={`FoodDetails/${item.foodVariationId}`} >
          <img  src={`/assets/images/${item.food.imageUrl}`} alt={item.name} className="menu-image" />
          </Link>
          <div className="disscount1">Discount:{item.food.discount}%</div>
        </div>
       
        <div className="menu-details">
        <div className="menu-header">
        <h3>{item.food.foodName}</h3>
        <div >
       
        <b className="price">{(item.food.basePrice - (item.food.discount / 100 * item.food.basePrice)).toLocaleString('vi-VN')} đ</b>
        <del className="price">{item.food.basePrice.toLocaleString('vi-VN')}đ</del>
        </div>
        
          
          <h5 className="description">{item.food.description}</h5>
          <div className="menu-footer">
            <p>sold:{item.quantityStock}</p>
            <p>Rating:  5⭐</p>
          </div> 
        </div>
          <div className="row d-flex justify-content-center ">
          <button  onClick={() => openModal(item)} className="col-sm-4 me-3" disabled={!item.quantityStock}>
            {item.quantityStock ? "Order" : "Out of stock"}
          </button>
          <button className="col-sm-4 ">
          Add to cart
          </button>
          </div>
          
        </div>
      </div>
    ))}
      <Order  product={selectedProduct} onClose={closeModal} />
  </div>
  <h6>{page + 1}/{TotalPage }</h6>
  <button className="Button-Previous" onClick={Previous}>Previous</button>
      <button className="Button-next" onClick={Next}>Next</button>
  </div>
  );
};

export default FoodMenu;