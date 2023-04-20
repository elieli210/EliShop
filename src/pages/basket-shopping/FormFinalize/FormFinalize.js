import React from "react";
import { motion } from "framer-motion";
import { SignUp } from "./SignUp";
import rocketImg from "../../../assets/pic/rocket.png";

export const FormFinalize = () => {
  return (
    <motion.div
      className="wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className=" mt-3 mb-5">
        <div className="row">
          <div className="col-md-7 my-auto">
            <img className="img-fluid w-100" src={rocketImg} alt="" />
          </div>
          <div className="col-md-5 ">
            <SignUp />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
