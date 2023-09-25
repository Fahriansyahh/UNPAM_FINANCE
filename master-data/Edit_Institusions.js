import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { UpdateInstitution } from "../finance/Institusions";

const Edit_Institutions = () => {
  const history = useHistory();
  const [NameInstitusi, setNameInstitusi] = useState();
  const [CodeInstitusi, setCodeInstitusi] = useState();
  const [check, setCheck] = useState(false);
  const { institution_code, institution_name } = JSON.parse(
    sessionStorage.getItem("Institusion")
  );

  useEffect(() => {
    if (check) {
      history.push("/Institusions");
    }
  }, [check, history]);

  const handleSave = () => {
    console.log(institution_code);
    console.log(institution_name);

    const data = {
      institution_code: CodeInstitusi || institution_code,
      institution_name: NameInstitusi || institution_name,
    };
    UpdateInstitution(institution_code, data, setCheck);
  };
  const LockToken = sessionStorage.getItem("key");
  let token = LockToken ? LockToken.slice(0, 29) : false;

  if (token === "1hLJn7bKqW3mVfIg9XoZtUDpYcExr") {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="page-header mb-0 pb-0">
              <div className="page-title">
                <h4>INSTITUSI</h4>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active " aria-current="page">
                    Dashboard
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <button
                      onClick={() => history.push("/Institusions")}
                      style={{
                        color: "blue",
                        cursor: "default",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      Institusi
                    </button>
                  </li>
                  <li className="breadcrumb-item">Buat Institusi</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-10 col-lg-8 grid-margin">
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
                  Buat Baru
                  <i
                    className="mdi mdi-plus-box mx-2"
                    style={{ color: "#AF25F5" }}
                  ></i>
                </h4>
                <form className="form-sample">
                  <div className="row">
                    <div className="col-md-8">
                      <Form.Group className="row d-flex align-items-center">
                        <label className="col-sm-3 col-form-label ">
                          Nama Institusi
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            className="form-control-sm"
                            onChange={(a) => {
                              setNameInstitusi(a.target.value);
                            }}
                            defaultValue={NameInstitusi || institution_name}
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-8 " style={{ marginTop: "-55px" }}>
                      <Form.Group className="row d-flex align-items-center">
                        <label className="col-sm-3 col-form-label mt-4">
                          Kode Institusi
                        </label>
                        <div className="col-sm-9 mt-0 mt-sm-4">
                          <Form.Control
                            type="text"
                            className="form-control-sm"
                            onChange={(a) => {
                              setCodeInstitusi(a.target.value);
                            }}
                            defaultValue={CodeInstitusi || institution_code}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row mt-0 pb-0">
                    <div className="col-12 d-flex my-0 py-0">
                      <button
                        type="button"
                        className="btn btn-secondary  "
                        onClick={() => history.push("/Institusions")}
                      >
                        Kembali
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm  btn-success "
                        onClick={handleSave}
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

export default Edit_Institutions;
