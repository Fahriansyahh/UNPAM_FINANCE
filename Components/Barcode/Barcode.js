import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Barcode = ({ url }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <i
        className="mdi mdi-qrcode-scan"
        style={{ color: "blue" }}
        onClick={handleShow}
      ></i>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#1480E5" }}>
          <Modal.Title>
            <div className="brand-logo mb-0 pb-0">
              <img
                src={require("../../../assets/images/Logo/logo.png")}
                style={{ width: "50px" }}
                alt="logo"
              />
              <p className="mb-4 mt-2 pt-0 display-4">Unpam-finance-report</p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ backgroundColor: "white" }}
          className="d-flex justify-content-center"
        >
          <div
            style={{
              width: "max-content",
              border: "4px solid black",
            }}
            className="p-1"
          >
            <img src={"data:image/png;base64," + url} alt="logo" />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#1480E5" }}>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ color: "black" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Barcode;
