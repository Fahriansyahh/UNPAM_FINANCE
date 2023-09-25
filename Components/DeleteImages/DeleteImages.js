import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteImage } from "../../Action/Api/Expense";
const DeleteImages = ({
  index,
  setNewImages,
  setNewDescriptions,
  uuid = "",
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    deleteImage(uuid[index].uuid);
    setShow(false);
  };
  return (
    <>
      <i
        className="mdi  mdi-delete"
        style={{ color: "red", fontSize: "16px" }}
        onClick={handleShow}
      ></i>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Hapus </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda Yakin Images di Hapus Secara Permanent{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteImages;
