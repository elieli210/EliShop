import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Table } from "react-bootstrap";
import ModalDelete from "./ModalDelete";
import ToastDelete from "./ToastDelete";
import basketImg from "../../assets/pic/basket.png";

export const BasketShopping = () => {
  const navigate = useNavigate();
  const [basket, setBasket] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempItem, setTempItem] = useState();
  const [showToast, setShowToast] = useState(false);
  const [counting, setCounting] = useState(1);
  const [showButton, setShowButton] = useState(true);

  /************************Total price *****************/

  let total = 0;
  const initialValue = 0;
  if (basket) {
    total = basket.reduce(
      (accumulator, current) => accumulator + current.price * current.count,
      initialValue
    );
  }

  useEffect(() => {
    setBasket(JSON.parse(localStorage.getItem("cartItems")));
  }, [counting]);

  useEffect(() => {
    localStorage.setItem("total", JSON.stringify(total));
  }, [total]);

  /************************remove item *****************/

  const handleRemove = (item) => {
    setTempItem(item);
    setIsModalOpen(true);
  };

  /******************* add botton **************************/
  const addItem = (item) => {
    let clickedItem = basket.filter((product) => product.id === item.id);
    setCounting(++clickedItem[0].count);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        [...basket, ...clickedItem].filter(
          (c, index) => [...basket, ...clickedItem].indexOf(c) === index
        )
      )
    );
  };
  /******************* minus botton **************************/

  const minusItem = (id) => {
    let clickedItem = basket.filter((product) => product.id === id);
    setCounting(--clickedItem[0].count);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        [...basket, ...clickedItem].filter(
          (c, index) => [...basket, ...clickedItem].indexOf(c) === index
        )
      )
    );
  };

  /*********************** Remove basket *************************/
  const removeAllRows = () => {
    const table = document.getElementById("mytable");
    table.innerHTML = "";
    const totalItems = document.getElementById("total");
    totalItems.innerHTML = "";
    setShowButton(false);
    localStorage.clear("cartItems");
  };

  return (
    <motion.div
      dir="rtl"
      className="wrapper "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div style={{ display: showToast ? "block" : "none" }}>
        <ToastDelete
          show={showToast}
          message={"محصول مورد نظر با موفقیت پاک شد🦄."}
          type={"danger"}
        />
      </div>
      {isModalOpen && (
        <ModalDelete
          handleCancel={() => setIsModalOpen(false)}
          setIsModalOpen={setIsModalOpen}
          tempItem={tempItem}
          isModalOpen={isModalOpen}
          setShowToast={setShowToast}
          total={total}
        />
      )}
      <h4 className="m-5">سبد خرید</h4>
      {basket <= 0 ? (
        <img
          src={basketImg}
          alt="سبد خرید خالی"
          style={{ marginRight: "489px", width: "350px" }}
        />
      ) : (
        <>
          <Table
            id="mytable"
            striped
            bordered
            hover
            size="sm"
            className="w-50 p-3 text-center"
            style={{ margin: " 50px 330px" }}
          >
            <thead>
              <tr className="bg-light">
                <th>نام کالا</th>
                <th> قیمت</th>
                <th>تعداد</th>
                <th>مجموع مبلغ</th>
                <th>حذف</th>
              </tr>
            </thead>

            {basket !== null && basket !== undefined ? (
              basket?.map((item, i) => (
                <>
                  <tbody key={i}>
                    <tr id={item.id}>
                      <td onClick={() => navigate(`/productDetail/${item.id}`)}>
                        {item.name}
                      </td>
                      <td>{item.price}</td>
                      <td>
                        <button
                          className="px-2 rounded bg-info text-white border-white"
                          onClick={() => {
                            addItem(item);
                          }}
                        >
                          +
                        </button>
                        {item.count}

                        <button
                          className="px-2 rounded bg-danger text-white border-white"
                          onClick={() => {
                            minusItem(item.id);
                          }}
                        >
                          -
                        </button>
                      </td>
                      <td>{parseInt(item.count) * parseInt(item.price)}</td>
                      <td>
                        <button
                          className="px-2 rounded bg-danger text-white border-white"
                          onClick={() => {
                            handleRemove(item);
                          }}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </>
              ))
            ) : (
              <img
                src={basketImg}
                alt="سبد خرید خالی"
                style={{ marginRight: "489px", width: "350px" }}
              />
            )}
          </Table>

          <div
            className="d-flex "
            style={{
              display: showButton ? "block" : "none",
              gap: "112px",
              marginRight: "330px",
            }}
          >
            <div id="total" className="">{`مجموع کل مبلغ : ${total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`}</div>

            <button
              style={{ display: showButton ? "block" : "none" }}
              disabled={basket.length === 0}
              type="button"
              className=" enter "
              onClick={() => navigate("/formFinalize")}
            >
              نهایی کردن سبد خرید
            </button>
            <button
              style={{ display: showButton ? "block" : "none" }}
              type="button"
              className=" enter"
              onClick={() => {
                removeAllRows();
              }}
            >
              خالی کردن سبد خرید
            </button>
          </div>
          {!showButton ? (
            <img
              src={basketImg}
              alt="سبد خرید خالی"
              style={{ marginRight: "489px", width: "350px" }}
            />
          ) : null}
        </>
      )}
    </motion.div>
  );
};
