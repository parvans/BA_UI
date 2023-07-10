import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function MoveToTrashModal({ openModal, toggle, trashTheBlog }) {
  return (
    <Modal isOpen={openModal} toggle={toggle} className="modal-dialog-centered">
      <ModalHeader toggle={toggle}>Trash Blog</ModalHeader>
      <ModalBody>Are you sure you want to move this to trash ?</ModalBody>
      <ModalFooter>
        <Button className="btn-round" color="danger" onClick={trashTheBlog}>
          move to trash
        </Button>{" "}
        <Button className="btn-round" color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
