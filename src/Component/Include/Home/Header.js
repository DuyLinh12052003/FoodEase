import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import axiosConfig from '../../Config/AxiosConfig';

const Header = () => {
  const [user,setUser] = useState([]);
  
  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async () => {
    const usernameLogin = localStorage.getItem('userNameLogin');
    try {
      const resUser= await axiosConfig.get(`/user/${usernameLogin}`);
    setUser(resUser.data.data);
    console.log(resUser.data.data);
    } catch (error) {
      console.error('error in fetch Data',error);
    }
    }
  return (
    <header className="header">
      <h1 className="logo">Victory</h1>
      <nav>
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/menu">Our Menus</NavLink></li>
          <li><NavLink to="/myOrder">My Order</NavLink></li>
          
          <li className="dropdown" >
            <NavLink to="#">My Account</NavLink>
              <ul className="dropdown-content">
                <li><NavLink to="/couponStorage"> <i class="fa-solid fa-ticket-simple"></i> Coupon Storage</NavLink></li>
                <li><NavLink to={`/orderHistory/order/${user?.userName}`}><i class="fa-solid fa-clock-rotate-left"></i>Order History</NavLink></li>
              </ul>
          </li>
          <li><Link to="/table-reservation">Đặt Bàn</Link></li>
          <li><NavLink to={`/cart/${user.userId}`}><i className="fa-solid fa-cart-shopping fa-lg"></i></NavLink></li>
          <li><NavLink to={`/admin`}><i className="fa-solid fa-user-gear fa-xl"></i></NavLink></li>
          <li><NavLink to={`/chat`}><i className="fa-solid fa-comments fa-lg"></i></NavLink></li>
          <li><NavLink to={`/login`}><i class="fa-solid fa-right-to-bracket fa-xl"></i></NavLink></li>
          {
            user && (
              <div>{user?.userName}</div>
            )
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;
