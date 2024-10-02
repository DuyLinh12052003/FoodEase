import React,{useState,useEffect} from 'react';
import './FoodDetail.css'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Order from './Order';
import Comment from '../Comment/Comment';
const FoodDetails = () => {
    const { id } = useParams();
    const [foodDetail,setFoodDetail] =useState([]);    
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [foodImage,setFoodImage]=useState([]);
    // dử liệu foodDetails đươcj sử lí trước khi foodImage được gọi
    useEffect(() => {
      const fetchData = async () => {
          try {
              const responseDetails = await axios.get(`http://localhost:8080/user/findVaritionById/${id}`);
              setFoodDetail(responseDetails.data);
              console.log(responseDetails.data, 'dữ liệu details');
  
              const responseImages = await axios.get(`http://localhost:8080/user/findImage/${responseDetails.data.foodId}`);
              setFoodImage(responseImages.data);
              console.log('dữ liệu image', responseImages.data);
             
          } catch (error) {
              console.log(error);
          }
      };
  
      fetchData();
  }, []);
        if(!foodDetail.food )    { return null;} 
        if(!foodImage ) {return null;}

const openModal = (Food) => {
 
  setSelectedProduct(Food);
  console.log(Food ,'Dữ liệu food')
};

const closeModal = () => {
  setSelectedProduct(null);
}
// giá tiền sau khi giảm giá
const newPrice = foodDetail.food.basePrice- foodDetail.food.basePrice * foodDetail.food.discount / 100;
console.log('price mơi',newPrice)
  return (
  <div className="bg-white">
    <div className="food-details">
   
    <div className="food-info">
    <div className="food-image">
      <img
        src= {`/assets/images/${foodDetail.food.imageUrl}`} // Thay đổi đường dẫn hình ảnh
        alt="Seasonal Vegetable Salad"
      />
      {foodDetail.quantityStock === 0 &&
             (
                 <span className="out-of-stock">OUT OF STOCK</span> 
      )}
      <div className="disscount">Disscount:{foodDetail.food.discount}%</div>
    </div>
    <h2>{foodDetail.food.foodName}</h2>
    <div className='food-image1'>
    {foodImage.map((image, index) => (
    <img
        key={index} // Không quên thêm key cho mỗi phần tử
        src={`/assets/images/${image.images}`} // Thay đổi đường dẫn hình ảnh
        alt="Seasonal Vegetable Salad"
    />
      ))}
     
   
     
    </div> 
    </div>
   
    <div className="details">
      <div className="ingredients">
        <h3>Ingredients:</h3>
        <p>
         {foodDetail.food.description}
        </p>
      </div> 
      <div className="portion">
        <h3>Portion:</h3>
        <p>1 people</p>
      </div>
      <div className="nutrition">
        <h3>Sold:{foodDetail.quantityStock}</h3>
        <p>Proteins: 2.2, Carbs: 14.4, Fats: 1.2, Total Kcal: 157.8</p>
      </div>
      <div className="">

      <b className="details-price">{newPrice.toLocaleString('vi-VN')} đ</b>
      <del className="details-price">{foodDetail.food.basePrice.toLocaleString('vi-VN')} đ</del>
      </div>
      
      <button  onClick={() => openModal(foodDetail)} className="order-button col-sm-4 me-3" disabled={!foodDetail.quantityStock}>
              {foodDetail.quantityStock ? "order" : "out of stock"}
            </button>
    </div>
  </div>
 
  <Order product={selectedProduct} onClose={closeModal}/>
  <h1  className="review">Customer reviews</h1>
  <Comment foodDetail={foodDetail}/>
  </div>
  );
};

export default FoodDetails;