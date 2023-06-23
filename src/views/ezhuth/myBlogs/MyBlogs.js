import JoditEditor from 'jodit-pro-react'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Card, CardBody, CardHeader, Col, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Spinner } from 'reactstrap'
import { addUserBlog } from 'utilities/apiService'
import { deleteMyBlogs } from 'utilities/apiService'
import { getMyBlogs } from 'utilities/apiService'
import Blog from '../Blog/Blog'
import { getABlog } from 'utilities/apiService'
import { editUserBlog } from 'utilities/apiService'
export default function MyBlogs() {
    const editorRef = useRef(null)
    const [blogs, setBlogs] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [blogId, setBlogId] = useState()
    const [openAdd, setOpenAdd] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState('')
    const [leave, setLeave] = useState(false)
    const [viewBlog, setViewBlog] = useState(false)
    const [loading, setLoading] = useState(false)
    //recognize edit or add
    const [edit, setEdit] = useState(false)
    //errors
    const [titleError, setTitleError] = useState('')
    const [contentError, setContentError] = useState('')
    const [imageError, setImageError] = useState('')

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

    // This is to get data for edit
    const getBlogForEdit=async(id)=>{
        try {
            const res=await getABlog(id);
            // console.log(res?.data);
            if(res?.ok){
                // setData(res?.data);
                // setContent(res?.data?.blog?.description);
                setTitle(res?.data?.blog?.title);
                setContent(res?.data?.blog?.description);
                // setPreview(res?.data?.blog?.image);

                // console.log(res?.data?.blog?.title);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // This is to maintain the delete warning modal
    const toggle = () => {
        setOpenModal(!openModal)
    }

    const toggleLeave = () => {
        setLeave(!leave)
    }

    const toggleEditOrAdd = () => {
        if(edit){
            setEdit(!edit)
            toggleLeave()
            setTitle('')
            setContent('')
            setImage('')
            setPreview('')
        }else{
            setOpenAdd(!openAdd)
            toggleLeave()
            setTitle('')
            setContent('')
            setImage('')
            setPreview('')
        }
    }

    const theLeave = () => {
        if(title || content || preview){
            setLeave(!leave)
        } else if(edit){
            setEdit(!edit)
            setOpenAdd(!openAdd)
        }
        else{
            setOpenAdd(!openAdd)
        }
    }
    const deleteBlog = async () => {
        setOpenModal(!openModal)
        try {
            console.log(blogId);
            const res = await deleteMyBlogs(blogId)
            console.log(res?.ok);
            if (!res?.ok) {
                toast.error(res?.data?.message)
                // getBlogs()
            } else {
                toast.success(res?.data?.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    // This is Blogg add section ----------------------------------------------------

    const handleFileInput = (e) => {
        const file = e.target.files[0]
        previewFile(file)
        console.log(file);
    }
    const previewFile = (file) => {
        const render = new FileReader()
        render.readAsDataURL(file)
        render.onloadend = () => {
            setPreview(render.result)
        }
    }

    const addBlog = async (e) => {
        e.preventDefault()
        if (!title) {
            setTitleError('Title is required')
        } else {
            setTitleError('')
        }
        if (!content) {
            setContentError('Content is required')
        } else {
            setContentError('')
        }
        if (!preview) {
            setImageError('Image is required')
        } else {

            setImageError('')
            setLoading(true)
        }
        
        try {
            const res = await addUserBlog({
                title,
                description: content,
                data: preview
            })
            if (!res?.ok) {
                toast.error(res?.data?.message)
            } else {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
                if(!loading){
                toast.success(res?.data?.message)
                setOpenAdd(!openAdd)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    //--------------------------------------------------------------------------------


    // This is Blogg edit section ----------------------------------------------------

    const editBlog = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await editUserBlog({
                title,
                description: content,
            },blogId)
            if (!res?.ok) {
                toast.error(res?.data?.message)
            } else {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
                if(!loading){
                toast.success(res?.data?.message)
                setEdit(!edit)
                setTitle('')
                setContent('')
                }
            }
        } catch (error) {
            console.log(error);
        }        
    }
    useEffect(() => {
        getBlogs()
    }, [blogs, openModal, openAdd, leave, viewBlog,edit])
    return (
        <div className="content">
            {/* Delete Blog */}
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

            {/* Leave modal in add blog  */}
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

            <Row>
                <Col md="12">
                    {viewBlog ?
                    // View Blog
                    
                    <Blog blog={viewBlog} setBlog={setViewBlog} />
                       
                         : openAdd|| edit ? (

                            // Add Blog
                            <Card style={{ maxWidth: "100%", minWidth: "100%", marginTop: '30px', borderColor: 'transparent' }} >
                                <CardBody>
                                    <CardHeader style={{ display: 'flex', flexDirection: 'row', overflow: 'auto', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', overflow: 'auto', alignItems: 'center' }}>
                                            <i className="nc-icon nc-minimal-left" style={{
                                                cursor: 'pointer',
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                alignItems: 'center',
                                                marginLeft: 'auto',
                                                marginRight: '0px',
                                                padding: '10px',
                                                borderRadius: '50%',
                                                backgroundColor: '#e9ecef',
                                                marginBottom: '7px'
                                            }}
                                                onClick={theLeave} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', overflow: 'auto', alignItems: 'center', marginTop: '10px', marginLeft: '6px' }}>
                                            <h5 className="title">
                                                {edit? "Edit Blog" : "Create Blog"}
                                                </h5>
                                        </div>
                                    </CardHeader>

                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1">Title</label>
                                            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} id="exampleFormControlInput1" placeholder="Title" />
                                            {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlTextarea1">Content</label>

                                            {/* Jodit Editor */}
                                            <JoditEditor
                                                ref={editorRef}
                                                value={content}
                                                tabIndex={1} // tabIndex of textarea
                                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                                onChange={(newContent) => setContent(newContent)}
                                            />
                                            {contentError && <p style={{ color: 'red' }}>{contentError}</p>}
                                        </div>
                                        {!edit&&(<><div className="form-group">
                                            <label htmlFor="exampleFormControlFile1">Image</label>
                                            <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={handleFileInput} value={image} />
                                            {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                                        </div>
                                        {preview && (<div className="form-group">
                                            <img src={preview} alt="blog" style={{ width: '200px', height: '200px' }} />
                                        </div>)}
                                        </>
                                        )}
                                        <Button className="btn btn-primary btn-md btn-round" onClick={edit? editBlog:addBlog}>
                                            {/* {edit ? 'Edit Blog' : 'Post Blog'} */}
                                            {loading ? <Spinner color="light" /> : edit ? 'Edit Blog' : 'Post Blog'}
                                            </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        ) : (
                            // Table of Blogs 

                            <Card style={{ maxWidth: "100%", minWidth: "100%", marginTop: '30px', borderColor: 'transparent' }} >
                                <CardBody>
                                    <CardHeader className="d-flex justify-content-between">
                                        <h5 className="title">My Blogs</h5>
                                        <Button className="btn btn-primary btn-md btn-round" onClick={() => setOpenAdd(!openAdd)}>Add Blog</Button>
                                    </CardHeader>
                                    {blogs?.length === 0 ? <h5 className="text-center">No Blogs Found</h5> :
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
                                                            <Button className="btn btn-success btn-sm mr-2 btn-round" onClick={() => {
                                                                setViewBlog(!viewBlog)
                                                                localStorage.setItem("blogId", blog?._id)
                                                            }}>View</Button>
                                                            <Button className="btn btn-warning btn-sm mr-2 btn-round"
                                                            onClick={async() => {
                                                                setEdit(!edit)
                                                                // localStorage.setItem("blogId", blog?._id)
                                                                setBlogId(blog?._id)
                                                                // console.log(blogId);
                                                                getBlogForEdit(blog?._id)
                                                            }
                                                            }
                                                             >Edit</Button>
                                                            <Button className="btn btn-danger btn-sm btn-round" onClick={() => {
                                                                toggle()
                                                                setBlogId(blog?._id)
                                                            }}>Delete</Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>}
                                </CardBody>
                            </Card>
                        )
                    }
                </Col>
            </Row>
            <Toaster
                position='top-center'
                reverseOrder={false}
            />
        </div>
    )
}
