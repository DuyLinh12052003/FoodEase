import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import Order from "../Details/Order";
import "./FoodMenu.css";

const FoodMenu = () => {
  const { t } = useTranslation();
  const [mainDishes, setMainDishes] = useState([]);
  const fetchMaindDishes = async () => {
    try {
      await axiosConfig
        .get("/user/foodvariation/findFoodVariationByDrink")
        .then((response) => {
          setMainDishes(response.data);
          console.log(response.data);
        });
    } catch (err) {
      console.log(err, "Lỗi không nhận dữ liệu");
    }
  };

  useEffect(() => {
    fetchMaindDishes();
  }, []);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (Food) => {
    setSelectedProduct(Food);
    console.log(Food, "Dữ liệu food");
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };
  //  số tiền sau khi giảm giá
  // const newPrice = mainDishes.food.basePrice - mainDishes.food.basePrice * mainDishes.food.discount / 100;
  // console.log(newPrice);
  return (
    <div className="menu-container ">
      {mainDishes.map((item) => (
        <div key={item.foodVariationId} className="menu-item">
          <div className="image-discount">
            <Link to={`FoodDetails/${item.foodVariationId}`}>
              <img
                src={`/assets/images/${item.food.imageUrl}`}
                alt={item.name}
                className="menu-image"
              />
            </Link>
            <div className="disscount1">
              {customTranslate("Discount")}:{item.food.discount}%
            </div>
          </div>

          <div className="menu-details">
            <div className="menu-header">
              <h3>{customTranslate(`${item.food.foodName}`)}</h3>
              <div>
                <b className="price">
                  {" "}
                  {(
                    item.food.basePrice -
                    (item.food.basePrice * item.food.discount) / 100
                  ).toLocaleString("vi-VN")}
                  đ
                </b>
                <del className="price">
                  {item.food.basePrice.toLocaleString("vi-VN")}đ
                </del>
              </div>
              <h5 className="description">{customTranslate(`${item.food.description}`)}</h5>
              <div className="menu-footer">
                <p>
                  {customTranslate("sold")}:{item.quantityStock}
                </p>
                <p>{customTranslate("Rating")}: 5⭐</p>
              </div>
            </div>
            <div className="row d-flex justify-content-center ">
              <button
                onClick={() => openModal(item)}
                className="col-sm-4 me-3"
                disabled={!item.quantityStock}
              >
                {customTranslate(item.quantityStock ? "Order" : "Out of stock")}
              </button>
              <button className="col-sm-4 ">{customTranslate("Add to cart")}</button>
            </div>
          </div>
        </div>
      ))}
      <Order product={selectedProduct} onClose={closeModal} />
    </div>
  );
};

export default FoodMenu;
