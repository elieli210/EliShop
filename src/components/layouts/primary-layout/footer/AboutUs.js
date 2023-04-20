import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { MdWifiCalling3 } from "react-icons/md";

export const AboutUs = () => {
  return (
    <motion.div
      className="social-btns"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NavLink
        to="aboutUs"
        style={{
          position: "relative",
          right: " -625px",
          top: "14px",
          color: "#fe0883",
          textDecoration: "none",
        }}
      >
        درباره ما
      </NavLink>
      <p
        className="contact"
        style={{ position: "relative", left: "519px", color: "#fe0883" }}
      >
        با ما در تماس باشید
      </p>
      <NavLink
        to="/"
        className="btn call"
        style={{
          position: "relative",
          left: "532px",
          width: "50px",
          height: "50px",
        }}
      >
        <MdWifiCalling3 className="fa fa-call" />
      </NavLink>
    </motion.div>
  );
};
