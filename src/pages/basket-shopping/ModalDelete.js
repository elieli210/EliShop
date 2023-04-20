import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDelete({
  tempItem,
  setIsModalOpen,
  isModalOpen,
  setShowToast,
  handleCancel,
  total,
}) {
  
  const handleRemove = (elem) => {
    const carts = JSON.parse(localStorage.getItem("cartItems"));
    const filtered = carts.filter((item) => item.id !== elem.id);
    localStorage.setItem("cartItems", JSON.stringify(filtered));
    document.getElementById(`${elem.id}`).remove();
    const totalItems = document.getElementById("total");
    const updatedTotal = total - elem.price * elem.count;
    totalItems.innerText = `مجموع مبلغ ${updatedTotal.toString()} تومان `;
    setIsModalOpen(false);
    JSON.parse(localStorage.getItem("cartItems"));
    setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <Modal show={isModalOpen} onHide={handleCancel}>
      <Modal.Header closeButton dir={"ltr"}></Modal.Header>

      <Modal.Body dir={"rtl"}>
        <Button
          variant="danger"
          onClick={() => setIsModalOpen(false)}
        >{`آیا از پاک کردن ${tempItem.name} مطمئن هستید؟`}</Button>
      </Modal.Body>

      <Modal.Footer style={{ gap: "315px" }}>
        <Button
          variant="danger"
          onClick={(e) => {
            handleCancel(e);
          }}
        >
          انصراف
        </Button>
        <Button variant="secondary" onClick={() => handleRemove(tempItem)}>
          حذف
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDelete;
