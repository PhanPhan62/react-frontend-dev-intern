import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { postCreateNewUser } from "../service/UserService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalAddNew = (props) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const { show, handleClose, handleUpdateTable } = props;

  const handleSaveUser = async () => {
    let res = await postCreateNewUser(name, job);

    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("Add new Success");
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      toast.error("Add new fall");
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
          <Modal.Title>Add new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Job</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="job"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
