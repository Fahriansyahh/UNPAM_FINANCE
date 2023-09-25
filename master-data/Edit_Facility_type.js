import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import Select from "react-select";
import { UpdateApi } from "../Action/Api/Facility_type";
import { useEffect } from "react";
import { GetAllParent } from "../Action/Api/Facility_type";
const Edit_Facility_type = () => {
  const history = useHistory();
  const [name, setName] = useState();
  const [valueNameId, setValueNameId] = useState();
  const [error, setError] = useState([]);
  const [options, setOptions] = useState([]);

  const { id } = JSON.parse(sessionStorage.getItem("Facility")) || "";
  //!setting Options react select

  useEffect(() => {
    GetAllParent(setOptions);
  }, [setOptions]);

  //! handle save

  const handleSave = () => {
    const data = {
      facility_type_name: name,
      parent_id: valueNameId || null,
    };
    UpdateApi(id, data, setError, history);
  };

  //!exit
  const LockToken = sessionStorage.getItem("key");
  let token = LockToken ? LockToken.slice(0, 29) : false;
  if (token === "1hLJn7bKqW3mVfIg9XoZtUDpYcExr") {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="page-header mb-0 pb-0">
              <div className="page-title">
                <h4>TIPE FASILITAS</h4>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
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
                  <li className="breadcrumb-item active" aria-current="page">
                    <button
                      onClick={() => history.push("/Facility_type")}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      Tipe Fasilitas
                    </button>
                  </li>
                  <li className="breadcrumb-item">Ubah</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-lg-9 grid-margin">
            <div className="card">
              <div
                className="card-body"
                style={{
                  height: "max-content",
                  padding: "10px 20px",
                  margin: 0,
                }}
              >
                <h4
                  className="card-title  font-italic"
                  style={{ color: "#9C9FA6" }}
                >
                  Ubah Tipe Fasilitas
                  <i
                    className="mdi mdi-plus-box mx-2"
                    style={{ color: "#AF25F5" }}
                  ></i>
                </h4>
                <form className="form-sample">
                  <div className="row">
                    <div className="col-md-5">
                      <Form.Group className="row">
                        <label
                          className="col-sm-4 col-form-label d-flex"
                          htmlFor="parent_id"
                        >
                          Lokasi
                        </label>
                        <Select
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: error.parent_id
                                ? "#dc3545"
                                : "hsl(0,0%,80%)",
                            }),
                          }}
                          options={options}
                          className={`col-sm-8 ${
                            error.parent_id && "is-invalid"
                          }`}
                          onChange={(a) => {
                            setValueNameId(a.value);
                          }}
                          placeholder="Pilihan"
                          id="parent_id"
                        />
                        {error.parent_id && (
                          <div className="invalid-feedback mt-2">
                            {error.parent_id[0]}
                          </div>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-md-7">
                      <Form.Group className="row mx-sm-2">
                        <label
                          className="col-sm-3 col-form-label"
                          htmlFor="facility_type_name"
                        >
                          Nama Fasilitas
                        </label>
                        <Form.Control
                          size="sm"
                          className={`col-sm-9 mx-3 mx-sm-0 ${
                            error.facility_type_name && "is-invalid"
                          }`}
                          type="text"
                          onChange={(a) => {
                            setName(a.target.value);
                          }}
                          id="facility_type_name"
                        />
                        {error.facility_type_name && (
                          <div className="invalid-feedback mt-2">
                            {error.facility_type_name[0]}
                          </div>
                        )}
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row mt-0 pb-0">
                    <div className="col-12 d-flex my-0 py-0">
                      <button
                        type="button"
                        className="btn btn-secondary  "
                        onClick={() => history.push("/Facility_type")}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        className="btn btn-success "
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
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

export default Edit_Facility_type;
