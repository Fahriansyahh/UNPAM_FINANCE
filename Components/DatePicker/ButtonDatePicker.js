import React from "react";
import { useState } from "react";
import DatePicker from "./DatePicker";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
const ButtonDatePicker = () => {
  const [clickButton, setClickButton] = useState(false);
  console.log(clickButton);
  return (
    <div>
      <button
        type="button"
        className="d-flex align-content-center mt-2 mr-2 btn  btn-icon-text m-0 px-1 py-2  "
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          height: "30px",
          fontFamily: "arial",
          fontWeight: "100",
        }}
        onClick={() => {
          setClickButton(!clickButton);
        }}
      >
        <span>19 04 2003 -19 05 2022</span>
        <i className="mdi mdi-bookmark-plus-outline"></i>
      </button>{" "}
      {clickButton ? (
        <>
          <BodyCard />
        </>
      ) : (
        false
      )}
    </div>
  );
};

const BodyCard = () => {
  return (
    <div
      className="card w-75 w-sm-50 "
      style={{
        position: "absolute",
        right: "40px",
        zIndex: "30",
      }}
    >
      <div className="card-body">
        <DatePicker />
      </div>
    </div>
  );
};

export default ButtonDatePicker;
