import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Nhập useTranslation
import { Link, NavLink } from "react-router-dom";
import i18n, { customTranslate } from "../../../i18n";
import "./Header.css";

const Header = () => {
  const [userName, setUserName] = useState(null);
  const { t } = useTranslation(); // Khai báo useTranslation
  const [isOpen, setIsOpen] = useState(false); // Quản lý trạng thái mở/đóng dropdown

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false); // Đóng dropdown sau khi chọn ngôn ngữ
  };

  const fetchData = async () => {
    const usernameLogin = localStorage.getItem("userNameLogin");
    setUserName(usernameLogin);
    console.log(usernameLogin);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <header className="header">
      <h1 className="logo">Victory</h1>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/">{customTranslate("Home")}</NavLink>
          </li>
          <li>
            <NavLink to="/menu">{customTranslate("Our Menus")}</NavLink>
          </li>
          <li>
            <NavLink to="/blog">{customTranslate("Blog Entries")}</NavLink>
          </li>
          
          <li className="dropdown">
            <NavLink to="#">{customTranslate("My Account")}</NavLink>
            <ul className="dropdown-content">
              <li>
                <NavLink to="/couponStorage">
                  <i className="fa-solid fa-ticket-simple"></i>{" "}
                  {customTranslate("Coupon Storage")}
                </NavLink>
              </li>
              <li>
                <NavLink to={`/orderHistory/order/${userName}`}>
                  <i className="fa-solid fa-clock-rotate-left"></i>
                  {customTranslate("Order History")}
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/table-reservation">{customTranslate("Table Reservation")}</Link>
          </li>
          <li>
            <NavLink to={`/cart/1`}>
              <i className="fa-solid fa-cart-shopping fa-lg"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/admin`}>
              <i className="fa-solid fa-user-gear fa-xl"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/chat`}>
              <i className="fa-solid fa-comments fa-lg"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/login`}>
              <i className="fa-solid fa-right-to-bracket fa-xl"></i>
            </NavLink>
          </li>
          {userName && <div>{userName}</div>}
          <li >
              <i className="fa-xl fas fa-globe" onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}></i> 
            {isOpen && (
              <ul>
                <li onClick={() => changeLanguage("en")} style={{ cursor: "pointer" }}>
                  {customTranslate("English")}
                </li>
                <li onClick={() => changeLanguage("vi")} style={{ cursor: "pointer" }}>
                  {customTranslate("Vietnamese")}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
