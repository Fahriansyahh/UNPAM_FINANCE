import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useHistory, Redirect } from "react-router-dom";
import { Barcode } from "../Components";
import "../../assets/styles/font/itemAsset.scss";
import axios from "axios";
const ItemAsset = () => {
  const history = useHistory();
  const [data, setData] = useState();

  useEffect(() => {
    const Locktoken = sessionStorage.getItem("key") || "";
    let token = Locktoken.slice(29);
    const idAsset = sessionStorage.getItem("idAsset");
    axios
      .get(`${process.env.REACT_APP_URL_API}/api/assets/${idAsset}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })

      .catch((err) => {
        console.log(err);
        sessionStorage.removeItem("key");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("editUser");
        sessionStorage.removeItem("idRoles");
        sessionStorage.removeItem("Units");
        window.location.reload();
      });
  }, [setData]);
  //!exit
  //! setup data
  const image = data ? data.asset_image : false;
  //!transaction Created
  const CreatedAt = new Date(data ? data.transaction_date : false);
  const Created_Transaction = CreatedAt.toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  //!Created User

  //! Created Unit
  const CreatedUnit = new Date(data ? data.unit.created_at : false);
  const Created_Unit = CreatedUnit.toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  //? exit
  const LockToken = sessionStorage.getItem("key");
  let token = LockToken ? LockToken.slice(0, 29) : "";
  if (token === "1hLJn7bKqW3mVfIg9XoZtUDpYcExr") {
    if (data) {
      return (
        <div className="Container_itemAsset">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-header mb-0 pb-0">
                <div className="page-title">
                  <h4> Asset_items </h4>
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
                    <li className="breadcrumb-item active " aria-current="page">
                      Asset_Items
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <Container fluid>
                  <Row className="mt-3 d-flex align-items-lg-start ">
                    <Col
                      xs={"12"}
                      sm={"9"}
                      lg={"8"}
                      className="order-1 order-sm-0 mt-4 mt-sm-0"
                    >
                      <Row>
                        <Col xs={"12"} sm={"6"} lg={"6"} className="Asset">
                          <p className="display-6 m-0 p-0">
                            Nama Asset : {data ? data.asset_name : false}
                          </p>
                          <p className="display-6 m-0 p-0">
                            Sumber Pendanaan :{" "}
                            {data ? data.funding_source : false}
                          </p>
                          <p className="display-6 m-0 p-0">
                            Asset Price : {data ? data.asset_price : false}
                          </p>
                          <p className="display-6 m-0 p-0">
                            Created Transaction : {Created_Transaction}
                          </p>
                          <p className="display-6 m-0 p-0">
                            quantity : {data ? data.quantity : false}
                          </p>
                        </Col>
                        <Col
                          xs={"12"}
                          sm={"6"}
                          lg={"6"}
                          className="d-flex justify-content-center justify-content-sm-end"
                        >
                          <Image
                            src={
                              process.env.REACT_APP_URL_API +
                              "/storage/" +
                              image
                            }
                            alt="image tidak ada"
                            width={"200px"}
                            rounded
                          />
                        </Col>
                        <Col xs={"12"} sm={"12"} lg={"12"} className="mt-4 ">
                          <Row>
                            <Col sm="8" className="deskripsi">
                              <h6 className="m-0 p-0 ">
                                <strong>deskripsi</strong>
                              </h6>
                              <hr className="mt-0 p-0"></hr>
                              <p style={{ fontSize: "14px" }}>
                                {data ? data.description : false}
                              </p>
                            </Col>
                            <Col sm="4" className=" mt-3 unit mb-2 mb-sm-0">
                              <h6 className="display-6  ">Unit</h6>
                              <p className="m-0 p-0">
                                Unit_Name : {data ? data.unit.unit_name : false}
                              </p>
                              <p className="m-0 p-0">
                                Created_Unit : {Created_Unit}{" "}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    {/* user */}
                  </Row>
                </Container>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card ">
                <div
                  className="card-body mx-0 px-0"
                  style={{
                    height: "max-content",
                    padding: "0 30px",
                    margin: 0,
                  }}
                >
                  <div className="table-responsive m-0 p-0">
                    <div className="card">
                      <div className="card-body m-0 p-0 p-3">
                        <h4
                          className="card-title  font-italic"
                          style={{ color: "#9C9FA6" }}
                        >
                          Asset_Items
                          <i
                            className="mdi mdi-sitemap mx-2"
                            style={{ color: "#AF25F5" }}
                          ></i>
                        </h4>
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th className="p-2 ">Nama Induk</th>
                                <th className="p-2 ">Nama Barang</th>
                                <th className="p-2 flex-grow-1 bd-highlight w-100">
                                  Nama Kode Barang
                                </th>
                                <th className="p-2 bd-highlight text-center">
                                  Terbuat
                                </th>
                                <th className="p-2 bd-highlight text-center">
                                  Aksi
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {data
                                ? data.asset_items.map((items) => {
                                    const CreatedItems = new Date(
                                      data ? items.created_at : false
                                    );
                                    const Created_Items =
                                      CreatedItems.toLocaleString("en-GB", {
                                        day: "numeric",
                                        month: "numeric",
                                        year: "numeric",
                                      });
                                    console.log(items);
                                    return (
                                      <tr key={items.id}>
                                        <td>
                                          {
                                            items.facility_type.parent
                                              .facility_type_name
                                          }
                                        </td>
                                        <td>
                                          {
                                            items.facility_type
                                              .facility_type_name
                                          }
                                        </td>
                                        <td
                                          style={{
                                            width: "30px",
                                            maxWidth: "30px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          {items.item_code}
                                        </td>

                                        <td>{Created_Items}</td>
                                        <td>
                                          <ul
                                            className="d-inline-block m-0 p-0"
                                            style={{ listStyle: "none" }}
                                          >
                                            <li className="d-inline-block m-0 p-0">
                                              <Barcode url={items.qr_code} />
                                            </li>
                                          </ul>
                                        </td>
                                      </tr>
                                    );
                                  })
                                : false}
                            </tbody>
                          </table>
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
      return (
        <div>
          <p>....loading</p>
        </div>
      );
    }
  } else {
    return <Redirect to="/login" />;
  }
};

export default ItemAsset;
