import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FilterSearchTable } from "../Components";
import { customStyles, paginationComponentOptions } from "../Action/datatable";
import { columnsAsset } from "../Action/datatable";
import { dataTabel, backupData } from "../Action/Api/datatable";

const Asset = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const fetchUsers = useCallback(
    async (page) => {
      setLoading(true);
      await dataTabel(
        "api/assets",
        filterText,
        page,
        perPage,
        setData,
        setTotalRows,
        setLoading,
        history
      );
      // Handle error, e.g. display error message to user or perform other actions
      setLoading(false);
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
        "api/assets",
        filterText,
        page,
        newPerPage,
        setData,
        setPerPage,
        setLoading,
        history
      );
      // Handle error, e.g. display error message to user or perform other actions
    },
    [setData, setPerPage, setLoading, history, filterText]
  );

  //! exit pagination

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

  return (
    <div>
      <div className="row ">
        <div className="col-lg-12 ">
          <div className="page-header mb-0 pb-0">
            <div className="page-title">
              <h4> ASSET </h4>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb" style={{ marginRight: "-16px" }}>
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
                <li className="breadcrumb-item">Asset</li>
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
              history.push("/finance/CreateAsset");
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
                  columns={columnsAsset(history)}
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

export default Asset;
