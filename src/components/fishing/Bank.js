import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addOrders } from "../../redux/orderSlice/OrderSlice";

export const Bank = () => {
  const navigate = useNavigate();
  const [searchParams, setsearchparams] = useSearchParams();
  const [result, setResult] = useState(searchParams.get("result"));
  const dispatch = useDispatch();
  console.log(setResult, setsearchparams);

  /************* Create final post object **************/
  const clientData = JSON.parse(localStorage.getItem("formInput"));
  const total = JSON.parse(String(localStorage.getItem("total")));
  const orders = JSON.parse(localStorage.getItem("cartItems"));
  if (orders) {
    clientData.products = orders;
    clientData.prices = String(total);
  }
  /************* post user info & products **************/

  useEffect(() => {
    if (result === "success") {
      dispatch(addOrders(clientData))
        .unwrap()
        .then((res) => {
          if (res.status === 200) {
            localStorage.clear();
          }
        });
    }
  }, [dispatch]);

  return (
    <div>
      {result === "success" ? (
        <div
          value={result}
          className="d-flex flex-column justify-content-center align-items-center "
        >
          <img
            src="./assets/okey.svg"
            alt="success icon"
            className=" mt-5 mb-3"
          />
          <p>پرداخت شما با موفقیت ثبت گردید.</p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => navigate("/")}
          >
            بازگشت به سایت
          </button>
        </div>
      ) : result === "cancel" ? (
        <div
          value={result}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <img
            src="./assets/cancel.svg"
            alt="not success icon"
            className=" mt-5 mb-3"
          />
          <p>پرداخت شما موفقیت آمیز نبود. سفارش شما در انتظار پرداخت است.</p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => navigate("/")}
          >
            بازگشت به سایت
          </button>
        </div>
      ) : (
        <div>متاسفانه چیزی برای نشان دادن وجود ندارد!</div>
      )}
    </div>
  );
};
