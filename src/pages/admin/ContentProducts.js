import React, { useCallback, useEffect, useState } from "react";
import { PanelProduct } from "./content-panels/PanelProduct";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { getProduct } from "../../redux/productSlice/ProductSlice";
import ModalAdd from "./content-panels/ModalAdd";

import MyToastAdd from "./content-panels/MyToastAdd";
export const ContentProducts = () => {
  const [showStore, setShowStore] = useState(false);
  const [showToastAdd, setShowToastAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setpageCount] = useState(0);
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  let limit = 7;
  const fetchProducts = useCallback(
    async (currentPage) => {
      const res = await fetch(
        `http://localhost:300/products?_page=${currentPage}&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      setItems(data);
      setCurrentPage(currentPage);
    },
    [limit]
  );

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  return (
    <motion.div
      dir="rtl"
      className="wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="d-flex justify-content-between my-2 mx-3">
        <h4 className="m-3"> مدیریت کالاها</h4>
        <button
          type="button"
          className="enter"
          style={{ padding: "2px 16px" }}
          onClick={(e) => {
            setShowStore(true);
          }}
        >
          افزودن کالا
        </button>
      </div>
      <div>
        <div style={{ display: showToastAdd ? "block" : "none" }}>
          <MyToastAdd
            show={showToastAdd}
            message={"🦄محصول مورد نظر با موفقیت اضافه گردید."}
            type={"danger"}
          />
        </div>
      </div>
      <ModalAdd
        fetchProducts={fetchProducts}
        currentPage={currentPage}
        handleCancel={() => setShowStore(false)}
        setShowStore={setShowStore}
        showStore={showStore}
        showToastAdd={showToastAdd}
        setShowToastAdd={setShowToastAdd}
      />
      <PanelProduct />
    </motion.div>
  );
};
