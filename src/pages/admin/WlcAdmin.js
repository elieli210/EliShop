import React from "react";
import Typewriter from "typewriter-effect";

export const WlcAdmin = () => {
  return (
    <div
      dir="rtl"
      className="d-flex font-weight-bold text-left bg-pink align-items-center h3 mh-100"
    >
      <div>
        <img src="./assets/panel.JPG" alt="عکس پنل مدیریتی" className="" />
      </div>
      <div>
        <Typewriter
          onInit={(typewriter) => {
            typewriter

              .typeString(
                "شما وارد پنل مدیریتی سایت الی شاپ شده اید، با انتخاب تب های بالا وارد بخش مورد نظر شوید."
              )
              .pauseFor(1000)
              .deleteAll()
              .typeString("خوش آمدید...")
              .start();
          }}
        />
      </div>
    </div>
  );
};
