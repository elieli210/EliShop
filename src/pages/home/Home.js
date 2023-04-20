import React from "react";
import { Cards } from "./cards/Cards";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

// import for swiper
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
export const Home = () => {
  return (
    <motion.div
      className="wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          display: "flex",
          height: "100%",
        }}
      >
        <Swiper
          style={{ width: "1000px", height: "100%" }}
          cssMode={false}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          <SwiperSlide style={{ width: "100%", height: "100%" }}>
            <img
              src={"./assets/1.jpg"}
              alt="1 عکس کالا"
              style={{ width: "100%", height: "100%" }}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: "100%", height: "100%" }}>
            <img
              src="./assets/2.jpg"
              alt="2 عکس کالا"
              style={{ width: "100%", height: "100%" }}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: "100%", height: "100%" }}>
            <img
              src="./assets/3.jpg"
              alt="3 عکس کالا"
              style={{ width: "100%", height: "100%" }}
            />
          </SwiperSlide>
          <SwiperSlide style={{ width: "100%", height: "100%" }}>
            <img
              src="./assets/4.jpg"
              alt="4 عکس کالا"
              style={{ width: "100%", height: "100%" }}
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <Cards />
    </motion.div>
  );
};
