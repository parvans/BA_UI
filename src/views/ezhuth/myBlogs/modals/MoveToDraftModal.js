import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function MoveToDraftModal({
  openDraft,
  toggleDraft,
  restoreToDraft,
  toggle,
}) {
  return (
    <Modal isOpen={openDraft} toggle={toggleDraft} className="modal-dialog-centered">
      <ModalHeader toggle={toggle}>Move to Draft</ModalHeader>
      <ModalBody>Are you sure you want to move this to Draft ?</ModalBody>
      <ModalFooter>
        <Button className="btn-round" color="danger" onClick={restoreToDraft}>
          Move to Draft
        </Button>{" "}
        <Button className="btn-round" color="secondary" onClick={toggleDraft}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
