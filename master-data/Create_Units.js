import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { Created_Units } from "../Action/Api/units";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";

const Create_Units = () => {
  const toastRef = useRef(null);
  const history = useHistory();
  const [unitName, setUnitName] = useState();
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    const data = { unit_name: unitName };

    Created_Units(data, setError, setSuccess, setLoading, toast);
  };
  console.log(loading);
  if (loading) {
    toastRef.current = toast.loading("Loading ...");
  } else {
    toast.dismiss(toastRef.current);
  }

  if (success) {
    setTimeout(() => {
      history.push("/Units");
    }, 2000);
  }
  const LockToken = sessionStorage.getItem("key");
  let token = LockToken ? LockToken.slice(0, 29) : false;

  if (token === "1hLJn7bKqW3mVfIg9XoZtUDpYcExr") {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="page-header mb-0 pb-0">
              <div className="page-title">
                <h4>SATUAN</h4>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active " aria-current="page">
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
                      onClick={() => history.push("/Units")}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      Satuan
                    </button>
                  </li>
                  <li className="breadcrumb-item">Buat</li>
                </ol>
                <ToastContainer autoClose={1000} transition={Flip} />
              </nav>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 grid-margin">
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
                  Buat Satuan
                  <i
                    className="mdi mdi-plus-box mx-2"
                    style={{ color: "#AF25F5" }}
                  ></i>
                </h4>
                <form className="form-sample">
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label
                          className="col-sm-3 col-form-label "
                          htmlFor="unit_name"
                        >
                          Nama Satuan
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            size="sm"
                            type="text"
                            onChange={(a) => {
                              setUnitName(a.target.value);
                            }}
                            className={error.unit_name && "is-invalid"}
                            id="unit_name"
                          />
                          {error.unit_name && (
                            <div className="invalid-feedback mt-2">
                              {error.unit_name[0]}
                            </div>
                          )}
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row mt-0 pb-0">
                    <div className="col-12 d-flex my-0 py-0">
                      <button
                        type="button"
                        className={`btn btn-secondary  `}
                        onClick={() => history.push("/Units")}
                      >
                        Kembali
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm  btn-success "
                        onClick={handleSave}
                        disabled={success || loading}
                      >
                        Simpan
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

export default Create_Units;
