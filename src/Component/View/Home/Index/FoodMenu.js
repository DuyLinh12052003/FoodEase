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
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [wishLists, setWishLists] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null); // State để lưu món ăn đã chọn
  const [showWishlistModal, setShowWishlistModal] = useState(false); // State để hiển thị modal danh sách wishlist
  const [selectedWishListId, setSelectedWishListId] = useState(null); // ID của wishlist đã chọn

  const fetchMaindDishes = async () => {
    try {
      const response = await axiosConfig.get(
        `/user/foodvariation/findFoodVariationByMainDishes?page=${page}`
      );
      setMainDishes(response.data.content);
      setTotalPage(response.data.totalPages);
    } catch (err) {
      console.log(err, "Lỗi không nhận dữ liệu");
    }
  };

  const fetchWishLists = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axiosConfig.get(
        `/wishlist/get-wishlist/user/${userId}`
      );
      console.log("Fetched wishlists:", response.data);
      setWishLists(response.data);
      
     
    } catch (error) {
      console.error("Error fetching wishlists", error);
    }
  };

  const next = () => {
    setPage((prevPage) => {
      if (prevPage >= totalPage - 1) {
        return 0; // Đặt lại page về 0 nếu prevPage lớn hơn hoặc bằng totalPages
      }
      return prevPage + 1; // Tăng page lên 1 nếu chưa quá totalPages
    });
  };

  const previous = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    fetchMaindDishes();
    fetchWishLists(); // Fetch danh sách wishlist
  }, [page]);
  useEffect(() => {
    console.log("Current wishLists:", wishLists); // Kiểm tra giá trị hiện tại của wishLists
  }, [wishLists]);
  const openModal = (food) => {
    setSelectedProduct(food);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const openWishlistModal = (food) => {
    setSelectedFood(food); // Lưu món ăn đã chọn
    setShowWishlistModal(true); // Hiển thị modal danh sách wishlist
  };

  const closeWishlistModal = () => {
    setShowWishlistModal(false);
    setSelectedFood(null);
  };

  const addFoodToWishList = async (wishListId, foodId) => {
    try {
      const response = await axiosConfig.post(
        `/wishlist/${wishListId}/add-food/${foodId}`
      );
      console.log(foodId);
      return response.data;
    } catch (error) {
      console.error("Error adding food to wishlist:", error);
      throw error;
    }
  };

  const handleAddToWishlist = async () => {
    if (selectedWishListId && selectedFood) {
      try {
        // Kiểm tra xem món ăn đã có trong wishlist chưa
        const checkResponse = await axiosConfig.get(
          `/wishlist/${selectedWishListId}/contains-food/${selectedFood.foodId}`
        );

        if (checkResponse.data) {
          alert(t("This food is already in the selected wishlist!"));
          return; // Nếu có rồi, không làm gì thêm
        }

        const result = await addFoodToWishList(
          selectedWishListId,
          selectedFood.foodId
        );
        console.log("Added to wishlist:", result);
        alert(t("Added to wishlist successfully!"));
        await fetchWishLists(); // Gọi lại API để cập nhật danh sách wishlist
        closeWishlistModal(); // Đóng modal sau khi thêm thành công
      } catch (error) {
        alert(t("Failed to add to wishlist"));
      }
    }
  };

  if (mainDishes == null) {
    return null;
  }

  return (
    <div>
      <div className="menu-container">
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
                {customTranslate("Discount")}: {item.food.discount}%
              </div>
            </div>

            <div className="menu-details">
              <div className="menu-header">
                <h3>{customTranslate(`${item.food.foodName}`)}</h3>
                <div>
                  <b className="price">
                    {(
                      item.food.basePrice -
                      (item.food.discount / 100) * item.food.basePrice
                    ).toLocaleString("vi-VN")}{" "}
                    đ
                  </b>
                  <del className="price">
                    {item.food.basePrice.toLocaleString("vi-VN")}đ
                  </del>
                </div>

                <h5 className="description">
                  {customTranslate(`${item.food.description}`)}
                </h5>
                <div className="menu-footer">
                  <p>
                    {customTranslate("sold")}: {item.quantityStock}
                  </p>
                  <p>{customTranslate("Rating")}: 5⭐</p>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <button
                  onClick={() => openModal(item)}
                  className="col-sm-4 me-3"
                  disabled={!item.quantityStock}
                >
                  {customTranslate(
                    item.quantityStock ? "Order" : "Out of stock"
                  )}
                </button>
                <button
                  className="col-sm-4"
                  onClick={() => openWishlistModal(item)}
                >
                  {customTranslate("Add to Wishlist")}
                </button>
              </div>  
            </div>
          </div>
        ))}
        <Order product={selectedProduct} onClose={closeModal} />
      </div>

      {/* Modal chọn Wishlist */}
      {showWishlistModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select a Wishlist</h2>
            <ul>
              {wishLists.map((wishList) => (
                <li key={wishList.wishListId}>
                  <button
                    onClick={() => setSelectedWishListId(wishList.wishListId)}
                  >
                    {wishList.wishListName}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={handleAddToWishlist}>Add to Wishlist</button>
            <button onClick={closeWishlistModal}>Cancel</button>
          </div>
        </div>
      )}

      <h6>
        {page + 1}/{totalPage}
      </h6>
      <button className="Button-Previous" onClick={previous}>
        {customTranslate("Previous")}
      </button>
      <button className="Button-next" onClick={next}>
        {customTranslate("Next")}
      </button>
    </div>
  );
};

export default FoodMenu;
