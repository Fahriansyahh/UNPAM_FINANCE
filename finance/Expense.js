import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DeleteUser, FilterSearchTable } from "../Components";
import { customStyles, paginationComponentOptions } from "../Action/datatable";
import { dataTabel, backupData } from "../Action/Api/datatable";

const Expense = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  //!colums

  const columns = [
    {
      name: "Nama Pengeluaran",
      selector: (row) => {
        console.log(row);
        return <div>{row.cashflow_name}</div>;
      },
    },
    {
      name: "Kategori Pengeluaran",
      selector: (row) => (
        <div>{row.cashflow_category.cashflow_category_name}</div>
      ),
    },
    {
      name: "Jumlah",
      selector: (row) => {
        const numberFormat = new Intl.NumberFormat("id-ID");
        return <div>{numberFormat.format(row.amount)}</div>;
      },
      right: true,
    },
    {
      name: "Tanggal Transaksi",
      selector: (row) => {
        const CreatedAt = new Date(row.transaction_date);
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
              className="mdi mdi-eye"
              data-toggle="tooltip"
              data-placement="top"
              title="lihat asset"
              style={{ color: "green" }}
              onClick={() => {
                sessionStorage.setItem("Expense", JSON.stringify(row.id));
                history.push("/finance/ItemExpense");
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
                sessionStorage.setItem("Expense", JSON.stringify(row.id));
                history.push("/finance/EditExpense");
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
              urlApi={"api/spendings"}
              header="Pengeluaran"
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
        "api/spendings",
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
        "api/spendings",
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
              <h4> PENGELUARAN </h4>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb" style={{ marginRight: "-16px" }}>
                <li className="breadcrumb-item active" aria-current="page">
                  <button
                    onClick={() => history.push("/Dashboard")}
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="breadcrumb-item">Pengeluaran</li>
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
              history.push("/finance/CreateExpense");
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

export default Expense;
