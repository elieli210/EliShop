import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getProduct } from "../../../redux/productSlice/ProductSlice";
import { IoMdArrowDropleft } from "react-icons/io";
import { getCategory } from "../../../redux/categorySlice/categorySlice";
const URL = "http://localhost:300/files";

export const Cards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store.product);
  const { category } = useSelector((store) => store.category);
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "black" : "#fe0883",
      textDecoration: "none",
      padding: "20px",
      fontSize: "20px",
    };
  };
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <div dir="rtl" className="mb-5">
      {category.map((elem) => (
        <>
          <NavLink to={`sidebar/${elem.id}`} style={navLinkStyles}>
            {`کالاهای گروه ${elem.name}`}
            <IoMdArrowDropleft />
          </NavLink>
          <div className="row m-2 " key={elem.id}>
            {product
              .filter((item) => item.category === elem.id)
              .slice(0, 6)
              .map((item) => {
                return (
                  <div
                    key={item.id}
                    className="col-sm-4 col-md-3 v my-2 shadow p-3 mb-5 bg-body rounded"
                    onClick={() => navigate(`/productDetail/${item.id}`)}
                  >
                    <div
                      className="card shadow-sm w-100"
                      style={{ minHeight: 225 }}
                    >
                      <div className="card-body">
                        <h5 className="card-title text-center ">{item.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted text-center">
                          <span> قیمت: </span>
                          {item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          <span> تومان </span>
                        </h6>
                        <p className="card-text">
                          <img
                            src={`${URL}/${item.thumbnail}`}
                            alt="product pictures"
                            style={{ width: "240px", height: "150px" }}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  // ) : null
                );
              })}
          </div>
        </>
      ))}
    </div>
  );
};
