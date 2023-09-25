import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory, Redirect } from "react-router-dom";
import { CreateUser } from "../Action/Api/user";
import Select from "react-select";
import { getSelectInstitution } from "../finance/Institusions";

const Register = () => {
  const history = useHistory();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setConfirmPassword] = useState();
  const [role, setRole] = useState();
  const [error, setError] = useState([]);
  const [OptionsInstitution, setOptionsInstitution] = useState([]);
  const [institutionId, setInstitutionId] = useState();
  const optionPeran = [
    { value: "Pilihan", label: "Pilihan" },
    { value: "Admin", label: "Admin" },
    { value: "Auditor", label: "Auditor" },
    { value: "Pelapor", label: "Pelapor" },
  ];
  useEffect(() => {
    getSelectInstitution(setOptionsInstitution);
  }, [setOptionsInstitution]);
  const handleSave = () => {
    const data = {
      institution_id: institutionId,
      name,
      username,
      email,
      password,
      password_confirmation,
      role,
    };
    CreateUser(data, history, setError);
  };
  console.log(error);
  const LockToken = sessionStorage.getItem("key");
  let token = LockToken ? LockToken.slice(0, 29) : "";
  if (token === "1hLJn7bKqW3mVfIg9XoZtUDpYcExr") {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="page-header mb-0 pb-0">
              <div className="page-title">
                <h4> PENGGUNA </h4>
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
                      onClick={() => history.push("/user")}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      Pengguna
                    </button>
                  </li>
                  <li className="breadcrumb-item">Buat</li>
                </ol>
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
                  color: "#9C9FA6",
                }}
              >
                <h4
                  className="card-title  font-italic"
                  style={{ color: "#9C9FA6" }}
                >
                  Buat Pengguna
                  <i
                    className="mdi mdi-plus-circle-outline mx-2"
                    style={{ color: "#AF25F5" }}
                  ></i>
                </h4>
                <form className="form-sample">
                  <div className="row">
                    <div className="col-sm-7">
                      <div className="row">
                        <div className="col-12">
                          <Form.Group className="row">
                            <label
                              className="col-sm-3 col-form-label"
                              htmlFor="name"
                            >
                              Nama
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                type="text"
                                onChange={(a) => {
                                  setName(a.target.value);
                                }}
                                className={
                                  "form-control-sm" +
                                  (error.name ? " is-invalid" : "")
                                }
                                id="name"
                              />
                              {error.name && (
                                <div className="invalid-feedback mt-2">
                                  {error.name[0]}
                                </div>
                              )}
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-12">
                          <Form.Group className="row">
                            <label
                              className="col-sm-3 col-form-label"
                              htmlFor="username"
                            >
                              Nama Pengguna
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                type="text"
                                onChange={(a) => {
                                  setUsername(a.target.value);
                                }}
                                className={`form-control-sm ${
                                  error.username && "is-invalid"
                                }
                                  `}
                                id="username"
                              />
                              {error.username && (
                                <div className="invalid-feedback mt-2">
                                  {error.username[0]}
                                </div>
                              )}
                            </div>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <Form.Group className="row">
                            <label
                              className="col-sm-3 col-form-label"
                              htmlFor="password"
                            >
                              Kata Sandi
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                type="password"
                                onChange={(a) => {
                                  setPassword(a.target.value);
                                }}
                                className={
                                  "form-control-sm" +
                                  (error.password ? " is-invalid" : "")
                                }
                                id="password"
                              />
                              {error.password && (
                                <div className="invalid-feedback mt-2">
                                  {error.password[0]}
                                </div>
                              )}
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-12">
                          <Form.Group className="row">
                            <label
                              className="col-sm-3 col-form-label"
                              htmlFor="password_confirmation"
                            >
                              Konfirmasi Kata Sandi
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                className={"form-control-sm"}
                                type="password"
                                onChange={(a) => {
                                  setConfirmPassword(a.target.value);
                                }}
                                id="password_confirmation"
                              />
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-5">
                      <div className="row">
                        <div className="col-12">
                          <Form.Group className="row">
                            <label
                              className="col-sm-3 col-form-label"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                type="email"
                                onChange={(a) => {
                                  setEmail(a.target.value);
                                }}
                                className={
                                  "form-control-sm" +
                                  (error.email ? " is-invalid" : "")
                                }
                                id="email"
                              />
                              {error.email && (
                                <div className="invalid-feedback mt-2">
                                  {error.email[0]}
                                </div>
                              )}
                            </div>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <Form.Group className="row mt-0 mb-4 py-0">
                            <label
                              className="col-sm-3 col-form-label"
                              htmlFor="role"
                            >
                              Peran
                            </label>
                            <div className="col-sm-9">
                              <Select
                                options={optionPeran}
                                id="role"
                                onChange={(a) => {
                                  if (a.value !== null) {
                                    setRole(a.label);
                                  }
                                }}
                                className={error.role && "is-invalid"}
                                styles={{
                                  control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: error.role
                                      ? "#dc3545"
                                      : "hsl(0,0%,80%)",
                                  }),
                                }}
                              />
                              {error.role && (
                                <div className="invalid-feedback mt-2">
                                  {error.role[0]}
                                </div>
                              )}
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-12">
                          <Form.Group className="row my-0 py-0">
                            <label
                              className="col-sm-3 col-form-label"
                              htmlFor="role"
                            >
                              Institusi
                            </label>
                            <div className="col-sm-9">
                              <Select
                                options={OptionsInstitution}
                                id="Institusi"
                                onChange={(a) => {
                                  if (a.value !== null) {
                                    setInstitutionId(a.value);
                                  }
                                }}
                                className={error.institution_id && "is-invalid"}
                                styles={{
                                  control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: error.institution_id
                                      ? "#dc3545"
                                      : "hsl(0,0%,80%)",
                                  }),
                                }}
                              />
                              {error.institution_id && (
                                <div className="invalid-feedback mt-2">
                                  {error.institution_id[0]}
                                </div>
                              )}
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-0 pb-0">
                    <div className="col-12 d-flex my-0 py-0">
                      <button
                        type="button"
                        className="btn btn-secondary  "
                        onClick={() => history.push("/user")}
                      >
                        Kembali
                      </button>
                      <button
                        type="button"
                        className="btn btn-success "
                        onClick={() => {
                          handleSave();
                        }}
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

export default Register;
