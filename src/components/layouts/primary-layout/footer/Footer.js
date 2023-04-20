import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CopyRight } from "./CopyRight";
import { AboutUs } from "./AboutUs";
import { SocialMedia } from "./SocialMedia";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.div
      className="wrapper "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <nav
        className="text-center text-dark p-2 mt-5"
        style={{
          backgroundColor: "rgb(238, 234, 245)",
          display: "flex",
          gap: "60px",
          alignItems: "center",
          justifyContent: "center",
          bottom: 0,
          position: "fixed",
          left: 0,
          width: "100%",
        }}
      >
        <AboutUs />
        <SocialMedia />
        <CopyRight />
      </nav>
    </motion.div>
  );
};
