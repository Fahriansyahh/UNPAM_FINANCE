import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DeleteUser, FilterSearchTable } from "../Components";
import { customStyles, paginationComponentOptions } from "../Action/datatable";
import { dataTabel, backupData } from "../Action/Api/datatable";

const Units = () => {
  const dispatch = useDispatch();
  const { UnitKey } = useSelector((state) => state.Global);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  //!colums
  //!setting storage
  useEffect(() => {
    const generateRandomKey = () => {
      const keySize = 256 / 8; // Panjang kunci dalam byte
      const randomKey = CryptoJS.lib.WordArray.random(keySize);
      const key = randomKey.toString(CryptoJS.enc.Hex);
      return key;
    };
    const key = generateRandomKey();
    dispatch({ type: "UnitKey", payload: key });
  }, [dispatch]);

  const handleStorage = (unit_name) => {
    const encryptedData = CryptoJS.AES.encrypt(
      unit_name.toString(),
      UnitKey
    ).toString();
    sessionStorage.setItem("Units", encryptedData);
    history.push("/Edit_Units");
  };
  //!
  const columns = [
    {
      name: "Satuan",
      selector: (row) => (
        <div>
          <i
            className="mdi mdi-marker-check mr-2"
            style={{ color: "#AF25F5" }}
          ></i>
          {row.unit_name}
        </div>
      ),
    },
    {
      name: "Terbuat",
      selector: (row) => {
        const CreatedAt = new Date(row.created_at);
        const formattedDate = CreatedAt.toLocaleString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
        return formattedDate;
      },
      right: true,
    },
    {
      name: "Aksi",
      selector: (row) => (
        <ul className="d-inline-block m-0 p-0" style={{ listStyle: "none" }}>
          <li className="d-inline-block m-0 p-0">
            <i
              className="mdi mdi-border-color "
              style={{ color: "blue" }}
              data-toggle="tooltip"
              data-placement="top"
              title="edit unit"
              onClick={() => {
                handleStorage(row.unit_name);
              }}
            ></i>
          </li>
          <li
            className="d-inline-block m-0 p-0 m-1"
            data-toggle="tooltip"
            data-placement="top"
            title="hapus unit"
          >
            <DeleteUser
              name={row.unit_name}
              urlApi="api/units"
              header="Units"
            />
          </li>
        </ul>
      ),
      right: true,
      maxWidth: "50px",
    },
  ];
  //! ecxit colums

  //! pagination

  const fetchUsers = useCallback(
    async (page) => {
      setLoading(true);
      await dataTabel(
        "api/units",
        filterText,
        page,
        perPage,
        setData,
        setTotalRows,
        setLoading,
        history
      );
    },
    [perPage, history, filterText]
  );
  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = useCallback(
    async (newPerPage, page) => {
      setLoading(true);
      await backupData(
        "api/units",
        filterText,
        page,
        newPerPage,
        setData,
        setPerPage,
        setLoading,
        history
      );
    },
    [setData, setPerPage, setLoading, history, filterText]
  );

  //! exit pagination
  // !filterring

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterSearchTable
        onFilter={setFilterText}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  //!!exit filterring

  //!set fetch users

  useEffect(() => {
    fetchUsers(1); //? fetch page 1 of users
  }, [fetchUsers]);

  //!
  return (
    <div>
      <div className="row ">
        <div className="col-lg-12 ">
          <div className="page-header mb-0 pb-0">
            <div className="page-title">
              <h4> SATUAN </h4>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb" style={{ marginRight: "-16px" }}>
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
                <li className="breadcrumb-item">Satuan</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>{" "}
      <div className="row ">
        <div
          className="col-lg-12 d-flex justify-content-end mb-2 "
          style={{ marginTop: "-7px" }}
        >
          <button
            type="button"
            className="  btn btn-success btn-icon-text m-0 px-1 py-2 "
            onClick={() => {
              history.push("/Create_Units");
            }}
          >
            <i className="mdi mdi-bookmark-plus-outline"></i>
            Buat Baru
          </button>{" "}
        </div>
        <div className="col-lg-12 grid-margin stretch-card mt-0">
          <div className="card">
            <div
              className="card-body mx-0 px-0"
              style={{ height: "max-content", padding: "0 30px", margin: 0 }}
            >
              <div
                className="table-responsive pb-2"
                style={{
                  maxHeight: "400px",
                  overflow: "auto",
                  padding: 0,
                  margin: 0,
                }}
              >
                <DataTable
                  columns={columns}
                  data={data}
                  paginationResetDefaultPage={resetPaginationToggle}
                  paginationComponentOptions={paginationComponentOptions}
                  highlightOnHover
                  pointerOnHover
                  subHeader
                  subHeaderComponent={subHeaderComponentMemo}
                  progressPending={loading}
                  pagination
                  paginationServer
                  paginationTotalRows={totalRows}
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                  customStyles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Units;
