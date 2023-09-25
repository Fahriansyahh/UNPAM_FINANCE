import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DeleteUser, FilterSearchTable } from "../Components";
import { customStyles, paginationComponentOptions } from "../Action/datatable";
import { dataTabel, backupData } from "../Action/Api/datatable";

const Institusions = () => {
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

  const handleStorage = (code) => {
    sessionStorage.setItem("Institusion", JSON.stringify(code));
    history.push("/Edit_Institusions");
  };
  //!
  const columns = [
    {
      name: "Nama Institusi",
      selector: (row) => (
        <div>
          <i
            className="mdi mdi-marker-check mr-2"
            style={{ color: "#AF25F5" }}
          ></i>
          {row.institution_name}
        </div>
      ),
    },
    {
      name: "Kode Institusi",
      selector: (row) => (
        <div>
          <i
            className="mdi mdi-marker-check mr-2"
            style={{ color: "#AF25F5" }}
          ></i>
          {row.institution_code}
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
                handleStorage({
                  institution_code: row.institution_code,
                  institution_name: row.institution_name,
                });
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
              name={row.institution_code}
              urlApi="api/institutions"
              header="Institusi"
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
        "api/institutions",
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
        "api/institutions",
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
              <h4> INSTITUSI </h4>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb" style={{ marginRight: "-16px" }}>
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
                <li className="breadcrumb-item">Institusi</li>
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
              history.push("/Create_Institusions");
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

export default Institusions;
