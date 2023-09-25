import React from "react";
import { Image } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { GetItemIncome } from "../Action/Api/Income";
import { formatToRupiah } from "../Components/ThousandSeperator/ThousandSeperator";
const ItemIncome = () => {
  const [data, setData] = useState();
  const history = useHistory();
  useEffect(() => {
    GetItemIncome(setData);
  }, [setData]);
  console.log(data);
  const CreatedDate = new Date(data ? data.transaction_date : false);
  const Created_Date = CreatedDate.toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  if (data) {
    return (
      <div>
        <div className="row ">
          <div className="col-lg-12 ">
            <div className="page-header mb-0 pb-0">
              <div className="page-title">
                <h4> PENDAPATAN </h4>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ marginRight: "-16px" }}>
                  <li className="breadcrumb-item active" aria-current="page">
                    <button
                      onClick={() => history.push("/Dashboard")}
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
                  <li className="breadcrumb-item">Buka</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>{" "}
        <div className="row ">
          <div className="col-lg-12 grid-margin stretch-card mt-0">
            <div className="card">
              <div
                className="card-body mx-0 px-0"
                style={{ height: "max-content", padding: "0 30px", margin: 0 }}
              >
                <div>
                  <div className="row my-2">
                    <div className="col-sm-5 mt-0 mt-sm-5 mt-lg-3 ">
                      <ul>
                        <li style={{ listStyle: "none" }}>
                          Kategori Pendapatan : {data.cashflow_name}
                        </li>
                        <li style={{ listStyle: "none" }}>
                          Nama Pendapatan :{" "}
                          {data.cashflow_category.cashflow_category_name}
                        </li>
                        <li style={{ listStyle: "none" }}>
                          Jumlah : {formatToRupiah(data.amount)}
                        </li>
                        <li style={{ listStyle: "none" }}>
                          Tanggal Transaksi : {Created_Date}
                        </li>
                      </ul>
                      <div className="mt-0 mt-sm-5 mt-0 mt-lg-3">
                        <form>
                          <div className="form-group mx-3">
                            <label>Deskripsi</label>
                            <textarea
                              className="form-control"
                              defaultValue={
                                data.description === null
                                  ? "tidak ada"
                                  : data.description
                              }
                            ></textarea>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-sm-7 px-2  ">
                      <div className="d-flex justify-content-center">
                        <h5>Bukti Gambar</h5>
                      </div>
                      <div className="d-flex flex-wrap justify-content-center ">
                        {data.cashflow_proofs.map((DataProofs, i) => {
                          return (
                            <div key={i} className="m-1">
                              <Image
                                src={
                                  process.env.REACT_APP_URL_API +
                                  "/storage/" +
                                  DataProofs.proof_image
                                }
                                alt="image tidak ada"
                                width={"150px"}
                                rounded
                              />
                              <p style={{ fontSize: "10px" }}>
                                {DataProofs.proof_description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading ...</div>;
  }
};

export default ItemIncome;
