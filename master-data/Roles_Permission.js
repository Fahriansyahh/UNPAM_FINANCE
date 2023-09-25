import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FilterSearchTable, DeleteUser } from "../Components";
import { customStyles, paginationComponentOptions } from "../Action/datatable";
import { dataTabel, backupData } from "../Action/Api/datatable";

const Roles_Permission = () => {
  const dispatch = useDispatch();
  const { Permission } = useSelector((state) => state.Global);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  //! setTable

  //!setting storage
  useEffect(() => {
    const generateRandomKey = () => {
      const keySize = 256 / 8; // Panjang kunci dalam byte
      const randomKey = CryptoJS.lib.WordArray.random(keySize);
      const key = randomKey.toString(CryptoJS.enc.Hex);
      return key;
    };
    const key = generateRandomKey();
    dispatch({ type: "Permission", payload: key });
  }, [dispatch]);

  const handleStorage = (Obj) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(Obj),
      Permission
    ).toString();
    sessionStorage.setItem("Roles", encryptedData);
    history.push("/Edit_Permission");
  };

  const columns = [
    {
      name: "Nama Peran",
      selector: (row) => row.name,
    },
    {
      name: "Diperbarui",
      selector: (row) => {
        const updatedAt = new Date(row.updated_at);
        const formattedDate = updatedAt.toLocaleString("en-GB", {
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
          <li className="d-inline-block m-0 p-0 mx-2">
            <i
              data-toggle="tooltip"
              data-placement="top"
              title="edit Permission"
              className="mdi mdi-border-color"
              style={{ color: "blue" }}
              onClick={() => {
                handleStorage({ id: row.id, name: row.name });
              }}
            ></i>
          </li>
          <li
            className="d-inline-block m-0 p-0 m-1 "
            data-toggle="tooltip"
            data-placement="top"
            title="hapus Permission"
          >
            <DeleteUser
              name={row.id}
              urlApi="api/roles"
              header="Facility_Types"
            />
          </li>
        </ul>
      ),
      right: true,
      maxWidth: "60px",
    },
  ];

  //!exit setTable
  //! pagination

  const fetchUsers = useCallback(
    async (page) => {
      setLoading(true);
      await dataTabel(
        "api/roles",
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
        "api/roles",
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
  //!exit pagination
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

  //!useeffect

  useEffect(() => {
    fetchUsers(1); //? fetch page 1 of users
  }, [fetchUsers]);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 m-0 p-0">
          <div className="page-header m-0 p-0 ">
            <div className="page-title">
              <h4> PERAN & IZIN </h4>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Peran & Izin
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>{" "}
      <div className="row mt-1 mt-md-1 mt-lg-0 ">
        <div
          className="col-lg-12 d-flex justify-content-end mb-2 "
          style={{ marginTop: "-7px" }}
        >
          <button
            type="button"
            className="  btn btn-success btn-icon-text m-0 px-1 py-2 "
            onClick={() => {
              history.push("/Create_Permission");
            }}
          >
            <i className="mdi mdi-bookmark-plus-outline"></i>
            Buat Baru
          </button>{" "}
        </div>
        <div className="col-lg-12 ">
          <div className="card">
            <div
              className="card-body m-0 pb-2 mx-0 px-0"
              style={{ height: "max-content", padding: "0px 30px", margin: 0 }}
            >
              <div
                className="table-responsive"
                style={{ maxHeight: "400px", overflow: "auto" }}
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

export default Roles_Permission;
