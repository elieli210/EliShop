import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
export const SignUp = () => {
  const [total, setTotal] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setTotal(JSON.parse(localStorage.getItem("total")));
  }, []);

  /***************Date Picker ********************/
  const [props, setProps] = useState({
    value: new Date().toLocaleDateString("fa-IR"),
    format: "YYYY-MM-DD",
    onChange: (date) => console.log(date.format()),
    calendar: persian,
    locale: persian_fa,
    calendarPosition: "bottom-right",
  });
  /*************** Yup Validation************** */
  const validate = Yup.object({
    username: Yup.string()
      .max(10, "نام حداکثر می تواند شامل ده کاراکتر باشد. ")
      .min(3, "نام حداقل باید شامل بیشتر از دو کاراکتر باشد.")
      .required("این قسمت نمی تواند خالی باشد"),
    lastname: Yup.string()
      .max(20, "نام خانوادگی حداکثر می تواند شامل 20 کاراکتر باشد.")
      .min(3, "نام خانوادگی حداقل باید شامل بیشتر از دو کاراکتر باشد.")
      .required("این قسمت نمی تواند خالی باشد"),
    address: Yup.string()
      .max(120, "آدرس حداکثر می تواند شامل 20 کاراکتر باشد.")
      .min(3, " آدرس حداقل باید شامل بیشتر از دو کاراکتر باشد.")
      .required("این قسمت نمی تواند خالی باشد"),
    phone: Yup.string()
      .max(12, "حداکثر ارقام 12 می باشد")
      .min(8, "حداقل باید شامل هشت رقم باشد.")
      .required("این قسمت نمی تواند خالی باشد"),
    expectAt: Yup.string().required("این قسمت نمی تواند خالی باشد"),
  });
  const handleSubmit = (values) => {
    localStorage.setItem("formInput", JSON.stringify(values, null, 2));
    navigate("//localhost:3005");
  };

  return (
    <Formik
      initialValues={{
        username: "",
        lastname: "",
        address: "",
        phone: "",
        expectAt: new Date().getTime(),
        prices: total,
        delivered: "false",
        createdAt: new Date().getTime(),
      }}
      validationSchema={validate}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <div dir="rtl" style={{ marginRight: "15px" }} className="mb-5">
          <h1 className="my-4 font-weight-bold .display-4">
            نهایی کردن سبد خرید
          </h1>
          <Form onSubmit={formik.handleSubmit}>
            <TextField
              label="نام:"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <TextField
              label="نام خانوادگی: "
              name="lastname"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastname}
            />
            <TextField
              label="آدرس:"
              name="address"
              type="text"
              placeholder="شهر...منطقه...خیابان...پلاک..."
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <TextField
              label="تلفن همراه:"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <label htmlFor="address">تاریخ تحویل</label>
              <div style={{ marginRight: "20px" }}>
                <DatePicker {...props} onPropsChange={setProps} />
              </div>
            </div>

            <button className="btn btn-dark mt-3" type="submit">
              پرداخت
            </button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">
              پاک کردن
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
