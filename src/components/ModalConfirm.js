import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { deleteUser } from "../service/UserService";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFormModel } =
    props;

  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataUserDelete.id);
    if (res && +res.statusCode === 204) {
      handleClose();
      handleDeleteUserFormModel(dataUserDelete);
      toast.success("delete success");
    } else {
      toast.error("eror");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>DELETE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't undone. Do you want delete this user, "
            <b>{dataUserDelete.email}</b>"?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => confirmDeleteUser()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
