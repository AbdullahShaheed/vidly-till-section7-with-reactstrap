import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfirmModal = ({ onCancel, onConfirm, visible }) => {
  return (
    <Modal isOpen={visible}>
      <ModalHeader toggle={onCancel}>Deleting a movie</ModalHeader>
      <ModalBody>Are you sure to delete this movie?</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onConfirm}>
          Yes
        </Button>
        <Button onClick={onCancel}>No</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
