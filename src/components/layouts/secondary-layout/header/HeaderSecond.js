import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { IS_LOGGGED_IN } from "../../../../config/constants";

export const HeaderSecond = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "blue" : "black",
      textDecoration: "none",
      padding: "20px",
    };
  };
  const navigate = useNavigate();
  const handleExit = () => {
    localStorage.setItem(IS_LOGGGED_IN, false);
    localStorage.clear();
    navigate("/");
  };
  return (
    <div
      className=" "
      style={{
        backgroundColor: "rgb(238, 234, 245)",
        display: "flex",
        gap: "110px",
        alignItems: "center",
        justifyContent: "center",
        bottom: "0px",
      }}
    >
      <button type="button" className="enter" onClick={handleExit}>
        خروج
      </button>
      <NavLink to="/" style={navLinkStyles}>
        بازگشت به سایت
      </NavLink>
      <NavLink to="order" style={navLinkStyles}>
        سفارش ها
      </NavLink>
      <NavLink to="stocks" style={navLinkStyles}>
        موجودی و قیمت ها
      </NavLink>

      <NavLink to="products" style={navLinkStyles}>
        کالاها
      </NavLink>

      <h4>پنل مدیریت فروشگاه الی شاپ</h4>
    </div>
  );
};
