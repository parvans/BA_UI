import React from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { IconButton } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
export default function ProfileModal({user,children}) {
    const {isOpen,onOpen,onClose}=useDisclosure()
  return (
    <>
    {
        children?(
            <span onClick={onOpen}>{children}</span>
        ):(
            <Button onClick={onOpen} className="btn-round" color="primary">
                <ViewIcon w={17} h={20} />
            </Button>
        )}

        <Modal isOpen={isOpen} toggle={onClose} className="modal-dialog-centered">
                <ModalHeader toggle={onClose}>Profile</ModalHeader>
                <ModalBody>
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                        <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile" style={{width:"100px",height:"100px",borderRadius:"50%"}}/>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                            
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {/* <Button className="btn-round" color="danger" onClick={trashTheBlog}>move to trash</Button>{' '} */}
                    <Button className="btn-round" color="secondary" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </Modal>
    </>
  )
}
