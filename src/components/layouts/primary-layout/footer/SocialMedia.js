import React from "react";
import { GrInstagram } from "react-icons/gr";
import { ImTwitter } from "react-icons/im";
import { GrFacebook } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import "bootstrap/dist/css/bootstrap.min.css";

export const SocialMedia = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      padding: "6px",
      width: "40px",
      height: "40px",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
    };
  };
  return (
    <>
      <p style={{ marginRight: "429px", marginTop: "17px" }}>
        :لینک های ارتباطی
      </p>
      <motion.div
        style={{ display: "flex" }}
        className="social-btns"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <NavLink className="btn twitter" style={navLinkStyles} to="/">
          <ImTwitter
            className="fa fa-twitter"
            style={{
              width: "80px",
              height: "80px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          />
        </NavLink>
        <NavLink className="btn instagram" style={navLinkStyles} to="/">
          <GrInstagram className="fa fa-instagram" />
        </NavLink>
        <NavLink className="btn facebook" style={navLinkStyles} to="/">
          <GrFacebook className="fa fa-facebook" />
        </NavLink>
      </motion.div>
    </>
  );
};
