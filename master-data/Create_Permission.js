import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  GetAllPermisions,
  CreatePermission,
} from "../Action/Api/Roles_permissions";

const Create_Permission = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    GetAllPermisions(setData);
  }, [setData]);

  const handleSave = () => {
    const dataApi = {
      name,
      permissions: selectedIds,
    };
    CreatePermission(dataApi, setError, history);
  };
  const LockToken = sessionStorage.getItem("key");
  let token = LockToken ? LockToken.slice(0, 29) : "";
  if (token === "1hLJn7bKqW3mVfIg9XoZtUDpYcExr") {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 ">
            <div className="page-header m-0 p-0">
              <div className="page-title">
                <h4>PERAN & IZIN </h4>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    <button
                      onClick={() => history.push("/dashboard")}
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
                  <li className="breadcrumb-item">
                    <button
                      onClick={() => history.push("/Roles_Permission")}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      Peran & Izin
                    </button>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Buat
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>{" "}
        <div className="row  ">
          <div className="col-lg-12 ">
            <div className="card-body m-0 p-0">
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="  btn btn-info btn-icon-text m-0 mb-2 px-3 py-2 "
                  onClick={() => {
                    history.push("/Roles_Permission");
                  }}
                >
                  <i className="mdi mdi-bookmark-plus-outline"></i>
                  Kembali
                </button>{" "}
                <button
                  type="button"
                  className="  btn btn-success btn-icon-text m-0 mb-2 px-3 py-2 ml-2"
                  onClick={() => {
                    handleSave();
                  }}
                >
                  <i className="mdi mdi-bookmark-plus-outline"></i>
                  Simpan
                </button>{" "}
              </div>
              <div className="card">
                <h4
                  className="card-title  font-italic mx-4 mt-3"
                  style={{ color: "#9C9FA6" }}
                >
                  Buat Peran
                  <i
                    className="mdi mdi-plus-circle-outline mx-2"
                    style={{ color: "#AF25F5" }}
                  ></i>
                </h4>
                <div className="row">
                  <div className="col-12 mb-3 mb-sm-0 col-lg-8 col-sm-8 ">
                    <Form.Group className="row mx-2 mb-0 mt-2 ">
                      <label className="col-sm-3 col-form-label" htmlFor="name">
                        Nama
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          type="text"
                          onChange={(a) => {
                            setName(a.target.value);
                          }}
                          style={{
                            border: !error.name ? "1px solid #AF25F5" : "",
                          }}
                          placeholder="Create role Name"
                          className={error.name && "is-invalid"}
                          id="name"
                        />
                        {error.name && (
                          <div className="invalid-feedback mt-2">
                            {error.name[0]}
                          </div>
                        )}
                        {error.permissions && (
                          <div className="invalid-feedback mt-2">
                            {error.permissions[0]}
                          </div>
                        )}
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row px-2">
                  {data.map((a, i) => {
                    return (
                      <div key={i} className="col-sm-6 col-lg-4">
                        <div className="card ">
                          <div
                            className="card-body my-2 m-0 py-2 px-4"
                            style={{
                              border: "1px solid #AF25F5",
                              borderRadius: "4px",
                            }}
                          >
                            <h5
                              className="card-title display-6"
                              style={{
                                textTransform: "none",
                                color: "#9C9FA6",
                              }}
                            >
                              {a.name}
                            </h5>
                            <hr></hr>
                            {a.permissions.map((e) => {
                              return (
                                <div className="list-wrapper" key={e.id}>
                                  <div className="form-check">
                                    <label
                                      className="form-check-label"
                                      style={{
                                        color: selectedIds.includes(e.id)
                                          ? "black"
                                          : "#9C9FA6",
                                      }}
                                    >
                                      <input
                                        className="checkbox form-check-input"
                                        type="checkbox"
                                        onChange={(a) => {
                                          const checked = a.target.checked;
                                          const id = e.id;
                                          if (checked) {
                                            setSelectedIds([
                                              ...selectedIds,
                                              id,
                                            ]);
                                          } else {
                                            const newSelectedIds =
                                              selectedIds.filter(
                                                (selectedId) =>
                                                  selectedId !== id
                                              );
                                            setSelectedIds(newSelectedIds);
                                          }
                                        }}
                                      />{" "}
                                      {e.name}
                                      <i className="input-helper"></i>
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

export default Create_Permission;
