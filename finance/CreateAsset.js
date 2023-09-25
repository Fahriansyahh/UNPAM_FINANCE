import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory, Redirect } from "react-router-dom";
import Select from "react-select";
import { getItemsAsset, getChild, create_Asset } from "../Action/Api/Asset";
import Alert from "react-bootstrap/Alert";
import {
  handleAmountChange,
  formatToRupiah,
} from "../Components/ThousandSeperator/ThousandSeperator";
const CreateAsset = () => {
  const history = useHistory();
  const [asetName, setAssetName] = useState();
  const [unit, setUnit] = useState();
  const [selectUnit, setSelectUnit] = useState([]);
  const [fundingSource, setFundingSource] = useState();
  const [assetPrice, setAssetPrice] = useState();
  const [transactionDate, setTransactionDate] = useState();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [description, setDescription] = useState();
  const [parent, setParent] = useState([]);
  const [selecParent, setSelectParent] = useState([]);
  const [child, setChild] = useState([]);
  const [selectChild, setSelectChild] = useState([]);
  const [Quantity, setQuantity] = useState();
  const [permissionQuantity, setPermissionQuantity] = useState([]);
  const [error, setError] = useState([]);
  //!Get Api
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        await Promise.all([
          getItemsAsset("api/units", setSelectUnit, "unit", signal),
          getItemsAsset(
            "api/facility-types/all",
            setSelectParent,
            "parent",
            signal
          ),
        ]);

        if (parent) {
          await Promise.all(
            permissionQuantity.map((_, index) => {
              return getChild(parent[index], setSelectChild, signal, index);
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [
    setSelectUnit,
    parent,
    setSelectParent,
    setSelectChild,
    permissionQuantity,
  ]);

  console.log(parent);
  //!Exit Get Api

  //! handle quantity
  const handleQuantity = (a) => {
    setQuantity(a);
    //? setting array Looping
    setPermissionQuantity(Array.from({ length: a }, (_, i) => i + 1));
  };
  //! exit handle quantity
  //!handle images
  const handleImages = (a) => {
    setImage(a);
    setImageUrl(URL.createObjectURL(a));
  };
  //!exit handle images
  //!handle save
  const controller = new AbortController();
  const signal = controller.signal;
  const handleSave = async () => {
    const data = new FormData();
    const asset = child.map((a) => ({ facility_type_id: a.facility_type_id }));

    data.append("unit_id", parseInt(unit));
    data.append("asset_name", asetName);
    if (image) {
      data.append("asset_image", image, {
        contentType: "multipart/form-data",
      });
    }
    data.append("asset_price", assetPrice);
    data.append("quantity", parseInt(Quantity));
    data.append("description", description);
    data.append("funding_source", fundingSource);
    data.append("transaction_date", transactionDate);
    asset.forEach((a, i) => {
      data.append(
        `asset_items[${i}][facility_type_id]`,
        parseInt(a.facility_type_id)
      );
    });
    try {
      await create_Asset(data, setError, history, signal);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, [controller]);
  const LockToken = sessionStorage.getItem("key");
  let token = LockToken ? LockToken.slice(0, 29) : "";
  if (token === "1hLJn7bKqW3mVfIg9XoZtUDpYcExr") {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="page-header mb-0 pb-0">
              <div className="page-title">
                <h4> ASSET </h4>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Dashboard</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <button
                      onClick={() => history.push("/finance/Asset")}
                      style={{
                        color: "blue",
                        cursor: "default",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      Asset
                    </button>
                  </li>
                  <li className="breadcrumb-item">Buat Asset</li>
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
                  Buat Asset
                  <i
                    className="mdi mdi-plus-circle-outline mx-2"
                    style={{ color: "#AF25F5" }}
                  ></i>
                </h4>

                {error.length <= 0 ? (
                  false
                ) : (
                  <Alert variant={"danger"}>
                    <ul className="my-0 py-0">
                      {error.map((error, index) => {
                        console.log(Object.values(error)[0]);
                        return (
                          <li key={index}>{Object.values(error)[0].error}</li>
                        );
                      })}
                    </ul>
                  </Alert>
                )}
                <form className="form-sample" encType="multipart/form-data">
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Nama Asset
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            onChange={(a) => {
                              setAssetName(a.target.value);
                            }}
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Unit</label>
                        <Select
                          options={selectUnit}
                          className="col-sm-9"
                          onChange={(a) => {
                            setUnit(a.value);
                          }}
                          placeholder="null"
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row my-0 py-0">
                        <div className="col-md-12">
                          <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                              Sumber Dana
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                type="text"
                                onChange={(a) => {
                                  setFundingSource(a.target.value);
                                }}
                              />
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-12">
                          <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                              Harga Asset
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                size="sm"
                                type="text"
                                id="Amount"
                                value={formatToRupiah(assetPrice)}
                                onChange={(e) => {
                                  handleAmountChange(e, setAssetPrice);
                                }}
                              />
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-12">
                          <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                              Tanggal Transaksi
                            </label>
                            <div className="col-sm-9">
                              <Form.Control
                                type="date"
                                onChange={(a) => {
                                  setTransactionDate(a.target.value);
                                }}
                              />
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12">
                          <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                              Gambar Asset
                            </label>
                            <div className="col-sm-9">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={"asdasdaimage"}
                                  width={"200"}
                                  className="mb-2"
                                ></img>
                              ) : (
                                false
                              )}
                              <Form.Control
                                type="file"
                                name="photo"
                                onChange={(a) => {
                                  handleImages(a.target.files[0]);
                                }}
                              />
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-md-12">
                          <Form.Group className="row">
                            <label htmlFor="exampleTextarea1 col-sm-12 col-form-label ">
                              <span className="mx-2"></span>
                              Deskripsi
                            </label>
                            <textarea
                              onChange={(a) => {
                                setDescription(a.target.value);
                              }}
                              className="mx-4 form-control col-sm-10"
                              id="exampleTextarea1"
                              rows="4"
                            ></textarea>
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Quantity
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="number"
                            onChange={(a) => {
                              setSelectChild([]);
                              setParent([]);
                              setChild([]);
                              handleQuantity(parseInt(a.target.value));
                            }}
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </form>
              </div>
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
                  Item Asset
                  <i
                    className="mdi mdi-plus-circle-outline mx-2"
                    style={{ color: "#AF25F5" }}
                  ></i>
                </h4>

                <form className="form-sample" encType="multipart/form-data">
                  <div className="row d-flex justify-content-center">
                    {permissionQuantity <= 0 ? (
                      <div className="col-md-6">
                        <Alert key={"danger"} variant={"danger"}>
                          Anda Belum Mengisi Quantity Untuk Menentukan Jumlah
                          Asset Items
                        </Alert>
                      </div>
                    ) : (
                      permissionQuantity.map((num, index) => {
                        const isChildSelected = child.some(
                          (item) => item.index === index
                        );
                        return (
                          <div className="col-md-12" key={num}>
                            <div className="row">
                              <div className="col-sm-3">
                                <Form.Group className="row">
                                  <label className="col-sm-4 col-form-label">
                                    Code Item
                                  </label>
                                  <div className="col-sm-8">
                                    <Form.Control
                                      defaultValue={"Otomatis"}
                                      type="text"
                                      onChange={(a) => {
                                        setChild([]);
                                        handleQuantity(
                                          parseInt(a.target.value)
                                        );
                                      }}
                                      disabled
                                    />
                                  </div>
                                </Form.Group>
                              </div>
                              <div className="col-sm-4">
                                <Form.Group className="row">
                                  <label className="col-sm-3 col-form-label">
                                    Parents Items
                                  </label>
                                  <Select
                                    options={selecParent}
                                    className="col-sm-9"
                                    onChange={(a) => {
                                      setParent((prevState) => {
                                        const lastIndex = prevState.length;
                                        const shouldRemoveLastItem =
                                          lastIndex >= index;

                                        const updatedParent =
                                          shouldRemoveLastItem
                                            ? prevState.slice(0, lastIndex) // Hapus elemen terakhir
                                            : prevState;

                                        updatedParent[index] = a.value; // Tambahkan elemen baru pada indeks yang diberikan

                                        console.log(updatedParent);
                                        return updatedParent;
                                      });
                                    }}
                                    placeholder="null"
                                  />
                                </Form.Group>
                              </div>
                              <div className="col-sm-5">
                                <Form.Group className="row">
                                  <label className="col-sm-3 col-form-label">
                                    Children
                                  </label>
                                  <Select
                                    options={selectChild[index]}
                                    className="col-sm-9"
                                    onChange={(a) => {
                                      if (isChildSelected) {
                                        setChild((prevChild) => {
                                          const newChild = prevChild.map(
                                            (item) => {
                                              if (item.index === index) {
                                                return {
                                                  facility_type_id: a.value,
                                                  index: index,
                                                };
                                              } else {
                                                return item;
                                              }
                                            }
                                          );
                                          return newChild;
                                        });
                                      } else {
                                        setChild((prevChild) => [
                                          ...prevChild,
                                          { facility_type_id: a.value, index },
                                        ]);
                                      }
                                    }}
                                    value={
                                      isChildSelected
                                        ? selectChild.find(
                                            (item) =>
                                              item.value ===
                                              child.find(
                                                (item) => item.index === index
                                              ).facility_type_id
                                          )
                                        : null
                                    }
                                    placeholder="null"
                                    isDisabled={
                                      !isChildSelected &&
                                      index !== 0 &&
                                      !child.some(
                                        (item) => item.index === index - 1
                                      )
                                    }
                                  />
                                </Form.Group>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="row mt-0 pb-0">
                    <div className="col-12 d-flex my-0 py-0">
                      <button
                        type="button"
                        className="btn btn-secondary  "
                        onClick={() => history.push("/user")}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        className="btn btn-success "
                        onClick={() => {
                          handleSave();
                        }}
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

export default CreateAsset;
