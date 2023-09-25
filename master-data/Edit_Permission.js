import React from "react";
import CryptoJS from "crypto-js";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getApiId, updateApi } from "../Action/Api/Roles_permissions";
import { filterPermission, getAllActive } from "../Action/filtering";
const Create_Permission = () => {
  const { Permission } = useSelector((state) => state.Global);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [active, setActive] = useState();
  const [error, setError] = useState([]);

  const encryptedData = sessionStorage.getItem("Roles");
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, Permission);
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  const Roles = JSON.parse(decryptedData);

  useEffect(() => {
    getApiId(Roles.id, setActive, setData);
  }, [setData, Roles.id]);

  const handleSave = () => {
    //? get all active permissions
    const ActiveTrue = getAllActive(active);
    //?exit
    //? filtering update
    const permissions = filterPermission(ActiveTrue, selectedIds);
    console.log(permissions);
    //?exit
    // //!set Api
    const dataApi = {
      name: name || Roles.name,
      permissions: permissions,
    };
    updateApi(dataApi, history, setError, Roles.id);
    //! tutup
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
                <h4>PERAN & IZIN</h4>
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
                    Ubah
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
                  Ubah Peran
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
                          defaultValue={name || Roles.name}
                          onChange={(a) => {
                            setName(a.target.value);
                          }}
                          style={{
                            border: !error.name ? "1px solid #AF25F5" : "",
                          }}
                          placeholder="Edit role Name"
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
                                    <label className="form-check-label">
                                      <input
                                        className="checkbox form-check-input"
                                        type="checkbox"
                                        defaultChecked={e.active}
                                        onChange={(a) => {
                                          if (a.target.checked === e.active) {
                                            const newSelectedIds =
                                              selectedIds.filter(
                                                (selectedId) =>
                                                  selectedId.id !== e.id
                                              );
                                            setSelectedIds(newSelectedIds);
                                          } else {
                                            //! filterring id & checked
                                            setSelectedIds([
                                              ...selectedIds,
                                              {
                                                id: e.id,
                                                checked: a.target.checked,
                                              },
                                            ]);
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
