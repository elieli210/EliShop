// } from "bootstrap";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import MyToast from "./MyToast";
import DeleteModal from "./ModalDelete";
import axios from "axios";
import MyToastEdit from "./MyToastEdit";
import ModalEdit from "./ModalEdit";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:300/files";
const URL_PRODUCT = "http://localhost:300/products";

export const PanelProduct = () => {
  //**********************pagination************************* */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [tempItem, setTempItem] = useState();
  const [items, setItems] = useState([]);
  const [showToastEdit, setShowToastEdit] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState(0);
  const [price, setPrice] = useState();
  const [tempEdit, setTempEdit] = useState();
  const [pageCount, setpageCount] = useState(0);
  const [quantity, setQuantity] = useState();
  const [subcategory, setSubcategory] = useState(0);
  const [image, setImage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  let limit = 7;
  //const URL = "http://localhost:300";
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

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    fetchProducts(currentPage);
  };

  //////Edit//////
  const handleEdit = (id) => {
    setTempEdit(id);
    setShowStore(true);
    if (id) {
      axios
        .get(`${URL_PRODUCT}/${id}`)
        .then((response) => {
          if (response.data !== null) {
            setName(response.data.name);
            setPrice(response.data.price);
            setCategory(response.data.category);
            setThumbnail(response.data.thumbnail);
            setDescription(response.data.description);
            setQuantity(response.data.quantity);
            setSubcategory(response.data.subcategory);
            setImage(response.data.image);
          }
        })
        .catch((error) => {
          console.log("Error" + error);
        });
    }
  };

  const handleDeletModal = (item) => {
    setTempItem(item);
    setIsModalOpen(true);
  };

  return (
    <div>
      {isModalOpen && (
        <DeleteModal
          handleCancel={() => setIsModalOpen(false)}
          setIsModalOpen={setIsModalOpen}
          tempItem={tempItem}
          isModalOpen={isModalOpen}
          setShowToast={setShowToast}
          fetchProducts={fetchProducts}
          currentPage={currentPage}
        />
      )}
      <div style={{ display: showToast ? "block" : "none" }}>
        <MyToast
          show={showToast}
          message={"محصول مورد نظر با موفقیت پاک شد🦄."}
          type={"danger"}
        />
      </div>
      <ModalEdit
        fetchProducts={fetchProducts}
        currentPage={currentPage}
        handleCancel={() => setShowStore(false)}
        setShowStore={setShowStore}
        tempEdit={tempEdit}
        showStore={showStore}
        showToastEdit={showToastEdit}
        thumbnail={thumbnail}
        image={image}
        setImage={setImage}
        name={name}
        setName={setName}
        description={description}
        category={category}
        setCategory={setCategory}
        price={price}
        setPrice={setPrice}
        setThumbnail={setThumbnail}
        setQuantity={setQuantity}
        quantity={quantity}
        setShowToastEdit={setShowToastEdit}
        setDescription={setDescription}
        setSubcategory={setSubcategory}
        subcategory={subcategory}
      />
      {/* )} */}
      <div style={{ display: showToastEdit ? "block" : "none" }}>
        <MyToastEdit
          show={showToastEdit}
          message={"🦄محصول مورد نظر با موفقیت تغییر کرد."}
          type={"danger"}
        />
      </div>

      <Table
        striped
        bordered
        hover
        size="sm"
        className="w-50 p-3 text-center"
        style={{ margin: " 50px 330px" }}
      >
        <thead>
          <tr className="bg-light">
            <th>تصویر</th>
            <th>نام کالا</th>
            <th>دسته بندی</th>
            <th>ویرایش-حذف</th>
          </tr>
        </thead>
        {items.length > 0
          ? items?.map((item, i) => (
              <>
                <thead key={i}>
                  <tr id={item.id}>
                    <td>
                      <img
                        src={`${URL}/${item.thumbnail}`}
                        alt=" تصویر کالا"
                        style={{ width: "40px", height: "50px" }}
                        onClick={() => navigate(`/productDetail/${item.id}`)}
                      />
                    </td>
                    <td>{item?.name}</td>
                    {item.category === 2 && item.subcategory === 3 ? (
                      <td>{`لباس دخترانه تابستانی/تی شرت`}</td>
                    ) : item.category === 3 && item.subcategory === 4 ? (
                      <td>{`لباس  دخترانه زمستانی / هودی`}</td>
                    ) : item.category === 1 && item.subcategory === 1 ? (
                      <td>{`شلوار/جین `}</td>
                    ) : item.category === 1 && item.subcategory === 2 ? (
                      <td>{`شلوار/ مام فیت`}</td>
                    ) : item.category === "1" && item.subcategory === "1" ? (
                      <td>{`شلوار/جین`}</td>
                    ) : item.category === "1" && item.subcategory === "2" ? (
                      <td>{`شلوار/مام فیت`}</td>
                    ) : item.category === "2" && item.subcategory === "3" ? (
                      <td>{`لباس دخترانه تابستانی/ تی شرت`}</td>
                    ) : item.category === "3" && item.subcategory === "4" ? (
                      <td>{`لباس دخترانه زمستانی/ هودی`}</td>
                    ) : null}

                    <td
                      style={{
                        gap: "3px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        type="button"
                        className="enter"
                        onClick={() => {
                          handleEdit(item.id);
                          // showToastMessage();
                        }}
                      >
                        <AiFillEdit />
                      </button>

                      <button
                        type="button"
                        className="enter btn-remove"
                        onClick={() => handleDeletModal(item)}
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    </td>
                  </tr>
                </thead>
              </>
            ))
          : null}
      </Table>

      <ReactPaginate
        previousLabel={"قبلی"}
        nextLabel={"بعدی"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
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
  );
};
