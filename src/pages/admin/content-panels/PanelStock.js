import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { EditText } from "react-edit-text";
import axiosInstance from "../../../api/http";

export const PanelStock = () => {
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [newPrice, setNewPrice] = useState([]);

  /*********************** Pagination *******************************/
  let limit = 7;
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `http://localhost:300/products?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      setItems(data);
    };
    getComments();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `http://localhost:300/products?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage);
    setItems(commentsFormServer);
    // scroll to the top
    window.scrollTo(0, 0);
  };

  //////// price
  const handleChange = (e, id) => {
    const idx = items.findIndex((item) => item.id === id);
    const newPost = [...items];
    newPost[idx].price = e.target.value;
    setItems(newPost);
    const newPriceList = [...newPrice];
    const newIdx = newPrice.findIndex((item) => item.id === id);
    if (newIdx === -1) {
      const newObject = {
        id: id,
        newValPrice: e.target.value,
        newValStock: newPost[idx].quantity,
      };
      newPriceList.push(newObject);
    } else {
      newPriceList[newIdx].newValPrice = e.target.value;
    }
    setNewPrice(newPriceList);
  };
  // Stock
  const handleChangeStock = (e, id) => {
    const idx = items.findIndex((item) => item.id === id);
    const newPost = [...items];
    console.log("newPost", newPost);
    newPost[idx].quantity = e.target.value;
    setItems(newPost);
    const newStockList = [...newPrice];
    const newIdx = newPrice.findIndex((item) => item.id === id);
    if (newIdx === -1) {
      const newObject = {
        id: id,
        newValPrice: newPost[idx].price,
        newValStock: e.target.value,
      };
      newStockList.push(newObject);
    } else {
      newStockList[newIdx].newValStock = e.target.value;
    }

    setNewPrice(newStockList);
  };
  const saveEdit = (e) => {
    e.preventDefault();
    console.log("newPrice", newPrice);
    newPrice.forEach((element) => {
      try {
        let entiresData = {
          price: element.newValPrice,
          quantity: element.newValStock,
        };
        console.log(entiresData);
        axiosInstance
          .patch(`http://localhost:300/products/${element.id}`, entiresData)
          .then((res) => {
            console.log(res);
          });
      } catch (error) {
        console.log("error!");
      }
    });
  };

  return (
    <div>
      <button
        style={{ marginRight: "43px" }}
        onClick={(e) => {
          saveEdit(e);
        }}
        className="enter"
        type="submit"
      >
        ذخیره
      </button>

      <Table
        striped
        bordered
        hover
        size="sm"
        className="w-50 p-3 text-center "
        style={{ margin: " 50px 330px" }}
      >
        <thead>
          <tr className="bg-light">
            <th>کالا</th>
            <th>قیمت </th>
            <th>موجودی </th>
          </tr>
        </thead>

        {items.length > 0 &&
          items?.map((item, i) => (
            <thead key={i}>
              <tr id={item.id}>
                <td>{item?.name}</td>
                <td className="d-flex gap-2 justify-content-center">
                  <EditText
                    value={item.price}
                    style={{ width: "100px" }}
                    className="form-control text-center "
                    onChange={(e) => {
                      handleChange(e, item.id);
                    }}
                  />{" "}
                  <label htmlFor="">تومان</label>
                </td>
                <td>
                  <EditText
                    value={item.quantity}
                    type={"text"}
                    className="form-control text-center d-flex justify-content-center align-items-center"
                    onChange={(e) => {
                      handleChangeStock(e, item.id);
                    }}
                  />
                </td>
              </tr>
            </thead>
          ))}
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
