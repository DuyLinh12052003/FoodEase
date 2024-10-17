import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Component/Include/Home/Footer";
import Header from "./Component/Include/Home/Header";
import AdminLayOut from "./Component/View/Admin/AdminLayOut";
import CouponFormPage from "./Component/View/Admin/Coupon/CouponFormPage";
import CouponPage from "./Component/View/Admin/Coupon/CouponPage";
import Inventory from "./Component/View/Admin/Inventory/Inventory.js";
import Notification from "./Component/View/Admin/Notification/Notification";
import OrderPage from "./Component/View/Admin/Order/OrderPage";
import FoodPage from "./Component/View/Admin/Product/FoodPage";
import ReservationAcceptedList from "./Component/View/Admin/Reservation/ReservationAcceptedList";
import ReservationCancelledList from "./Component/View/Admin/Reservation/ReservationCancelledList";
import ReservationList from "./Component/View/Admin/Reservation/ReservationList";
import Revenue from "./Component/View/Admin/Revenue/Revenue";
import UserFormPage from "./Component/View/Admin/User/UserFormPage";
import UserPage from "./Component/View/Admin/User/UserPage";
import UserOrder from "./Component/View/Admin/UserBuy/UserOrder";
import CartPage from "./Component/View/Home/Cart/CartPage";
import BoxChatPage from "./Component/View/Home/Chat/BoxChatPage";
import ClaimCouponPage from "./Component/View/Home/CouponStorage/ClaimCouponPage";
import CouponStoragePage from "./Component/View/Home/CouponStorage/CouponStoragePage";
import FoodDetails from "./Component/View/Home/Details/FoodDetails";
import Order from "./Component/View/Home/Details/Order";
import HomeLayOut from "./Component/View/Home/HomeLayOut";
import FoodIndex from "./Component/View/Home/Index/FoodIndex";
import Login from "./Component/View/Home/Login/Login";
import OrderStatus from "./Component/View/Home/MyOrder/OrderStatus";
import OrderHistoryPage from "./Component/View/Home/OrderHistory/OrderHistoryPage";
import TableReservation from "./Component/View/Home/TableReservation/TableReservation";
import Thanks from "./Component/View/Home/Thank/Thanks";
import WishList from "./Component/View/Home/WishList/WishList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomeLayOut />}>
            <Route index element={<FoodIndex />} />
            <Route path="login" element={<Login />} />
            <Route path="notification" element={<Notification />} />
            <Route path="foodDetailsPopup" element={<Order />} />
            <Route path="foodDetails/:id" element={<FoodDetails />} />
            <Route path="cart/:cartId" element={<CartPage />} />
            <Route path="/thanks/:paymentmethod" element={<Thanks />} />
            <Route path="chat" element={<BoxChatPage />} />
            <Route path="couponStorage" element={<CouponStoragePage />} />
            <Route path="WishList" element={<WishList />} />
            <Route path="claimCoupon" element={<ClaimCouponPage />} />
            <Route
              path="orderHistory/order/:userName"
              element={<OrderHistoryPage />}
            />
            <Route path="table-reservation" element={<TableReservation />} />
            <Route path="/myOrder" element={<OrderStatus />} />
          </Route>

          <Route path="/admin" element={<AdminLayOut />}>
            <Route index element={<OrderPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="user/create" element={<UserFormPage />} />
            <Route path="user/update/:userId" element={<UserFormPage />} />
            <Route path="foods" element={<FoodPage />} />
            <Route path="coupons" element={<CouponPage />} />
            <Route path="coupon/create" element={<CouponFormPage />} />
            <Route
              path="coupon/update/:couponId"
              element={<CouponFormPage />}
            />
            <Route path="reservation-list" element={<ReservationList />} />
            <Route
              path="reservation-cancelled-list"
              element={<ReservationCancelledList />}
            />
            <Route
              path="reservation-accepted-list"
              element={<ReservationAcceptedList />}
            />
            <Route path="revenue" element={<Revenue />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="UserOrder" element={<UserOrder />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
