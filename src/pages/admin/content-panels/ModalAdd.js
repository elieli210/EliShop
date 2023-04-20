import { CKEditor } from "@ckeditor/ckeditor5-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  createProduct,
  getProduct,
} from "../../../redux/productSlice/ProductSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axiosInstance from "../../../api/http";
import { unwrapResult } from "@reduxjs/toolkit";

function ModalAdd({
  showStore,
  setShowStore,
  handleCancel,
  setShowToastAdd,
  currentPage,
  fetchProducts,
}) {
  const defaultImg = "41cfdff705619935d61b721da4dffab7";
  const [category, setCategory] = useState(0);
  const [categoryErr, setCategoryErr] = useState("");
  const [subcategory, setSubcategory] = useState(0);
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [price, setPrice] = useState();
  const [pirceErr, setPriceErr] = useState("");
  const [thumbnail, setThumbnail] = useState(defaultImg);
  const [thumbnailErr, setThumbnailErr] = useState("");
  const [quantity, setQuantity] = useState();
  const [image, setImage] = useState([defaultImg]);
  const [loading, setLoading] = useState(false);

  console.log(image);
  console.log(thumbnail);
  const dispatch = useDispatch();
  const URL = "http://localhost:300/files";

  const resetInputs = () => {
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setThumbnail("");
    setQuantity("");
    setSubcategory("");
    setImage([]);
    setThumbnailErr("");
    setThumbnailErr("");
    setDescriptionErr("");
  };

  ///////add/////
  const onImageChange = async (e) => {
    let formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    await axiosInstance.post("/upload", formData).then((res) => {
      return setThumbnail(res.data.filename);
    });
  };
  const handleName = (event) => {
    setName(event.target.value);
    if (/\d/.test(name)) {
      setNameErr(".نام نباید شامل اعداد باشد");
    } else if (event.target.value === "") {
      setNameErr("این قسمت نمی تواند خالی باشد");
    } else if (name.length <= 2) {
      setNameErr(" طول کاراکتر وارد شده کوتاه است");
    } else {
      setNameErr("");
    }
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
    if (event.target.value === "") {
      setCategoryErr("این قسمت نمی تواند خالی باشد");
    } else {
      setCategoryErr("");
    }
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
    if (event.target.value.length <= 2) {
      setPriceErr(" طول کاراکتر وارد شده کوتاه است");
    } else if (event.target.value === "") {
      setPriceErr("این قسمت نمی تواند خالی باشد");
    } else {
      setPriceErr("");
    }
  };
  const handleSave = () => {
    let newProduct = {
      name: name,
      price: price,
      category: Number(category),
      subcategory: Number(subcategory),
      description: description,
      thumbnail: thumbnail,
      quantity: quantity,
      image: image,
    };
    setLoading(true);

    dispatch(createProduct(newProduct))
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
    dispatch(getProduct());
    setShowStore(false);
    setTimeout(() => {
      setShowToastAdd(true);
      setTimeout(() => setShowToastAdd(false), 3000);
      dispatch(getProduct());
    }, 1000);
  };

  const onBigImageChange = async (e) => {
    let formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    await axiosInstance.post("/upload", formData).then((res) => {
      return setImage([res.data.filename]);
    });
  };
  const isValid =
    nameErr === "" &&
    pirceErr === "" &&
    descriptionErr === "" &&
    categoryErr === "" &&
    thumbnailErr === "" &&
    name !== "" &&
    category !== "" &&
    subcategory !== "" &&
    quantity !== "" &&
    price !== "";
  return (
    <Modal show={showStore} onHide={handleCancel} className="g-5 " dir="rtl">
      <Modal.Header
        closeButton
        className="enter"
        style={{ display: "flex", gap: "311px" }}
      >
        <Modal.Title>افزودن کالا</Modal.Title>
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
            alt=" "
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
            alt=" "
          />

          <p>نام کالا</p>
          <input
            value={name}
            required
            type="text"
            onChange={(event) => {
              handleName(event);
            }}
          />
          <p>{nameErr}</p>
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
            handleCategory(event);
          }}
        >
          <option value={1} defaultValue={category} className="pant-fit">
            شلوار
          </option>
          <option value={2} defaultValue={category} className="t-shirt">
            لباس دخترانه تابستانی
          </option>
          <option value={3} defaultValue={category} className="hoodi">
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
          <option value={1} defaultValue={subcategory} className="pant">
            جین
          </option>
          <option value={2} defaultValue={subcategory} className="pant-fit">
            مام فیت
          </option>
          <option value={3} defaultValue={subcategory} className="t-shirt">
            تی شرت
          </option>
          <option value={4} defaultValue={subcategory} className="hoodi">
            هودی
          </option>
        </select>
        <p>قیمت کالا</p>

        <input
          value={price}
          required
          type="text"
          onChange={(event) => {
            handlePrice(event);
          }}
        />
        <p>توضیحات</p>
        {/* -------------------------Text Edditor----------------------  */}

        <CKEditor
          dir="rtl"
          editor={ClassicEditor}
          data={description}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            setDescription(editor.getData());
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
        />
        <p>{descriptionErr}</p>
      </Modal.Body>

      <Modal.Footer dir="rtl" className="d-flex justify-content-between">
        <Button
          disabled={!isValid && loading}
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

export default ModalAdd;
