import React from "react";
//import { HeaderSecond } from "../header/HeaderSecond";
import { PanelStock } from "./content-panels/PanelStock";
import { motion } from "framer-motion";

export const ContentStock = () => {
  return (
    <motion.div
      dir="rtl"
      className="wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="d-flex justify-content-between px-5 py-3">
        <h4>مدیریت موجودی وقیمت ها</h4>
      </div>

      <PanelStock />
    </motion.div>
  );
};
