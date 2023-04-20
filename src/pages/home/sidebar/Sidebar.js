import React, { useCallback, useState } from "react";
import "../../../assets/style.css";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory } from "../../../redux/categorySlice/categorySlice";
import { getProduct } from "../../../redux/productSlice/ProductSlice";
const URL = "http://localhost:300/files";

export function Sidebar() {
  const [serach, setSearch] = useSearchParams();
  const { category } = useSelector((state) => state.category);
  const { userId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  /**********************pagination**************************/
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);

  let limit = 3;
  const fetchProducts = useCallback(
    async (currentPage) => {
      const res = await fetch(
        `http://localhost:300/products?_page=${currentPage}&_limit=${limit}&category=${userId}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      setItems(data);
      setCurrentPage(currentPage);
    },
    [limit, userId]
  );
  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts, setSearch]);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    fetchProducts(currentPage);
    setSearch({ currentPage, limit });
  };

  /**********************************************/
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "black" : "#fe0883",
      textDecoration: "none",
      padding: "20px",
    };
  };
  console.log(currentPage, serach);

  return (
    <div>
      <div className="primary ">
        <ListGroup
          dir="rtl"
          style={{
            width: "25%",
            height: "100vh",
            boxShadow: "0px 10px 10px 5px gray",
            lineHeight: "30px",
            float: "right",
            color: "white",
            marginBottom: "85px",
          }}
        >
          {category.map((item) => (
            <ListGroup.Item key={item.id} className="categories">
              <NavLink to={`${item.id}`} style={navLinkStyles}>
                <div className="container">
                  <img src={`${URL}/${item.icon}`} alt=" تصویر کالا" />

                  <div className="title"> {item.name.slice(0, 25)}...</div>
                </div>
              </NavLink>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div dir="rtl">
          <div className="row m-2 ">
            {userId.length > 0
              ? items.map((item) =>
                  item.category === Number(userId) ? (
                    <div
                      key={item.id}
                      style={{ margin: "40px" }}
                      className="col-sm-4 col-md-3 v my-2 shadow p-3 mb-5 bg-body rounded  "
                      onClick={() => navigate(`/productDetail/${item.id}`)}
                    >
                      <div
                        className="card shadow-sm w-100"
                        style={{ minHeight: 225 }}
                      >
                        <div className="card-body">
                          <h6 className="card-title text-center h5">
                            {item.name}
                          </h6>
                          <h6 className="card-subtitle mb-2 text-muted text-center">
                            {item.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                            تومان
                          </h6>

                          <p className="card-text">
                            <img
                              src={`${URL}/${item.thumbnail}`}
                              alt="عکس محصول"
                              style={{ width: "100%", height: "150px" }}
                            />
                          </p>
                          <NavLink to={`${item.id}`} style={navLinkStyles}>
                            جزئیات بیشتر...
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  ) : null
                )
              : null}
          </div>
        </div>
      </div>
      <div dir="rtl" style={{ position: "relative", bottom: "30px" }}>
        <ReactPaginate
          previousLabel={"قبلی"}
          nextLabel={"بعدی"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center "}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}
