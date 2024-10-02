import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
const Header = () => {
    return (
      <header className="header">
        <h1 className="logo">Victory</h1>
        <nav>
          <ul className="nav-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/menu">Our Menus</NavLink></li>
            <li><NavLink to="/blog">Blog Entries</NavLink></li>
            <li><NavLink to={`/couponStorage`}>My Coupon</NavLink></li>
            <li><NavLink to="/table-reservation">Table Reservation</NavLink></li>
            <li><NavLink to={`/cart/1`}><i class="fa-solid fa-cart-shopping fa-lg"></i></NavLink></li>
            <li><NavLink to={`/admin`}><i class="fa-solid fa-user-gear fa-xl"></i></NavLink></li>
            <lí><NavLink to={`/chat`}><i class="fa-solid fa-comments fa-lg"></i></NavLink></lí>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;