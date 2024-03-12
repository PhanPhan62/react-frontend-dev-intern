import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { postCreateNewUser } from "../service/UserService";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { putUpdateUser } from "../service/UserService";
import { toast } from "react-toastify";

const ModalUpdate = (props) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const { show, handleClose, dataUserEdit, handleUpdateTableFromModal } = props;

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job, dataUserEdit.id);

    if (res && res.updatedAt) {
      handleUpdateTableFromModal({
        first_name: name,
        id: dataUserEdit.id,
      });
      handleClose();
      toast("Cập nhật thành công");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>edit a User</Modal.Title>
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
          <Button variant="primary" onClick={() => handleEditUser()}>
            confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdate;
