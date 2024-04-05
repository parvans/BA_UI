import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";
export default function DeleteBlogModal({openDelete,toggleDelete,deleteBlog,toggle,deleteLoading}) {
  return (
    <Modal isOpen={openDelete} toggle={toggleDelete} className="modal-dialog-centered">
      <ModalHeader toggle={toggle}>Delete Blog</ModalHeader>
      <ModalBody>Are you sure you want to delete this blog ?</ModalBody>
      <ModalFooter>
        <Button className="btn-round" color="danger" onClick={deleteBlog}>
          {
            deleteLoading ? <Spinner color="light" size="sm" /> : "Delete"
          }
        </Button>{" "}
        <Button className="btn-round" color="secondary" onClick={toggleDelete}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
