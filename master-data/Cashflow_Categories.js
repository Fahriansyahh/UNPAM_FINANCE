import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DeleteUser, FilterSearchTable } from "../Components";
import { customStyles, paginationComponentOptions } from "../Action/datatable";
import { dataTabel, backupData } from "../Action/Api/datatable";

const Cashflow_Categories = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [elementWidth, setElementWidth] = useState();
  const [categories, setCategories] = useState();
  console.log(categories);
  //!set device
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 576) {
        setElementWidth("100%");
      } else {
        setElementWidth("50%");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setElementWidth]);

  const handleStorage = (row) => {
    sessionStorage.setItem("Cashflow", row.id);
    history.push("/Edit_Cashflow_Categories");
  };

  //!
  const columns = [
    {
      name: "Kategori Arus Kas",
      selector: (row) => {
        return (
          <table className="my-1">
            <tbody>
              <tr
                style={{ border: "0px solid black" }}
                className="d-flex flex-column"
              >
                <td>
                  {" "}
                  <strong>{row.cashflow_category_name}</strong>
                </td>
                <td className="ml-1">Persentase: {row.percentage || "0"}</td>
                <td className="ml-1">
                  Tipe Arus Kas: {row.cashflow_type.cashflow_type_name}
                </td>
                <td className="ml-1" style={{ fontWeight: "600" }}>
                  Item Arus Kas:
                </td>
              </tr>
              {row.children.length <= 0 ? (
                <tr>
                  <td>
                    <div className="ml-2">
                      <i
                        className="mr-1 mdi mdi-close-box"
                        style={{ color: "red" }}
                      ></i>
                      <span>Tidak ada</span>
                    </div>
                  </td>
                </tr>
              ) : (
                row.children.map((a, i) => {
                  return (
                    <tr key={i} className="d-flex justify-content-between ml-2">
                      <td>
                        {" "}
                        <i
                          className="mr-1 mdi mdi-checkbox-multiple-marked"
                          style={{ color: "blue" }}
                        ></i>{" "}
                        {a.cashflow_category_name}
                      </td>
                      <td>
                        <li className="d-inline-block m-0 p-0 mx-2">
                          <i
                            className="mdi mdi-border-color"
                            style={{ color: "blue" }}
                            data-toggle="tooltip"
                            data-placement="top"
                            title="edit unit"
                            onClick={() => {
                              handleStorage(a);
                            }}
                          ></i>
                        </li>
                        <li
                          className="d-inline-block m-0 p-0"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="hapus facility type"
                        >
                          <DeleteUser
                            name={a.id}
                            urlApi="api/cashflow-categories"
                            header="Item Arus Kas"
                          />
                        </li>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        );
      },
    },
    {
      name: "Aksi",
      selector: (row) => (
        <ul className="d-inline-block m-0 p-0" style={{ listStyle: "none" }}>
          <li className="d-inline-block m-0 p-0">
            <i
              className="mdi mdi-border-color"
              style={{ color: "blue" }}
              data-toggle="tooltip"
              data-placement="top"
              title="edit unit"
              onClick={() => {
                handleStorage(row);
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
              name={row.id}
              urlApi="api/cashflow-categories"
              header="cashflow-categories"
            />
          </li>
        </ul>
      ),
      right: true,
      maxWidth: "60px",
      style: {
        right: "0px",
        position: "absolute",
      },
    },
  ];
  //! ecxit colums

  //! pagination

  const fetchUsers = useCallback(
    async (page) => {
      setLoading(true);
      await dataTabel(
        "api/cashflow-categories",
        filterText,
        page,
        perPage,
        setData,
        setTotalRows,
        setLoading,
        history,
        "cashflow-type",
        categories
      );
    },
    [perPage, history, filterText, categories]
  );
  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = useCallback(
    async (newPerPage, page) => {
      setLoading(true);
      await backupData(
        "api/cashflow-categories",
        filterText,
        page,
        newPerPage,
        setData,
        setPerPage,
        setLoading,
        history,
        "cashflow-type",
        categories
      );
    },
    [setData, setPerPage, setLoading, history, filterText, categories]
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
      <div style={{ width: elementWidth, marginBottom: "-10px" }}>
        <div
          className="row d-flex justify-content-center m-0 p-0"
          style={{ marginBottom: "-20px" }}
        >
          <div className="col-6 ">
            <form className="form-sample">
              <Form.Group className="row m-0 p-0">
                <div className="col-sm-12 ">
                  <select
                    className="form-control"
                    style={{
                      height: "30px",
                      borderRadius: "2px",
                      border: "1px solid darkgrey",
                    }}
                    onChange={(a) => {
                      if (a.target.value === "pilihan") {
                        setCategories("");
                      } else {
                        setCategories(a.target.value);
                      }
                    }}
                  >
                    <option>pilihan</option>
                    <option>pendapatan</option>
                    <option>pengeluaran</option>
                  </select>
                </div>
              </Form.Group>
            </form>
          </div>
          <div className="col-6 m-0 p-0 ">
            <FilterSearchTable
              onFilter={setFilterText}
              onClear={handleClear}
              filterText={filterText}
            />
          </div>
        </div>
      </div>
    );
  }, [filterText, resetPaginationToggle, elementWidth]);
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
              <h4> KATEGORI ARUS KAS </h4>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb" style={{ marginRight: "-16px" }}>
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
                <li className="breadcrumb-item">Kategori Arus Kas</li>
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
              history.push("/Create_Cashflow_Categories");
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

export default Cashflow_Categories;
