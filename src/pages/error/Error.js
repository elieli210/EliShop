import React from "react";
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();

  return (
    <div dir="rtl">
      <h3>متاسفیم، ولی چنین چیزی در سایت ما وجود ندارد!</h3>
      <button
        type="button"
        className="btn btn-link"
        onClick={() => navigate("/")}
      >
        بازگشت به سایت
      </button>
    </div>
  );
};
