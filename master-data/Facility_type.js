import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FilterSearchTable, DeleteUser } from "../Components";
import { customStyles, paginationComponentOptions } from "../Action/datatable";
import { dataTabel, backupData } from "../Action/Api/datatable";

const Facility_type = () => {
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
      name: "Tipe Fasilitas",
      selector: (row) => {
        return (
          <table className="my-2">
            <tbody>
              <tr style={{ border: "0px solid black" }}>
                <td>
                  {" "}
                  <strong>{row.facility_type_name}</strong>
                </td>
              </tr>
              {row.children.map((a, i) => {
                return (
                  <tr key={i} className="d-flex justify-content-between">
                    <td>{a.facility_type_name}</td>
                    <td>
                      <li className="d-inline-block m-0 p-0 mx-2">
                        <i
                          className="mdi mdi-border-color"
                          style={{ color: "blue" }}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="edit facility type"
                          onClick={() => {
                            sessionStorage.setItem(
                              "Facility",
                              JSON.stringify({
                                id: row.id,
                                facility_type_name: row.facility_type_name,
                              })
                            );
                            history.push("/Edit_Facility_type");
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
                          urlApi="api/facility-types"
                          header="Facility_Type"
                        />
                      </li>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      },
    },
    {
      name: "Aksi",
      selector: (row) => (
        <div>
          <ul className="d-inline-block m-0 p-0" style={{ listStyle: "none" }}>
            <li className="d-inline-block m-0 p-0 mx-2">
              <i
                className="mdi mdi-border-color"
                style={{ color: "blue" }}
                data-toggle="tooltip"
                data-placement="top"
                title="edit facility type"
                onClick={() => {
                  sessionStorage.setItem(
                    "Facility",
                    JSON.stringify({
                      id: row.id,
                      facility_type_name: row.facility_type_name,
                    })
                  );
                  history.push("/Edit_Facility_type");
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
                name={row.id}
                urlApi="api/facility-types"
                header="Facility_Type"
              />
            </li>
          </ul>
        </div>
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
        "api/facility-types",
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
        "api/facility-types",
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

  return (
    <div>
      <div className="row ">
        <div className="col-lg-12 ">
          <div className="page-header mb-0 pb-0">
            <div className="page-title">
              <h4> TIPE FASILITAS </h4>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb" style={{ marginRight: "-16px" }}>
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
                <li className="breadcrumb-item">Tipe Fasilitas</li>
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
              history.push("/Create_Facility_type");
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

export default Facility_type;
