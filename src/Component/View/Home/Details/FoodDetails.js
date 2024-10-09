import React,{useState,useEffect} from 'react';
<<<<<<< HEAD
import './FoodDetail.css'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Order from './Order';
import Comment from '../Comment/Comment';
=======
import './FoodDetail.css';
import {useParams,Link} from 'react-router-dom';
import axiosConfig from '../../../Config/AxiosConfig';
import Order from './Order';
import Comment from './../Comment/Comment';
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
const FoodDetails = () => {
    const { id } = useParams();
    const [foodDetail,setFoodDetail] =useState([]);    
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [foodImage,setFoodImage]=useState([]);
<<<<<<< HEAD
=======
    const[propose,setPropose] = useState([]);
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
    // dử liệu foodDetails đươcj sử lí trước khi foodImage được gọi
    useEffect(() => {
      const fetchData = async () => {
          try {
<<<<<<< HEAD
              const responseDetails = await axios.get(`http://localhost:8080/user/findVaritionById/${id}`);
              setFoodDetail(responseDetails.data);
              console.log(responseDetails.data, 'dữ liệu details');
  
              const responseImages = await axios.get(`http://localhost:8080/user/findImage/${responseDetails.data.foodId}`);
              setFoodImage(responseImages.data);
              console.log('dữ liệu image', responseImages.data);
=======
              const responseDetails = await axiosConfig.get(`/user/foodvariation/findVaritionById/${id}`);
              setFoodDetail(responseDetails.data);
           
  
              const responseImages = await axiosConfig.get(`/user/foodImage/findImage/${responseDetails.data.foodId}`);
              setFoodImage(responseImages.data);
            
             
              const responsePropose =await axiosConfig.get(`/user/foodvariation/findFoodVariationByCategoryId/${responseDetails.data.food.categoryId}`);
              setPropose(responsePropose.data);
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
             
          } catch (error) {
              console.log(error);
          }
      };
  
      fetchData();
<<<<<<< HEAD
  }, []);
        if(!foodDetail.food )    { return null;} 
        if(!foodImage ) {return null;}

=======
  }, [foodDetail]);
        if(!foodDetail.food )    { return null;} 
        if(!foodImage ) {return null;}
        
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
const openModal = (Food) => {
 
  setSelectedProduct(Food);
  console.log(Food ,'Dữ liệu food')
};

const closeModal = () => {
  setSelectedProduct(null);
}
// giá tiền sau khi giảm giá
const newPrice = foodDetail.food.basePrice- foodDetail.food.basePrice * foodDetail.food.discount / 100;
<<<<<<< HEAD
console.log('price mơi',newPrice)
=======

>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
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
<<<<<<< HEAD
=======
  <h1>Propose</h1>
  <div className='container'>
  <div className="menu-container ">
     
     {propose.slice(0,3).map((item) => (
       <div key={item.foodVariationId} className="">
         <div className="image-discount">
           <Link to={`/FoodDetails/${item.foodVariationId}`} >
           <img  src={`/assets/images/${item.food.imageUrl}`} alt={item.name} className="menu-image" />
           </Link>
           <div className="disscount1">Discount:{item.food.discount}%</div>
         </div>
        
         <div className="menu-details">
         <div className="menu-header">
        
         <div >
        
         
         </div>
         
           
          
         </div>
          
           
         </div>
       </div>
     ))}
       <Order  product={selectedProduct} onClose={closeModal} />
   </div>
  </div>
 
>>>>>>> bd03a3a14265b165c67ca1ce5c3e9557eff8be62
  </div>
  );
};

export default FoodDetails;