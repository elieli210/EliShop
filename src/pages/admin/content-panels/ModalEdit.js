import { CKEditor } from "@ckeditor/ckeditor5-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { updateProduct } from "../../../redux/productSlice/ProductSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../../api/http";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";

function ModalEdit({
  image,
  setImage,
  handleCancel,
  showStore,
  setShowStore,
  thumbnail,
  name,
  setName,
  description,
  category,
  tempEdit,
  setCategory,
  price,
  setPrice,
  setThumbnail,
  setQuantity,
  quantity,
  setShowToastEdit,
  setDescription,
  setSubcategory,
  subcategory,
  currentPage,
  fetchProducts,
}) {
  const dispatch = useDispatch();
  const URL = "http://localhost:300/files";
  const [loading, setLoading] = useState(false);
  const resetInputs = () => {
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setThumbnail("");
    setQuantity("");
    setSubcategory("");
    setImage([]);
  };
  //////Edit save//////
  const handleSave = () => {
    let newProduct = {
      id: tempEdit,
      name: name,
      category: Number(category),
      subcategory: Number(subcategory),
      description: description,
      quantity: quantity,
      price: price,
      thumbnail: thumbnail,
      image: image,
    };
    setLoading(true);
    dispatch(updateProduct(newProduct))
      .then(unwrapResult)
      .then(() => {

        fetchProducts(currentPage);
        setLoading(false);
        handleCancel();
        
      })
      .catch((e) => {
        console.log(e?.Message);
        setLoading(false);
      });

    setTimeout(() => {
      setShowToastEdit(true);
      setTimeout(() => setShowToastEdit(false), 3000);
    }, 1000);
    setShowStore(false);
  };

  const onImageChange = async (e) => {
    let formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    await axiosInstance.post("/upload", formData).then((res) => {
      return setThumbnail(res.data.filename);
    });
  };
  const onBigImageChange = async (e) => {
    // let file = e.target.files[0];
    // let picture = URL.createObjectURL(file);
    // setThumbnail(picture);
    let formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    await axiosInstance.post("/upload", formData).then((res) => {
      return setImage([res.data.filename]);
    });
  };
  return (
    <Modal show={showStore} onHide={handleCancel} className="g-5 " dir="rtl">
      <Modal.Header
        closeButton
        className="enter"
        style={{ display: "flex", gap: "311px" }}
      >
        <Modal.Title>ویرایش کالا</Modal.Title>
      </Modal.Header>

      <Modal.Body className="enter">
        <div className="rowExplaine ">
          <p>تصویر کوچک کالا</p>
          <input
            style={{ left: "-129px", position: "relative" }}
            type="file"
            placeholder="تصویر کالا"
            accept="image/*"
            onChange={(event) => {
              onImageChange(event);
            }}
          />

          <img
            style={{
              left: "-37px",
              position: "relative",
              width: "50px",
              height: "50px",
            }}
            src={`${URL}/${thumbnail}`}
            alt="تصویر کالا"
          />
          <p>تصویر بزرگ کالا</p>
          <input
            style={{ left: "-129px", position: "relative" }}
            type="file"
            placeholder="تصویر کالا"
            accept="image/*"
            onChange={(event) => {
              onBigImageChange(event);
            }}
          />

          <img
            style={{
              left: "-37px",
              position: "relative",
              width: "50px",
              height: "50px",
            }}
            src={`${URL}/${image}`}
            alt="تصویر کالا"
          />

          <p>نام کالا</p>
          <input
            defaultValue={name}
            required
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <p>موجودی</p>
        <input
          defaultValue={quantity}
          required
          type="text"
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />
        <p>دسته بندی</p>
        <select
          name="category"
          className="categoryInput"
          placeholder="دسته بندی"
          id={""}
          required
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <option value={1} className="pant-fit">
            شلوار
          </option>
          <option value={2} className="t-shirt">
            لباس دخترانه تابستانی
          </option>
          <option value={3} className="hoodi">
            لباس دخترانه زمستانی
          </option>
        </select>
        <select
          name="subcategory"
          className="subcategoryInput"
          placeholder="زیر دسته بندی"
          id={""}
          required
          onChange={(event) => {
            setSubcategory(event.target.value);
          }}
        >
          <option value={1} className="pant">
            جین
          </option>
          <option value={2} className="pant-fit">
            مام فیت
          </option>
          <option value={3} className="t-shirt">
            تی شرت
          </option>
          <option value={4} className="hoodi">
            هودی
          </option>
        </select>
        <p>قیمت کالا</p>

        <input
          defaultValue={price}
          required
          type="text"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <p>توضیحات</p>
        {/* -------------------------Text Edditor----------------------  */}

        <CKEditor
          dir="rtl"
          editor={ClassicEditor}
          data={description}
          //onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log(data);
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
        />
      </Modal.Body>

      <Modal.Footer dir="rtl" className="d-flex justify-content-between">
        <Button
          disabled={loading}
          size="sm"
          variant="success"
          type="submit"
          className="btn-save enter"
          onClick={() => {
            handleSave();
          }}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              در حال پردازش ...
            </>
          ) : (
            <>ذخیره</>
          )}
        </Button>

        <Button
          size="sm"
          variant="info"
          type="reset"
          onClick={(e) => resetInputs(e)}
        >
          <FontAwesomeIcon icon={faUndo} /> ریست
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEdit;
