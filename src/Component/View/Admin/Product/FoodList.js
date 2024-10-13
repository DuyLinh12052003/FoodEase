import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function FoodList() {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const [foods, setFoods] = useState([]);

  const [showModal, setShowModal] = useState(false); // Toggle modal thêm món ăn
  const [newFood, setNewFood] = useState({
    foodName: "",
    description: "",
    basePrice: "",
    image: "",
    discount: "",
    categoryId: "",
  });

  // Hàm xử lý submit form
  const onSubmit = async (data) => {
    const fileName = data.image[0]?.name;
    console.log("Uploaded file name:", fileName);

    const foodData = {
      foodName: data.foodName,
      description: data.description,
      basePrice: data.basePrice,
      image: fileName, // Lưu tên file thay vì toàn bộ file
      discount: data.discount,
      categoryId: data.categoryId,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/foods",
        foodData
      );
      console.log("Food added successfully:", response.data);
      fetchFoods();
      setShowModal(false);
      reset();
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/foods/${id}`);
      // Sau khi xóa thành công, cập nhật danh sách món ăn
      setFoods((prevFoods) => prevFoods.filter((food) => food.foodId !== id));
      console.log("Food deleted successfully");
    } catch (error) {
      console.error("Error deleting food:", error);
      setError("Failed to delete food");
    }
  };

  useEffect(() => {
    // Gọi API để lấy danh sách món ăn
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/foods"); // Giả sử đây là endpoint để lấy danh sách món ăn
        setFoods(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch food list");
        setLoading(false);
      }
    };

    fetchFoods();
  }, []); // Danh sách món ăn

  // Hàm lấy danh sách món ăn từ API
  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/foods");
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    fetchFoods(); // Gọi hàm lấy dữ liệu khi component được mount
  }, []);

  // Hàm xử lý khi có sự thay đổi trong form
  const handleChange = (e) => {
    setNewFood({
      ...newFood,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Gọi API để lấy dữ liệu từ backend

    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories"); // Thay đường dẫn API của bạn
      setCategories(response.data); // Lưu dữ liệu vào state
      setLoading(false); // Tắt trạng thái loading
    } catch (error) {
      setError("Failed to fetch categories");
      setLoading(false); // Tắt trạng thái loading khi có lỗi
    }
  };

  // Hàm xử lý thêm mới danh mục
  const handleAddCategory = async () => {
    if (!newCategory) return; // Kiểm tra nếu input rỗng

    try {
      const response = await axios.post(
        "http://localhost:8080/api/categories",
        {
          foodCategoriesName: newCategory, // Gửi dữ liệu để tạo danh mục
        }
      );

      // Cập nhật state category với các trường đúng từ API
      setCategories((prevCategories) => [
        ...prevCategories,
        {
          foodCategoriesID: response.data.foodCategoriesID,
          foodCategoriesName: response.data.foodCategoriesName,
        },
      ]);

      setNewCategory(""); // Xóa input sau khi thêm mới
      fetchCategories();
    } catch (error) {
      setError("Failed to add category");
    }
  };

  // Hàm xử lý xóa danh mục
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/categories/${id}`);
      // Cập nhật state category sau khi xóa
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.foodCategoriesID !== id)
      );
      fetchCategories();
    } catch (error) {
      setError("Failed to delete category");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="body">
      <div className="container mt-5">
        <div className="row tm-content-row">
          <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-products">
              <div className="tm-product-table-container">
                <table className="table table-hover tm-table-small tm-product-table">
                  <thead>
                    <tr>
                      <th scope="col">&nbsp;</th>
                      <th scope="col">PRODUCT NAME</th>
                      <th scope="col">DESCRIPTION</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">DISCOUNT</th>
                      <th scope="col">CATEGORY</th>
                      <th scope="col">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foods.length > 0 ? (
                      foods.map((food) => (
                        <tr key={food.foodId}>
                          <th scope="row">
                            <input type="checkbox" />
                          </th>
                          <td className="tm-product-name">{food.foodName}</td>
                          <td>{food.description}</td>
                          <td>{food.basePrice} VND</td>
                          <td>{food.discount}%</td>
                          <td>{food.category.cartegoryName}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteFood(food.foodId)} // Gọi hàm xóa
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No foods available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Nút thêm mới món ăn */}
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary btn-block text-uppercase mb-3"
              >
                Add Food
              </button>

              {/* Modal thêm món ăn mới */}
              <div
                className={`modal ${showModal ? "show" : ""}`}
                style={{ display: showModal ? "block" : "none" }}
                tabIndex="-1"
                role="dialog"
                aria-hidden={!showModal}
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Food</h5>
                      <button
                        type="button"
                        className="close"
                        onClick={() => setShowModal(false)}
                      >
                        <span>&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="needs-validation"
                        noValidate
                      >
                        <div className="mb-3">
                          <label className="form-label">Food Name</label>
                          <input
                            type="text"
                            {...register("foodName", { required: true })}
                            className="form-control"
                            placeholder="Enter food name"
                          />
                          <div className="invalid-feedback">
                            Please provide a food name.
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            {...register("description", { required: true })}
                            className="form-control"
                            rows="3"
                            placeholder="Enter food description"
                          ></textarea>
                          <div className="invalid-feedback">
                            Please provide a description.
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Base Price</label>
                          <div className="input-group">
                            <span className="input-group-text">VND</span>
                            <input
                              type="number"
                              {...register("basePrice", { required: true })}
                              className="form-control"
                              placeholder="Enter base price"
                            />
                          </div>
                          <div className="invalid-feedback">
                            Please provide a base price.
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Image Upload</label>
                          <input
                            type="file"
                            {...register("image", { required: true })}
                            className="form-control"
                          />
                          <div className="form-text">
                            Upload an image file for the food item.
                          </div>
                          <div className="invalid-feedback">
                            Please upload an image.
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Discount (%)</label>
                          <div className="input-group">
                            <input
                              type="number"
                              {...register("discount", {
                                required: true,
                                max: 100,
                              })}
                              className="form-control"
                              placeholder="Enter discount"
                            />
                            <span className="input-group-text">%</span>
                          </div>
                          <div className="invalid-feedback">
                            Please provide a discount.
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Category</label>
                          <select
                            {...register("categoryId", { required: true })}
                            className="form-select"
                          >
                            {categories.map((category) => (
                              <option
                                key={category.categoryId}
                                value={category.categoryId}
                              >
                                {category.cartegoryName}
                              </option>
                            ))}
                          </select>
                          <div className="invalid-feedback">
                            Please select a category.
                          </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
              <h2 className="tm-block-title">Product Categories</h2>
              <div className="tm-product-table-container">
                <table className="table tm-table-small tm-product-table">
                  <tbody>
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <tr key={cat.categoryId}>
                          <td className="tm-product-name">
                            {cat.cartegoryName}
                          </td>
                          <td className="text-center">
                            <a
                              href="#"
                              className="tm-product-delete-link"
                              onClick={() =>
                                handleDeleteCategory(cat.categoryId)
                              } // Gọi hàm xóa
                            >
                              <i className="far fa-trash-alt tm-product-delete-icon"></i>
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">No categories found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)} // Cập nhật giá trị input
                />
              </div>
              <button
                className="btn btn-primary btn-block text-uppercase mb-3"
                onClick={handleAddCategory} // Gọi hàm khi nhấn nút
              >
                Add new category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodList;
