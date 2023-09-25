import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory, Redirect } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Select from "react-select";
import { UpdateUser } from "../Action/Api/user";
import { getSelectInstitution } from "../finance/Institusions";
const Edit_User = () => {
  const history = useHistory();

  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [current_password, SetCurrentPassword] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setConfirmPassword] = useState();
  const [role, setRole] = useState();
  const [OptionsInstitution, setOptionsInstitution] = useState([]);
  const [error, setError] = useState();
  const [errorsNewPasword, setErrorNewPassword] = useState();
  const [institutionId, setInstitutionId] = useState();

  const editUser = JSON.parse(sessionStorage.getItem("editUser"));

  const optionPeran = [
    { value: undefined, label: "Pilihan" },
    { value: "Admin", label: "Admin" },
    { value: "Auditor", label: "Auditor" },
    { value: "Pelapor", label: "Pelapor" },
  ];
  useEffect(() => {
    getSelectInstitution(setOptionsInstitution);
  }, [setOptionsInstitution]);
  const handleSave = () => {
    if (role) {
      const data = new FormData();
      data.append("institution_id", institutionId ? institutionId : false);
      data.append("name", name ? name : editUser.name);
      data.append("username", username ? username : editUser.username);
      data.append("email", email ? email : editUser.email);
      if (password || current_password || password_confirmation) {
        data.append("password", password);
        data.append("current_password", current_password);
        data.append("password_confirmation", password_confirmation);
      }
      data.append("role", role ? role : false);
      UpdateUser(data, editUser, history, setError, setErrorNewPassword);
    }
  };
  const LockToken = sessionStorage.getItem("key");
  let token = LockToken ? LockToken.slice(0, 29) : "";
  if (token === "1hLJn7bKqW3mVfIg9XoZtUDpYcExr") {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="page-header mb-0 pb-0">
              <div className="page-title">
                <h4> Pengguna </h4>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    <button
                      onClick={() => history.push("/Dashboard")}
                      style={{
                        color: "blue",
                        cursor: "default",
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
                        cursor: "default",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      Pengguna
                    </button>
                  </li>
                  <li className="breadcrumb-item">Edit</li>
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
                  className="card-title  font-italic d-flex align-items-start"
                  style={{ color: "#9C9FA6" }}
                >
                  <p className="d-inline-block">Pembaruan Pengguna</p>
                  <i
                    className="mdi mdi-autorenew mx-2  "
                    style={{ color: "#AF25F5", fontSize: "22px" }}
                  ></i>
                </h4>
                <form className="form-sample">
                  {error ? (
                    <Alert key={"danger"} variant={"danger"}>
                      {error.current_password
                        ? error.current_password.map((a) => {
                            return (
                              <p className="m-0 p-0" key={a}>
                                {" "}
                                {a}
                              </p>
                            );
                          })
                        : false}
                      {error.password
                        ? error.password.map((a) => {
                            return (
                              <p className="m-0 p-0" key={a}>
                                {" "}
                                {a}
                              </p>
                            );
                          })
                        : false}
                      {error.password_confirmation
                        ? error.password_confirmation.map((a) => {
                            return (
                              <p className="m-0 p-0" key={a}>
                                {" "}
                                {a}
                              </p>
                            );
                          })
                        : false}
                    </Alert>
                  ) : (
                    false
                  )}
                  {errorsNewPasword ? (
                    <Alert variant={"danger"}>{errorsNewPasword}</Alert>
                  ) : (
                    false
                  )}

                  <div className="row">
                    <div className="col-sm-7">
                      <div className="row">
                        <div className="col-12">
                          <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                              Nama
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                type="text"
                                className=" m-auto form-control-sm"
                                onChange={(a) => {
                                  setName(a.target.value);
                                }}
                                defaultValue={name || editUser.name}
                              />
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-12">
                          <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                              Nama Pengguna
                            </label>
                            <div className="col-sm-9 ">
                              <Form.Control
                                type="text"
                                className=" m-auto form-control-sm"
                                onChange={(a) => {
                                  setUsername(a.target.value);
                                }}
                                defaultValue={username || editUser.username}
                              />
                            </div>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <Form.Group className="row">
                            <label className="col-sm-3 col-form-label d-flex flex-wrap">
                              kata sandi saat ini
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                type="password"
                                className=" m-auto form-control-sm"
                                onChange={(a) => {
                                  SetCurrentPassword(a.target.value);
                                }}
                              />
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-12" style={{ marginTop: "-15px" }}>
                          <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                              Kata Sandi
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                type="password"
                                className="m-auto form-control-sm"
                                onChange={(a) => {
                                  setPassword(a.target.value);
                                }}
                              />
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-12 ">
                          <Form.Group className="row">
                            <label className="col-sm-3 col-form-label d-flex flex-wrap">
                              Konfirmasi Password
                            </label>
                            <div className="col-sm-9 ">
                              <Form.Control
                                type="password"
                                className="m-auto form-control-sm"
                                onChange={(a) => {
                                  setConfirmPassword(a.target.value);
                                }}
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
                            <label className="col-sm-3 col-form-label">
                              Email
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                type="text"
                                className=" m-auto form-control-sm"
                                onChange={(a) => {
                                  setEmail(a.target.value);
                                }}
                                defaultValue={email || editUser.email}
                              />
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
                            <div className="col-sm-9 ">
                              <Select
                                options={optionPeran}
                                onChange={(a) => {
                                  if (a.value !== undefined) {
                                    setRole(a.label);
                                  }
                                }}
                              />
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-12 mb-sm-0 mb-5 ">
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
                                onChange={(a) => {
                                  if (a.value !== null) {
                                    setInstitutionId(a.value);
                                  }
                                }}
                              />
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row"></div>
                  <div className="row mt-0 pb-0 mb-5 mb-sm-0">
                    <div className="col-12 d-flex flex-nowrap ">
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

export default Edit_User;
