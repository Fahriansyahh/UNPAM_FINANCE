import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { ChildrenCashflowApi, getParent } from "../Action/Api/Cashflow";
import { CreateExpenseApi } from "../Action/Api/Expense";
import {
  handleAmountChange,
  formatToRupiah,
} from "../Components/ThousandSeperator/ThousandSeperator";

import Select from "react-select";
const CreateExpense = () => {
  const history = useHistory();
  const [CashflowName, setCashflowName] = useState();
  const [Amount, setAmount] = useState();
  const [Description, setDescription] = useState();
  const [Cashflow, setCashflow] = useState();
  const [transaction_date, setTransactionDate] = useState();
  const [imageUrl, setImageUrl] = useState([]);
  const [images, setImages] = useState([]);
  const [dataCashflow, setDataCashflow] = useState([]);
  const [descriptionImage, setDescriptionImage] = useState([]);
  const [error, setError] = useState([]);
  const [dataChildren, setDataChildren] = useState([]);
  const [childCashflow, setChildCashflow] = useState();

  useEffect(() => {
    getParent(setDataCashflow, "pengeluaran");
    if (Cashflow) {
      ChildrenCashflowApi(setDataChildren, Cashflow);
    }
  }, [setDataCashflow, Cashflow]);

  const handleImages = (files) => {
    const selectedFiles = files;
    const updatedImages = Array.from(selectedFiles).map((file, index) => ({
      file: file,
      index: index,
    }));
    setImages(updatedImages);
    setImageUrl(files);
  };
  const handleSave = () => {
    const data = new FormData();
    data.append("cashflow_category_id", childCashflow);
    data.append("cashflow_name", CashflowName);
    data.append("transaction_date", transaction_date);
    data.append("amount", Amount);
    data.append("description", Description);
    images.forEach((image, index) => {
      data.append(`cashflow_proofs[${index}][proof_image]`, image.file);
      data.append(
        `cashflow_proofs[${index}][proof_description]`,
        `${descriptionImage[index] ? descriptionImage[index] : null}`
      );
    });
    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    CreateExpenseApi(data, history, setError);
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
                <h4>PENGELUARAN</h4>
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
                      onClick={() => history.push("/finance/Expense")}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      Pengeluaran
                    </button>
                  </li>
                  <li className="breadcrumb-item">Buat</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-8 col-sm-10 grid-margin">
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
                  Buat Pengeluaran
                  <i
                    className="mdi mdi-plus-box mx-2"
                    style={{ color: "#AF25F5" }}
                  ></i>
                </h4>
                <form className="form-sample">
                  <div className="row">
                    <div className="col-sm-7">
                      <Form.Group className="row mb-0 pb-0">
                        <label className="col-sm-3 col-form-label ">
                          Nama Pengeluaran
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            size="sm"
                            type="text"
                            onChange={(a) => {
                              setCashflowName(a.target.value);
                            }}
                          />
                        </div>
                      </Form.Group>
                      <Form.Group className="row mb-0 py-0">
                        <label className="col-sm-3 col-form-label ">
                          Jumlah
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            size="sm"
                            type="text"
                            id="Amount"
                            value={formatToRupiah(Amount)}
                            onChange={(e) => {
                              handleAmountChange(e, setAmount);
                            }}
                            className={error.amount && "is-invalid"}
                          />
                          {error.amount && (
                            <div className="invalid-feedback ">
                              {error.amount[0]}
                            </div>
                          )}
                        </div>
                      </Form.Group>
                      <Form.Group className="row mt-3 my-0 py-0">
                        <label className="col-sm-3 col-form-label">
                          Tanggal Transaksi
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            size="sm"
                            type="date"
                            id="transaction_date"
                            className={`${
                              error.transaction_date && "is-invalid"
                            }`}
                            onChange={(a) => {
                              setTransactionDate(a.target.value);
                            }}
                          />
                          {error.transaction_date && (
                            <div className="invalid-feedback">
                              {error.transaction_date[0]}
                            </div>
                          )}
                        </div>
                      </Form.Group>
                      <Form.Group className="row my-0 py-0">
                        <label className="col-sm-3 col-form-label">
                          Kategori Pengeluaran
                        </label>
                        <div className="col-sm-9">
                          <Select
                            options={dataCashflow}
                            onChange={(a) => {
                              if (a.value !== null) {
                                setCashflow(a.value);
                              } else {
                                setCashflow();
                              }
                            }}
                            placeholder="Pilihan"
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="row my-0 py-0">
                        <label
                          className="col-sm-3 col-form-label"
                          htmlFor="cashflow_category_id"
                        >
                          Item Arus Kas
                        </label>
                        <div className="col-sm-9 ">
                          <Select
                            options={dataChildren}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: error.cashflow_category_id
                                  ? "#dc3545"
                                  : "hsl(0,0%,80%)",
                              }),
                            }}
                            id="cashflow_category_id"
                            className={`mb-4 mb-sm-0 ${
                              error.cashflow_category_id && "is-invalid"
                            }`}
                            onChange={(a) => {
                              if (a.value !== null) {
                                setChildCashflow(a.value);
                              } else {
                                setChildCashflow();
                              }
                            }}
                            placeholder="Pilihan"
                            isDisabled={Cashflow ? false : true}
                          />
                          {error.cashflow_category_id && (
                            <div className="invalid-feedback  ">
                              {error.cashflow_category_id[0]}
                            </div>
                          )}
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-sm-12">
                      <Form.Group className="row mt-0 pt-0">
                        <label htmlFor="exampleTextarea1 col-sm-12 col-form-label ">
                          <span
                            style={{
                              marginLeft: "20px",
                            }}
                          >
                            Deskripsi
                          </span>
                        </label>
                        <textarea
                          className=" mx-4 mx-lg-5 form-control col-sm-10 "
                          id="exampleTextarea1"
                          rows="4"
                          onChange={(a) => {
                            setDescription(a.target.value);
                          }}
                        ></textarea>
                      </Form.Group>

                      <Form.Group className="row">
                        <label className="col-sm-12 col-form-label">
                          Bukti Gambar
                        </label>
                        <div className="col-sm-12">
                          <div className="d-flex flex-wrap">
                            <div className="row">
                              {Array.from(imageUrl).map((image, index) => (
                                <div className="col-sm-6 col-lg-4" key={index}>
                                  <div className="mx-1 d-flex flex-nowrap my-1 mx-1">
                                    <div className="mr-2">
                                      <img
                                        src={URL.createObjectURL(image)}
                                        alt={`gambar tidak ada`}
                                        width="50"
                                        className="mb-2"
                                      />
                                      <p
                                        style={{
                                          fontSize: "7px",
                                          maxWidth: "50px",
                                          overflow: "auto",
                                        }}
                                      >
                                        {image.name}
                                      </p>
                                    </div>
                                    <Form.Control
                                      type="text"
                                      size="sm"
                                      onChange={(event) => {
                                        event.persist();
                                        setDescriptionImage((prevState) => {
                                          let OldData = [...prevState];
                                          OldData[index] = event.target.value;
                                          return OldData;
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                              <div className="col-12">
                                <Form.Control
                                  style={{ border: "0px solid white" }}
                                  id="cashflow_proofs"
                                  className={`form-control col-sm-10  ${
                                    error.cashflow_proofs && "is-invalid"
                                  }`}
                                  type="file"
                                  name="photo"
                                  onChange={(event) => {
                                    handleImages(event.target.files);
                                  }}
                                  multiple
                                />
                                {error.cashflow_proofs && (
                                  <div className="invalid-feedback mt-2">
                                    {error.cashflow_proofs[0]}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row mt-0 pb-0">
                    <div className="col-12 d-flex my-0 py-0">
                      <button
                        type="button"
                        className="btn btn-secondary  "
                        onClick={() => history.push("/finance/Expense")}
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

export default CreateExpense;
