import React from "react";
import { Toast } from "react-bootstrap";

const MyToast = (props) => {
  const toastCss = {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: "1",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  return (
    <div style={props.show ? toastCss : null}>
      <Toast
        className={`border text-white ${
          props.type === "success"
            ? "border-danger bg-danger"
            : "border-success bg-success"
        }`}
        show={props.show}
      >
        <Toast.Header
          className={`text-white ${
            props.type === "success" ? "bg-danger" : "bg-success"
          }`}
          closeButton={false}
        >
          <strong className="mr-auto">موفق</strong>
        </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default MyToast;
