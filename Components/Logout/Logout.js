import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { LogoutUser } from "../../Action/Api/user";
const Logout = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    LogoutUser(history);
  };
  return (
    <>
      <button
        className="nav-link m-0 p-0 "
        style={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          width: "100%",
        }}
        onClick={handleShow}
      >
        <span className="menu-title">Logout</span>
        <i className="mdi mdi-exit-to-app menu-icon"></i>
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda Ingin Logout tidak/ya </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Logout;
