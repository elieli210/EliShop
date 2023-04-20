import React from "react";
//import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getDeliveredOrder,
  getNotDeliveredOrder,
  getOrder,
} from "../../redux/orderSlice/OrderSlice";

export const Filter = () => {
  const dispatch = useDispatch();
  //const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const handleChange = (event) => {
    if (event.target.value === "false") {
      dispatch(getDeliveredOrder());
    } else if (event.target.value === "true") {
      dispatch(getNotDeliveredOrder());
    }
  };
  return (
    <form  onChange={(event) => handleChange(event)}>
      <input className="px-2" value="false" type="radio" name="radio" />
      در انتظار ارسال
      <input className="px-2" value="true" type="radio" name="radio" />
      تحویل شده
    </form>
  );
};
