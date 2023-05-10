import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Card, CardBody, CardHeader, Col, Row, Table ,Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import { deleteMyBlogs } from 'utilities/apiService'
import { getMyBlogs } from 'utilities/apiService'
export default function MyBlogs() {
    const [blogs, setBlogs] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [blogId, setBlogId] = useState()
    const getBlogs = async () => {
        try {
            const response = await getMyBlogs()
            // console.log(response?.data?.data);
            setBlogs(response?.data?.data)
            // setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    const toggle=()=>{
        setOpenModal(!openModal)
    }
    const deleteBlog=async()=>{
        setOpenModal(!openModal)
        try {
            console.log(blogId);
            const res=await deleteMyBlogs(blogId)
            console.log(res?.ok);
            if(!res?.ok){
                toast.error(res?.data?.message)
                // getBlogs()
            }else{
                toast.success(res?.data?.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBlogs()
    }, [blogs, openModal])
    return (
        <div className="content">
             <Modal isOpen={openModal} toggle={toggle} className="modal-dialog-centered">
          <ModalHeader toggle={toggle}>Delete Blog</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this blog?
          </ModalBody>
          <ModalFooter>
            <Button className="btn-round" color="danger" onClick={deleteBlog}>Delete</Button>{' '}
            <Button className="btn-round" color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
            <Row>
                <Col md="12">
                    <Card style={{ maxWidth: "100%", minWidth: "100%", marginTop: '30px', borderColor: 'transparent' }} >
                        <CardBody>
                            <CardHeader className="d-flex justify-content-between">
                                <h5 className="title">My Blogs</h5>
                                <Button className="btn btn-primary btn-md btn-round">Add Blog</Button>
                            </CardHeader>
                            <Table responsiveTag={true} hover onScroll={(e) => console.log(e)} style={{ overflowX: 'scroll' }}>
                                <thead className="text-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Blog</th>
                                        <th className="text-center">Date</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs?.map((blog, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{blog?.title}</td>
                                            <td className="text-center">{moment(blog?.createdAt).format('DD-MM-YYYY')}</td>
                                            <td className="text-center">
                                                <Button className="btn btn-success btn-sm mr-2 btn-round" >View</Button>
                                                <Button className="btn btn-warning btn-sm mr-2 btn-round" >Edit</Button>
                                                <Button className="btn btn-danger btn-sm btn-round" onClick={()=>{
                                                    toggle()
                                                    setBlogId(blog?._id)
                                                }}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Toaster
            position='top-center'
            reverseOrder={false}
        />
        </div>
    )
}
