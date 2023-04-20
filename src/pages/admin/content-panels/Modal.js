import "./modal.css";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  getProduct,
} from "../../../redux/productSlice/ProductSlice";

const Modal = (props) => {
  const { tempItem, setIsModalOpen, setShowToast } = props;
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getProduct());
    setIsModalOpen(false);
    setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      dispatch(getProduct());
    }, 1000);
  };
  return (
    <div className="editModal">
      <h4>از پاک کردن {tempItem.name} مطمعن هستید ؟ </h4>
      <button className="cancel" onClick={() => setIsModalOpen(false)}>
        خیر
      </button>
      <button className="delete" onClick={() => handleRemove(tempItem.id)}>
        بلی
      </button>
    </div>
  );
};

export default Modal;
