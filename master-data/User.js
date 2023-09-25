import React, { useCallback, useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { DeleteUser, FilterSearchTable } from "../Components";
import DataTable from "react-data-table-component";
import { customStyles, paginationComponentOptions } from "../Action/datatable";
import { dataTabel, backupData } from "../Action/Api/datatable";
import { Form } from "react-bootstrap";
import { getSelectInstitution } from "../finance/Institusions";
const User = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filterText, setFilterText] = React.useState("");
  const [elementWidth, setElementWidth] = useState();
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [Institution, setInstitution] = useState([]);
  const [Institution_id, setInstitution_id] = useState();
  useEffect(() => {
    getSelectInstitution(setInstitution);
  }, [setInstitution]);
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

  //!colums

  const columns = [
    {
      name: "Nama",
      selector: (row) => (
        <div>
          <i className="mdi mdi-account mr-2" style={{ color: "#AF25F5" }}></i>
          {row.name}
        </div>
      ),
    },
    {
      name: "Nama Pengguna",
      selector: (row) => row.username,
    },
    {
      name: "Institusi",
      selector: (row) => row.institution.institution_name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },

    {
      name: "Aksi",
      selector: (row) => (
        <ul className="d-inline-block m-0 p-0" style={{ listStyle: "none" }}>
          <li className="d-inline-block m-0 p-0">
            <i
              className="mdi mdi-border-color"
              data-toggle="tooltip"
              data-placement="top"
              title="edit user"
              style={{ color: "blue" }}
              onClick={() => {
                sessionStorage.setItem(
                  "editUser",
                  JSON.stringify({
                    name: row.name,
                    username: row.username,
                    email: row.email,
                  })
                );
                history.push("/Edit_User");
              }}
            ></i>
          </li>
          <li
            className="d-inline-block m-0 p-0 m-1"
            data-toggle="tooltip"
            data-placement="top"
            title="hapus user"
          >
            <DeleteUser
              name={row.username}
              urlApi="api/users"
              header="acount"
            />
          </li>
        </ul>
      ),
      right: true,
    },
  ];

  //!exit colums

  //! pagination

  const fetchUsers = useCallback(
    async (page) => {
      setLoading(true);
      await dataTabel(
        "api/users",
        filterText,
        page,
        perPage,
        setData,
        setTotalRows,
        setLoading,
        history,
        "institution",
        Institution_id
      );
    },
    [perPage, history, filterText, Institution_id]
  );
  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = useCallback(
    async (newPerPage, page) => {
      setLoading(true);
      await backupData(
        "api/users",
        filterText,
        page,
        newPerPage,
        setData,
        setPerPage,
        setLoading,
        history,
        "institution",
        Institution_id
      );
    },
    [setData, setPerPage, setLoading, history, filterText, Institution_id]
  );

  //! exit pagination

  // !filterring

  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

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
                      if (a.target.value === "Pilihan") {
                        setInstitution_id("");
                      } else {
                        const selectedIndex = a.target.selectedIndex;
                        const selectedOption = a.target.options[selectedIndex];
                        const code = selectedOption.getAttribute("id");
                        setInstitution_id(code);
                      }
                    }}
                  >
                    {Institution.map((a, i) => {
                      console.log(a.code);
                      return (
                        <option key={a.value + i} id={a.code}>
                          {a.label}
                        </option>
                      );
                    })}
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
  }, [filterText, resetPaginationToggle, elementWidth, Institution]);
  //!!exit filterring

  //!set fetch users

  useEffect(() => {
    fetchUsers(1); //? fetch page 1 of users
  }, [fetchUsers]);

  //!
  console.log(Institution_id);

  const LockToken = sessionStorage.getItem("key");
  let token = LockToken ? LockToken.slice(0, 29) : false;
  if (token === "1hLJn7bKqW3mVfIg9XoZtUDpYcExr") {
    return (
      <div>
        <div className="row ">
          <div className="col-lg-12 ">
            <div className="page-header mb-0 pb-0">
              <div className="page-title ">
                <h4> PENGGUNA </h4>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ marginRight: "-16px" }}>
                  <li className="breadcrumb-item active" aria-current="page">
                    Dashboard
                  </li>
                  <li className="breadcrumb-item">Pengguna</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>{" "}
        <div className="row ">
          <div
            className="col-lg-12 d-flex justify-content-between justify-content-sm-end mb-2 "
            style={{ marginTop: "-7px" }}
          >
            <div className="card bg-gradient-info  text-white mr-2 d-flex align-items-center">
              <div className="card-body mx-2 p-2">
                <i className="mdi mdi-account-multiple d-inline-block mr-1"></i>
                <h6 className="m-auto d-inline-block">{totalRows}</h6>
              </div>
            </div>
            <button
              type="button"
              className="  btn btn-success btn-icon-text m-0 px-1 py-2 "
              onClick={() => {
                history.push("/register");
              }}
            >
              <i className="mdi mdi-bookmark-plus-outline"></i>
              Buat Baru
            </button>{" "}
          </div>
          <div className="col-lg-12 grid-margin stretch-card mt-0 ">
            <div className="card ">
              <div
                className="card-body mx-0 px-0"
                style={{ height: "max-content", padding: "0 30px", margin: 0 }}
              >
                <div className="table-responsive pb-2 m-0 p-0">
                  <DataTable
                    columns={columns}
                    data={filteredItems}
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
  } else {
    return <Redirect to="/login" />;
  }
};

export default User;
