import { useState } from "react";
import "../../../assets/style.css";

export const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [temp, setTemp] = useState(0);

  const handleRate = (index) => {
    setRating(index);
    setTemp(index);
  };
  return (
    <div className="d-flex">
      <div className="star-rating mx-3 border-0 ">
        {[...Array(5)].map((star, index) => {
          index += 1;

          return (
            <>
              <button
                type="button"
                key={index}
                id={star}
                className={
                  index <= ((rating && hover) || hover)
                    ? "on border-0  bg-white "
                    : "off border-0 bg-white"
                }
                onClick={() => handleRate(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star w-50  border-0">&#9733;</span>
              </button>
            </>
          );
        })}
      </div>
      <span className="mx-2"> امتیاز محصول: {temp} از 5 امتیاز </span>
    </div>
  );
};
