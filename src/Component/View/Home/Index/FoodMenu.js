
import React,{useState,useEffect} from "react";
import "./FoodMenu.css";
import axios from 'axios'
import {Link} from 'react-router-dom';
import Order from "../Details/Order";

const FoodMenu = () => {
const [mainDishes,setMainDishes] = useState([]);
const fetchMaindDishes = async ()=>{
  try{
     await axios.get('http://localhost:8080/user/findFoodVariationByMainDishes')
    .then(response =>{
      setMainDishes(response.data);
      console.log(response.data);
    })
  }
  catch(err){
    console.log(err ,'Lỗi không nhận dữ liệu');
  }
};

useEffect(()=>{
  fetchMaindDishes();
},[]);
const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (Food) => {
   
    setSelectedProduct(Food);
    console.log(Food ,'Dữ liệu food')
  };

  const closeModal = () => {
    setSelectedProduct(null);
    
  };
  
    


  return (
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
            {item.quantityStock ? "order" : "out of stock"}
          </button>
          <button className="col-sm-4 ">
          add to cart
          </button>
          </div>
          
        </div>
      </div>
    ))}
      <Order  product={selectedProduct} onClose={closeModal} />
  </div>
  );
};

export default FoodMenu;