import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import logoImg from "../../../../assets/pic/pic.png";
export const Header = () => {
  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  useEffect(() => {
    setBasket(() => JSON.parse(localStorage.getItem("cartItems")));
  }, [basket]);

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "rgb(238, 234, 245)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bottom: "0px",
        boxShadow: "2px 4px rgb(268, 234, 285)",
        width: "100%",
        height: "98px",
      }}
    >
      <div className="social-btns">
        <NavLink
          className="btn basket"
          to="/basket"
          style={{
            width: "126px",
            height: "84px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-24px",
          }}
        >
          <FaShoppingCart
            className="fa fa-basket"
            style={{
              top: "2px",
              position: "relative",
            }}
          />
          سبد خرید
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center "
            style={{
              color: "white",
              width: "25px",
              height: "1.5rem",
              position: "absolute",
              bottom: "57px",
              left: "-1px",
              transform: "translate(25%,25%)",
            }}
          >
            {basket !== null && basket !== undefined ? (
              basket.length
            ) : (
              <div>0</div>
            )}
          </div>
        </NavLink>
        <NavLink
          className="btn admin"
          style={{
            top: "-59px",
            left: "171px",
            position: "relative",
            fontSize: "16px",
            textDecoration: "none",

            width: "126px",
            height: "84px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-24px",
          }}
          to="/login"
        >
          <FiLogIn
            className="fa fa-admin"
            style={{
              top: "2px",
              position: "relative",
            }}
          />
          مدیریت
        </NavLink>
        <NavLink
          style={{
            top: "-147px",
            marginRight: "-824px",
            position: "relative",
            fontSize: "20px",
            textDecoration: "none",
            color: "#fe0883",
            fontWeight: "bold",
          }}
          to="/"
        >
          فروشگاه اینترنتی لباس الی شاپ
          <img src={logoImg} alt="logo" width="200px" className="rounded" />
        </NavLink>
      </div>
    </nav>
  );
};
