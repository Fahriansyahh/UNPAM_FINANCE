import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory, Redirect } from "react-router-dom";
import Select from "react-select";
import { v4 as uuid } from "uuid";
import {
  getItemsAsset,
  getChild,
  AssetShow,
  UpdateAsset,
} from "../Action/Api/Asset";
import Alert from "react-bootstrap/Alert";
import { useRef } from "react";
import {
  handleAmountChange,
  formatToRupiah,
} from "../Components/ThousandSeperator/ThousandSeperator";

const EditAsset = () => {
  const isMounted = useRef(true);
  const history = useHistory();
  const [OldData, setOldData] = useState();
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
  const [parentChild, setParentChild] = useState([]);
  const [selecParent, setSelectParent] = useState();
  const [child, setChild] = useState([]);
  const [selectChild, setSelectChild] = useState([]);
  const [Quantity, setQuantity] = useState();
  const [permissionQuantity, setPermissionQuantity] = useState([]);
  const [quantityFixed, setQuantityFixed] = useState();
  const [error, setError] = useState([]);
  const [defaultAssetItems, setDefaultAssetItems] = useState();

  //!Get Api Old data

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      await AssetShow(setOldData, signal);
      await getItemsAsset("api/units", setSelectUnit, "unit", signal);
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, [setOldData, setSelectUnit]);

  //! Get Select Api

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      //!set quantity Old

      await getItemsAsset(
        "api/facility-types/all",
        setSelectParent,
        "parent",
        signal
      );

      if (parent) {
        await Promise.all(
          permissionQuantity.map(async (_, index) => {
            if (parent[index]) {
              return await getChild(
                parent[index],
                setSelectChild,
                signal,
                index
              );
            }
            return null;
          })
        );
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [parent, setOldData, error, isMounted, permissionQuantity]);

  //! set Quantity
  useEffect(() => {
    if (OldData) {
      setPermissionQuantity(
        Array.from(
          { length: quantityFixed || OldData.quantity },
          (_, i) => i + 1
        )
      );
      setDefaultAssetItems(OldData.asset_items);
    }
  }, [
    OldData,
    setPermissionQuantity,
    quantityFixed,
    parentChild,
    setDefaultAssetItems,
  ]);

  //!handle default data asset Items
  useEffect(() => {
    if (defaultAssetItems) {
      defaultAssetItems.forEach((dataDefault, index) => {
        setParent((prevState) => {
          const newArr = [...prevState];
          newArr[index] = dataDefault.facility_type.id;
          return newArr;
        });

        setSelectChild((prevState) => {
          const newArr = [...prevState];
          newArr[index] = [];
          return newArr;
        });
      });
    }
  }, [defaultAssetItems]);

  //! handle quantity
  const handleQuantity = (a) => {
    setQuantityFixed(a);
    setQuantity(a);
    //? setting array Looping
    setPermissionQuantity(Array.from({ length: a }, (_, i) => i + 1));
  };

  //!handle images
  const handleImages = (a) => {
    setImage(a);
    setImageUrl(URL.createObjectURL(a));
  };
  //!exit handle images

  //!handle date

  const dateString = OldData ? OldData.transaction_date : false;
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;

  //!handle save
  const controller = new AbortController();
  const signal = controller.signal;
  const handleSave = async () => {
    //! filtering asset Items
    let oldChild = child;
    let asset = OldData.asset_items.map((item, index) => {
      const childItem = child.find((childItem) => childItem.index === index);
      if (childItem && childItem.facility_type_id !== item.facility_type.id) {
        return {
          facility_type_id: childItem.facility_type_id,
          index: index,
          item_code: item.item_code,
          uuid: item.uuid,
        };
      }
      return {
        facility_type_id: item.facility_type.id,
        index: index,
        item_code: item.item_code,
        uuid: item.uuid,
      };
    });

    OldData.asset_items.forEach((item, index) => {
      const childItem = child.find((childItem) => childItem.index === index);
      if (childItem && childItem.facility_type_id !== item.facility_type.id) {
        item.facility_type.id = child.find(
          (childItem2) =>
            childItem2.facility_type_id === childItem.facility_type_id
        ).facility_type_id;
      }
    });
    oldChild.forEach((childItem) => {
      const index = asset.findIndex((item) => item.index === childItem.index);
      if (index === -1) {
        asset.push({
          facility_type_id: childItem.facility_type_id,
          index: childItem.index,
          item_code: Math.floor(1000000000 + Math.random() * 9000000000),
          uuid: uuid(),
        });
      }
    });
    //? cut asset
    for (let a = asset.length - 1; a >= permissionQuantity.length; a--) {
      asset.splice(a, 1);
    }

    //! exit filtering asset items

    const data = new FormData();

    let newUnit = unit ? unit : OldData.unit.id;
    data.append("_method", "PUT");
    data.append("unit_id", parseInt(newUnit));
    data.append("asset_name", asetName || OldData.asset_name);
    //?handle image
    if (image) {
      data.append("asset_image", image, {
        contentType: "multipart/form-data",
      });
    }
    data.append("asset_price", assetPrice || OldData.asset_price);
    data.append("quantity", parseInt(Quantity || OldData.quantity));
    data.append("description", description || OldData.description || null);

    data.append("funding_source", fundingSource || OldData.funding_source);

    data.append("transaction_date", transactionDate || date);
    //?push asset
    for (let i = 0; i < asset.length; i++) {
      data.append(
        `asset_items[${i}][facility_type_id]`,
        parseInt(asset[i].facility_type_id)
      );
      data.append(`asset_items[${i}][item_code]`, asset[i].item_code);
      data.append(`asset_items[${i}][uuid]`, asset[i].uuid);
    }
    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    //!update Api
    if (isMounted.current) {
      await UpdateAsset(data, setError, history, signal);
    }
    return () => {
      isMounted.current = true;
    };
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
                  <li className="breadcrumb-item">Ubah Asset</li>
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
                  Ubah Asset
                  <i
                    className="mdi mdi-autorenew mx-2  "
                    style={{ color: "#AF25F5", fontSize: "22px" }}
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
                {OldData ? (
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
                              defaultValue={asetName || OldData.asset_name}
                              onChange={(a) => {
                                setAssetName(a.target.value);
                              }}
                            />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">
                            Satuan
                          </label>
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
                                  defaultValue={
                                    fundingSource || OldData.funding_source
                                  }
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
                                  value={formatToRupiah(
                                    assetPrice || OldData.asset_price
                                  )}
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
                                  defaultValue={transactionDate || date}
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
                                <img
                                  src={
                                    imageUrl ||
                                    process.env.REACT_APP_URL_API +
                                      "/storage/" +
                                      OldData.asset_image
                                  }
                                  alt={"asdasdaimage"}
                                  width={"200"}
                                  className="mb-2"
                                ></img>
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
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">
                            Kuantitas
                          </label>
                          <div className="col-sm-9">
                            <Form.Control
                              type="number"
                              defaultValue={Quantity || OldData.quantity}
                              onChange={(a) => {
                                setChild([]);
                                handleQuantity(parseInt(a.target.value));
                              }}
                            />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label htmlFor="exampleTextarea1 col-sm-12 col-form-label ">
                            <span className="mx-2"></span>
                            Deskripsi
                          </label>
                          <textarea
                            defaultValue={description || OldData.description}
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
                  </form>
                ) : (
                  <div>
                    <p>...loading</p>
                  </div>
                )}
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

                {OldData ? (
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
                                        const newEntry = {
                                          parent,
                                          index,
                                        };
                                        setParentChild((prevParentChild) => {
                                          const updatedParentChild =
                                            prevParentChild.filter(
                                              (item) =>
                                                item.index !== newEntry.index
                                            );
                                          return [
                                            ...updatedParentChild,
                                            newEntry,
                                          ];
                                        });
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
                                            {
                                              facility_type_id: a.value,
                                              index,
                                            },
                                          ]);
                                        }
                                      }}
                                      placeholder={
                                        index >= OldData.asset_items.length
                                          ? null
                                          : OldData.asset_items[index]
                                              .facility_type.facility_type_name
                                      }
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
                ) : (
                  <div>
                    <p>...loading</p>
                  </div>
                )}
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

export default EditAsset;
