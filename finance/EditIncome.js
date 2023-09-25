import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { getParent } from "../Action/Api/Cashflow";
import { UpdateIncome, GetItemIncome } from "../Action/Api/Income";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import { DeleteImages } from "../Components";
import {
  handleAmountChange,
  formatToRupiah,
} from "../Components/ThousandSeperator/ThousandSeperator";
const EditIncome = () => {
  const history = useHistory();
  const [CashflowName, setCashflowName] = useState();
  const [Amount, setAmount] = useState();
  const [Description, setDescription] = useState();
  const [Cashflow, setCashflow] = useState();
  const [transaction_date, setTransactionDate] = useState();
  const [images, setImages] = useState([]);
  const [dataCashflow, setDataCashflow] = useState([]);
  const [descriptionImage, setDescriptionImage] = useState([]);
  const [error, setError] = useState([]);
  const [OldData, setOldData] = useState();
  const [imagesOld, setImagesOld] = useState();
  const [DescriptionOld, setDescriptionOld] = useState();
  const [newImages, setNewImages] = useState([]);
  const [newDescription, setNewDescriptions] = useState([]);
  const [CashflowValue, setCashflowValue] = useState();
  //!handle Api
  useEffect(() => {
    getParent(setDataCashflow, "pendapatan");

    GetItemIncome(setOldData);
  }, [setDataCashflow, setOldData]);
  console.log(CashflowName);
  useEffect(() => {
    if (OldData && Array.isArray(OldData.cashflow_proofs)) {
      const newImages = OldData.cashflow_proofs.map((dataImages) => {
        return {
          proof_image: dataImages.proof_image,
        };
      });
      const newDescriptions = OldData.cashflow_proofs.map(
        (dataImagesDescriptions) => {
          return {
            proof_description: dataImagesDescriptions.proof_description,
            uuid: dataImagesDescriptions.uuid,
          };
        }
      );
      setDescriptionOld(newDescriptions);
      setImagesOld(newImages);
    }
  }, [OldData, setImagesOld, setDescriptionOld]);
  //! handle Image
  const handleImages = (files) => {
    const selectedFiles = files;
    const updatedImages = Array.from(selectedFiles).map((file, index) => ({
      file: file,
      index: index,
    }));
    setImages(updatedImages);
  };

  //! handle data kompleks Images
  useEffect(() => {
    if (imagesOld) {
      let dataImages = [];
      imagesOld.forEach((OldDataImages) => {
        dataImages.push(OldDataImages);
      });
      images.forEach((newImage) => {
        dataImages.push(newImage);
      });
      console.log(dataImages);
      setNewImages(dataImages);
    }

    if (DescriptionOld) {
      let dataDescriptions = [];
      DescriptionOld.forEach((oldDesc) =>
        dataDescriptions.push({
          proof_description: oldDesc.proof_description,
          uuid: oldDesc.uuid,
        })
      );
      descriptionImage.forEach((newDesc, index) => {
        console.log(newDesc);
        if (!dataDescriptions[index]) {
          dataDescriptions.push({ proof_description: newDesc, uuid: uuidv4() });
        }
      });

      setNewDescriptions(dataDescriptions);
    }
  }, [
    imagesOld,
    images,
    DescriptionOld,
    descriptionImage,
    setNewImages,
    setNewDescriptions,
  ]);

  //!handle date
  const dateString = OldData ? OldData.transaction_date : false;
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;

  const handleSave = () => {
    if (OldData) {
      const data = new FormData();
      data.append("_method", "PUT");
      data.append(
        "cashflow_category_id",
        Cashflow || OldData.cashflow_category.id
      );
      data.append("cashflow_name", CashflowName || OldData.cashflow_name);
      data.append("transaction_date", transaction_date || date);
      data.append("amount", Amount || OldData.amount);
      data.append("description", Description || OldData.description);
      newImages.forEach((image, index) => {
        data.append(
          `cashflow_proofs[${index}][uuid]`,
          `${newDescription[index]?.uuid || uuidv4()}`
        );
        data.append(
          `cashflow_proofs[${index}][proof_image]`,
          image && image.proof_image ? image.proof_image : image.file
        );
        data.append(
          `cashflow_proofs[${index}][proof_description]`,
          `${newDescription[index]?.proof_description || null}`
        );
      });
      for (var pair of data.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      UpdateIncome(data, history, setError);
    }
  };
  console.log(newImages);
  console.log(newDescription);

  const LockToken = sessionStorage.getItem("key");
  let token = LockToken ? LockToken.slice(0, 29) : false;

  if (token === "1hLJn7bKqW3mVfIg9XoZtUDpYcExr") {
    if (OldData) {
      return (
        <div>
          <div className="row">
            <div className="col-lg-12">
              <div className="page-header mb-0 pb-0">
                <div className="page-title">
                  <h4>PENDAPATAN</h4>
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
                        onClick={() => history.push("/finance/Income")}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        Pendapatan
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
                    Buat Pendapatan
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
                            Nama Pendapatan
                          </label>
                          <div className="col-sm-9">
                            <Form.Control
                              size="sm"
                              type="text"
                              defaultValue={
                                CashflowName || OldData.cashflow_name
                              }
                              onChange={(a) => {
                                setCashflowName(a.target.value);
                              }}
                            />
                          </div>
                        </Form.Group>
                        <Form.Group className="row  mb-0 py-0">
                          <label className="col-sm-3 col-form-label ">
                            Jumlah
                          </label>
                          <div className="col-sm-9">
                            <Form.Control
                              size="sm"
                              type="text"
                              id="Amount"
                              value={formatToRupiah(Amount || OldData.amount)}
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
                            Kategori Pendapatan
                          </label>
                          <div className="col-sm-9">
                            <Select
                              value={
                                Cashflow
                                  ? {
                                      label: CashflowValue,
                                      value: Cashflow,
                                    }
                                  : {
                                      label:
                                        OldData.cashflow_category
                                          .cashflow_category_name,
                                      value: OldData.cashflow_category.id,
                                    }
                              }
                              options={dataCashflow}
                              onChange={(a) => {
                                if (a.value !== null) {
                                  setCashflowValue(a.label);
                                  setCashflow(a.value);
                                } else {
                                  setCashflow();
                                }
                              }}
                            />
                          </div>
                        </Form.Group>

                        <Form.Group className="row my-0 py-0">
                          <label className="col-sm-3 col-form-label">
                            Tanggal Transaksi
                          </label>
                          <div className="col-sm-9">
                            <Form.Control
                              size="sm"
                              type="date"
                              id="transaction_date"
                              defaultValue={date || OldData.transaction_date}
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
                      </div>
                      <div className="col-sm-12">
                        <Form.Group className="row mt-0 pt-0">
                          <label htmlFor="exampleTextarea1 col-sm-12 col-form-label ">
                            <span style={{ marginLeft: "20px" }}>
                              Deskripsi
                            </span>
                          </label>
                          <textarea
                            className=" mx-4 mx-lg-5 form-control col-sm-10 "
                            id="exampleTextarea1"
                            rows="4"
                            defaultValue={
                              Description || OldData.description
                                ? OldData.description
                                : "tidak ada"
                            }
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
                                {newImages
                                  ? newImages.map((image, index) => {
                                      let imageUrlNew;
                                      if (image && image.file) {
                                        imageUrlNew = URL.createObjectURL(
                                          image.file
                                        );
                                      } else {
                                        imageUrlNew =
                                          process.env.REACT_APP_URL_API +
                                          "/storage/" +
                                          image.proof_image;
                                      }
                                      console.log(imageUrlNew);
                                      return (
                                        <div
                                          className="col-sm-6 col-lg-4 "
                                          key={index}
                                        >
                                          <div className="mx-1 d-flex flex-nowrap my-1 mx-1">
                                            <div className="mr-2">
                                              <img
                                                src={imageUrlNew}
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
                                                setDescriptionImage(
                                                  (prevState) => {
                                                    let OldData = [
                                                      ...prevState,
                                                    ];
                                                    OldData[index] =
                                                      event.target.value;
                                                    return OldData;
                                                  }
                                                );
                                              }}
                                              defaultValue={
                                                newDescription[index] &&
                                                newDescription[index]
                                                  .proof_description
                                                  ? newDescription[index]
                                                      .proof_description
                                                  : ""
                                              }
                                              disabled={
                                                DescriptionOld[index]
                                                  ? true
                                                  : false
                                              }
                                            />

                                            {imagesOld[index] &&
                                              newImages[index] && (
                                                <DeleteImages
                                                  index={index}
                                                  images={newImages}
                                                  uuid={newDescription}
                                                />
                                              )}
                                          </div>
                                        </div>
                                      );
                                    })
                                  : false}
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
                          onClick={() => history.push("/finance/Income")}
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
      return <div>Loading ...</div>;
    }
  } else {
    return <Redirect to="/login" />;
  }
};

export default EditIncome;
