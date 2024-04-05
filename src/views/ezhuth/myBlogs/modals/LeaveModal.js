import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function LeaveModal({leave,toggleLeave,toggleEditOrAdd}) {
  return (
    <Modal isOpen={leave} toggle={toggleLeave} className="modal-dialog-centered">
                <ModalHeader toggle={toggleLeave}>Leave Page</ModalHeader>
                <ModalBody>
                    Are you sure you want to leave this page?
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-round" color="danger" onClick={toggleEditOrAdd}>Leave</Button>{' '}
                    <Button className="btn-round" color="secondary" onClick={toggleLeave}>Cancel</Button>
                </ModalFooter>
            </Modal>
  )
}
