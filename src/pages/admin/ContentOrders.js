import React from "react";
import { PanelOrder } from "./content-panels/PanelOrder";
import { motion } from "framer-motion";

export const ContentOrders = () => {
  return (
    <motion.div
      dir="rtl"
      className="wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="d-flex justify-content-between px-5 py-3">
        <h4>مدیریت سفارش ها</h4>
      </div>

      <PanelOrder />
    </motion.div>
  );
};
