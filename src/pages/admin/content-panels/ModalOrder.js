import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axiosInstance from "../../../api/http";
import { useState } from "react";

const URL = "http://localhost:300/orders";
function ModalOrder({
  tempItem,
  showModal,
  handleCancel,
  setShowToastOrder,
  currentPage,
  fetchProducts,
}) {
  const [loading, setLoading] = useState(false);

  const handleDeliver = async () => {
    setLoading(true);

    axiosInstance
      .patch(`${URL}/${tempItem.id}`, {
        delivered: "true",
        expectAt: new Date().getTime(),
      })
      .then((res) => {
        fetchProducts(currentPage);
        setLoading(false);

        console.log(res);
      })
      .catch((error) => {
        console.log(error?.message);
        setLoading(false);
      });
    setTimeout(() => {
      setShowToastOrder(true);
      setTimeout(() => setShowToastOrder(false), 3000);
    }, 1000);
    handleCancel();
  };
  return (
    <Modal show={showModal} onHide={handleCancel} dir={"rtl"}>
      <Modal.Header closeButton style={{ gap: "289px" }}>
        <Modal.Title>نمایش سفارش </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <>
          <p>
            نام مشتری: {tempItem.username} {tempItem.lastname}
          </p>
          <p>آدرس:{tempItem.address}</p>
          <p>تلفن:{tempItem.phone}</p>
          <p>
            زمان تحویل:
            {`${new Date(tempItem?.expectAt).toLocaleDateString("fa-IR")}`}
          </p>
          <p>
            زمان سفارش:
            {`${new Date(tempItem?.createdAt).toLocaleDateString("fa-IR")}`}
          </p>{" "}
        </>

        <Table>
          <thead>
            <tr className="bg-light">
              <th> کالا</th>
              <th> قیمت</th>
              <th>تعداد</th>
            </tr>
          </thead>
          {tempItem.products.map((elem) => {
            return (
              <thead key={elem.id}>
                <tr>
                  <td>{`${elem.name}`}</td>
                  <td>{`${elem.price}`}</td>
                  <td>{`${elem.count}`}</td>
                </tr>
              </thead>
            );
          })}
        </Table>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        {tempItem.delivered === "true" ? (
          <>
            <p>
              زمان تحویل:
              {`${new Date(tempItem?.expectAt).toLocaleDateString("fa-IR")}`}
            </p>
            <Button variant="danger" onClick={(e) => handleCancel(e)}>
              بستن
            </Button>
          </>
        ) : (
          <>
            <Button
              disabled={loading}
              variant="secondary"
              onClick={(e) => handleDeliver(e)}
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
                <>تحویل شد</>
              )}
            </Button>
            <Button variant="danger" onClick={(e) => handleCancel(e)}>
              بستن
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalOrder;
