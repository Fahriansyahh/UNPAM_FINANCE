import React, { useEffect, useState } from "react";

import { Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import Select from "react-select";
import {
  getCashflowId,
  updateCashflow,
  getParent,
} from "../Action/Api/Cashflow";
const Edit_Cashflow_Categories = () => {
  const history = useHistory();
  const [NameCategories, setNameCategories] = useState();
  const [typeCategories, setTypeCategories] = useState();
  const [percetage, setPercentage] = useState();
  const [Parent, setParent] = useState();
  const [optionsParent, setOptionsParent] = useState();
  const [error, setError] = useState([]);
  const [OldData, setOldData] = useState();
  //!set react select
  const optionsName = [
    { value: "1", label: "pendapatan" },
    { value: "2", label: "pengeluaran" },
  ];

  const handleSave = async () => {
    const data = {
      cashflow_type_id: typeCategories ? typeCategories.value : false,
      parent_id: Parent,
      cashflow_category_name: NameCategories || OldData.cashflow_category_name,
      percentage: percetage,
    };
    await updateCashflow(data, setError, history);
  };

  useEffect(() => {
    getCashflowId(setOldData);
    if (typeCategories) {
      getParent(setOptionsParent, typeCategories.label);
    }
  }, [setOptionsParent, setOldData, typeCategories]);
  const LockToken = sessionStorage.getItem("key");
  let token = LockToken ? LockToken.slice(0, 29) : false;
  console.log(typeCategories);
  if (token === "1hLJn7bKqW3mVfIg9XoZtUDpYcExr") {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="page-header mb-0 pb-0">
              <div className="page-title">
                <h4>KATEGORI ARUS KAS</h4>
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
                      onClick={() => history.push("/Cashflow_Categories")}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      Kategori Arus Kas
                    </button>
                  </li>
                  <li className="breadcrumb-item">Ubah</li>
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
                }}
              >
                <h4
                  className="card-title  font-italic"
                  style={{ color: "#9C9FA6" }}
                >
                  Ubah Kategori Arus Kas
                  <i
                    className="mdi mdi-plus-box mx-2"
                    style={{ color: "#AF25F5" }}
                  ></i>
                </h4>
                <form className="form-sample">
                  <div className="row">
                    <div className="col-sm-7">
                      <div className="row">
                        <div className="col-12">
                          <Form.Group className="row my-2 ">
                            <label
                              className="col-sm-3 col-form-label"
                              htmlFor="cashflow_category_name"
                            >
                              Nama Kategori
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                type="text"
                                size="sm"
                                className={
                                  error.cashflow_category_name && "is-invalid"
                                }
                                id="cashflow_category_name"
                                defaultValue={
                                  NameCategories || OldData
                                    ? OldData.cashflow_category_name
                                    : ""
                                }
                                onChange={(a) => {
                                  setNameCategories(a.target.value);
                                }}
                                placeholder="Buat Kategori Nama"
                              />
                              {error.cashflow_category_name && (
                                <div className="invalid-feedback mt-2">
                                  {error.cashflow_category_name[0]}
                                </div>
                              )}
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-12">
                          <Form.Group className="row ">
                            <label
                              className="col-sm-3 col-form-label "
                              htmlFor="percentage"
                            >
                              Persentase
                            </label>
                            <div className="col-sm-9 ">
                              <Form.Control
                                size="sm"
                                className={error.percentage && "is-invalid"}
                                id="percentage"
                                placeholder="Tidak ada"
                                type="number"
                                onChange={(a) => {
                                  setPercentage(a.target.value);
                                }}
                              />
                              {error.percentage && (
                                <div className="invalid-feedback mt-2">
                                  {error.percentage[0]}
                                </div>
                              )}
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-5 ">
                      <div className="row">
                        <div className="col-12">
                          <Form.Group className="row my-0 py-0">
                            <label
                              className="col-sm-3 col-form-label"
                              htmlFor="cashflow_type_id"
                            >
                              Tipe Kategori
                            </label>
                            <Select
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  borderColor: error.cashflow_type_id
                                    ? "#dc3545"
                                    : "hsl(0,0%,80%)",
                                }),
                              }}
                              id="cashflow_type_id"
                              options={optionsName}
                              className={`col-sm-9 mt-2 ${
                                error.cashflow_type_id && "is-invalid"
                              }`}
                              placeholder="Tidak Ada"
                              onChange={(a) => {
                                setTypeCategories(a);
                              }}
                            />
                            {error.cashflow_type_id && (
                              <div className="invalid-feedback mt-2">
                                {error.cashflow_type_id[0]}
                              </div>
                            )}
                          </Form.Group>
                        </div>
                        <div className="col-12 ">
                          <Form.Group className="row my-0 py-0 mb-3 mb-sm-0">
                            <label
                              className="col-sm-3 col-form-label "
                              htmlFor="parent_id"
                            >
                              Arus Kas
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
                              id="parent_id"
                              options={optionsParent}
                              className={`col-sm-9 ${
                                error.parent_id && "is-invalid"
                              }`}
                              placeholder="Tidak Ada"
                              onChange={(a) => {
                                setParent(a.value);
                              }}
                              isDisabled={typeCategories ? false : true}
                            />
                            {error.parent_id && (
                              <div className="invalid-feedback mt-2">
                                {error.parent_id[0]}
                              </div>
                            )}
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
                        onClick={() => history.push("/Cashflow_Categories")}
                      >
                        Kembali
                      </button>
                      <button
                        type="button"
                        className="btn btn-success "
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

export default Edit_Cashflow_Categories;
