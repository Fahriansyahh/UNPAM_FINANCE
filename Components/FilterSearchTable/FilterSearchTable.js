import React, { useState } from "react";

const FilterSearchTable = ({ filterText, onFilter }) => {
  const [newFilterText, setNewFilterText] = useState("");

  const handleSave = () => {
    onFilter(newFilterText);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="mb-3 mb-sm-0">
      <div className="d-flex align-items-center justify-content-end h-50 p-0 m-0">
        <div
          className="input-group p-0 m-0 d-flex justify-content-end"
          style={{ height: "20px" }}
        >
          <input
            type="text"
            className="form-control my-auto"
            placeholder="Search..."
            value={newFilterText}
            onChange={(event) => {
              setNewFilterText(event.target.value);
            }}
            onKeyPress={handleKeyPress}
            style={{ height: "10px", border: "1px solid darkgrey" }}
          />
          <button
            type="button"
            className="btn btn-info btn-icon d-flex flex-nowrap mx-1 px-2"
            style={{ height: "30px", width: "max-content" }}
            onClick={handleSave}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 96 960 960"
              width="16px"
              className="my-auto"
            >
              <path
                d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z"
                fill="white"
              />
            </svg>
            <span
              style={{ fontSize: "10px", color: "whitesmoke" }}
              className="my-auto"
            >
              Cari
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSearchTable;
