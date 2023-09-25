import React from "react";
import { DeleteUser } from "../Components";

//! setting styles custom styles

export const customStyles = {
  rows: {
    style: {
      minHeight: "30px",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#26A8E5",
      height: "40px",
      color: "white",
      fontSize: "14px",
    },
  },
  subHeader: {
    style: {
      marginTop: "-15px",
      padding: "0",
      backgroundColor: "#f2edf3",
      color: "white",
    },
  },
};
//!

//!All Pagination

export const paginationComponentOptions = {
  rowsPerPageText: "Pages ke",
  selectAllRowsItem: true,
  selectAllRowsItemText: `All`,
};

//! all pagination exit
//! colums asset

export const columnsAsset = (history) => {
  const columns = [
    {
      name: "Nama Asset",
      selector: (row) => {
        return (
          <div>
            <i
              className="mdi mdi-marker-check mr-2"
              style={{ color: "#AF25F5" }}
            ></i>
            {row.asset_name}
          </div>
        );
      },
    },
    {
      name: "Kuantitas",
      selector: (row) => <div>{row.quantity}</div>,
      maxWidth: "max-content",
      center: true,
    },
    {
      name: "Harga Asset",
      selector: (row) => <div>{row.asset_price}</div>,
      center: true,
    },
    {
      name: "Sumber Asset",
      selector: (row) => <div>{row.funding_source}</div>,
    },
    {
      name: "Tanggal Input",
      selector: (row) => {
        const CreatedAtTransaction = new Date(row.transaction_date);
        const Transaction = CreatedAtTransaction.toLocaleString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
        return <div>{Transaction}</div>;
      },
      right: true,
    },

    {
      name: "Aksi",
      selector: (row) => (
        <ul className="d-inline-block m-0 p-0" style={{ listStyle: "none" }}>
          <li className="d-inline-block m-0 p-0">
            <i
              className="mdi mdi-eye"
              data-toggle="tooltip"
              data-placement="top"
              title="lihat asset"
              style={{ color: "green" }}
              onClick={() => {
                sessionStorage.setItem("idAsset", JSON.stringify(row.id));
                history.push("/finance/ItemAsset");
              }}
            ></i>
          </li>
          <li className="d-inline-block m-0 p-0 mx-2">
            <i
              data-toggle="tooltip"
              data-placement="top"
              title="edit asset"
              className="mdi mdi-border-color"
              style={{ color: "blue" }}
              onClick={() => {
                sessionStorage.setItem("idAsset", JSON.stringify(row.id));
                history.push("/finance/EditAsset");
              }}
            ></i>
          </li>
          <li
            className="d-inline-block m-0 p-0"
            data-toggle="tooltip"
            data-placement="top"
            title="hapus asset"
          >
            <DeleteUser
              name={row.id}
              urlApi={"api/assets"}
              header="Facility_Type"
            />
          </li>
        </ul>
      ),
      center: true,
      maxWidth: "40px",
      style: {
        display: "flex",
        alignItems: "flex-start",
        marginTop: "5px",
      },
    },
  ];
  return columns;
};

//!exit
