import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../../redux/productSlice/ProductSlice";
import { IoMdArrowDropleft } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import ClothesGuidness from "./ClothesGuidness";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../assets/style.css";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { StarRating } from "./StarRating";

const URL = "http://localhost:300/files";

export const ProductDetail = () => {
  const [show, setShow] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const cardFromLocalStorage = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  const [cartItems, setCartItems] = useState(cardFromLocalStorage);
  const [counter, setCounter] = useState(0);
  const { product } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const decreament = () => {
    counter > 0 ? setCounter(counter - 1) : setCounter(0);
  };
  const increament = (item) => {
    counter < item.quantity ? setCounter(counter + 1) : setCounter(counter);
  };
  console.log("counter", counter);

  /*********************Add to Basket **********************/

  const handleBasket = (item) => {
    const exist = cartItems.find((x) => x.id === item.id);
    //if (cartItems.length > 0) {
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === item.id
            ? { ...exist, count: String(exist.quantity + counter) }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, count: String(counter) }]);
      //}
    }
    navigate("/basket");
  };
  return (
    <div dir="rtl">
      {userId.length > 0
        ? product.map((item) =>
            item.id === Number(userId) ? (
              <>
                <div key={item.id} className="d-flex rounded">
                  {/************************slider*************************/}

                  <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper "
                  >
                    {item.image.map((elem) => {
                      return (
                        <SwiperSlide>
                          <img src={`${URL}/${elem}`} alt="عکس کالا" />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <div className="mt-2 m-5 ">
                    <h4 className="py-2 mt-5">{item.name}</h4>

                    <div className="py-3">
                      {item.category === 2 && item.subcategory === 4 ? (
                        <h6>
                          {`لباس دخترانه تابستانی `}
                          <IoMdArrowDropleft />
                          {`زیر گروه تی شرت`}
                        </h6>
                      ) : item.category === 3 && item.subcategory === 3 ? (
                        <h6>
                          {`لباس  دخترانه زمستانی`}
                          <IoMdArrowDropleft />
                          {`هودی`}
                        </h6>
                      ) : item.category === 1 && item.subcategory === 1 ? (
                        <h6>
                          {`شلوار`}
                          <IoMdArrowDropleft />
                          {`جین`}
                        </h6>
                      ) : item.category === 1 && item.subcategory === 2 ? (
                        <h6>
                          {`شلوار`}
                          <IoMdArrowDropleft />
                          {`مام فیت`}
                        </h6>
                      ) : null}
                    </div>
                    <h6 className="py-3">
                      <span> قیمت: </span>
                      {item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      <span> تومان </span>
                    </h6>
                    {item.quantity === 0 ? (
                      <p>این کالا ناموجود می باشد.</p>
                    ) : (
                      <div className="d-flex gap-2 my-3">
                        <span className="my-2 ">تعداد: </span>
                        <button
                          className="px-3 p-2  rounded bg-info text-white border-white"
                          onClick={() => increament(item)}
                        >
                          +
                        </button>
                        <p className="px-2 my-2 border">{counter}</p>
                        <button
                          className=" p-2 px-3 rounded bg-danger text-white border-white"
                          onClick={() => decreament()}
                        >
                          -
                        </button>
                      </div>
                    )}
                    <div
                      className="d-flex gap-3 "
                      style={{ marginTop: "90px" }}
                    >
                      <button
                        className="enter"
                        disabled={counter === 0}
                        onClick={() => {
                          handleBasket(item);
                        }}
                      >
                        افزودن به سبد خرید
                        <AiOutlineShoppingCart />
                      </button>
                      <button
                        onClick={() => {
                          setShow(true);
                        }}
                        className="enter"
                      >
                        راهنمای سایز لباس
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  style={{ marginRight: "65px", marginTop: "-21px" }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                >
                  {/* <p>{item.description.replace(/(<([^>]+)>)/gi, "")}</p> */}
                </div>
                <StarRating />
            
              </>
            ) : null
          )
        : null}
      {show && (
        <ClothesGuidness
          show={show}
          setShow={setShow}
          handleCancel={() => setShow(false)}
        />
      )}
    </div>
  );
};
