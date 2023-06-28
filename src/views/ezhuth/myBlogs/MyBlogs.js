import JoditEditor from 'jodit-pro-react'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Card, CardBody, CardHeader, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Spinner, Input, Label } from 'reactstrap'
import { addUserBlog } from 'utilities/apiService'
import { deleteMyBlogs } from 'utilities/apiService'
import { getMyBlogs } from 'utilities/apiService'
import Blog from '../Blog/Blog'
import { getABlog } from 'utilities/apiService'
import { editUserBlog } from 'utilities/apiService'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {FilterMatchMode} from 'primereact/api'
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.css"
import { InputText } from 'primereact/inputtext'
import { TabView, TabPanel } from 'primereact/tabview';
import 'primeicons/primeicons.css';
import { Skeleton } from 'primereact/skeleton';
import { getAllUserTrashBlogs } from 'utilities/apiService'
import { moveToTrash } from 'utilities/apiService'
import tc from 'thousands-counter';
import { getUserDrafts } from 'utilities/apiService'

export default function MyBlogs() {
    const editorRef = useRef(null)
    const [blogs, setBlogs] = useState([])
    const [drafts, setDrafts] = useState([])
    const [trashs,setTrashs]=useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [blogId, setBlogId] = useState()
    const [openAdd, setOpenAdd] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState('')
    const [leave, setLeave] = useState(false)
    const [viewBlog, setViewBlog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [draftLoading, setDraftLoading] = useState(false)
    //recognize edit or add
    const [edit, setEdit] = useState(false)
    //errors
    const [titleError, setTitleError] = useState('')
    const [contentError, setContentError] = useState('')
    const [imageError, setImageError] = useState('')

    //Filter
    const [filters, setFilters] = useState({
        global: {
            value: null,
            matchMode: FilterMatchMode.CONTAINS
        }
    })
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

    const getTrashBlogs=async()=>{
        try {
            const response=await getAllUserTrashBlogs()
            setTrashs(response?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getDrafts = async () => {
        try {
           const res=await getUserDrafts() 
              setDrafts(res?.data?.data)

        } catch (error) {
            console.log(error);
        }
    }
    

    // This is to get data for edit
    const getBlogForEdit=async(id)=>{
        try {
            const res=await getABlog(id);
            if(res?.ok){
                setTitle(res?.data?.blog?.title);
                setContent(res?.data?.blog?.description);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // This is to maintain the delete warning modal
    const toggle = () => {
        setOpenModal(!openModal)
    }
    const toggleDelete = () => {
        setOpenDelete(!openDelete)
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
//Move the blog to trash 
    const trashTheBlog = async ()=>{
        setOpenModal(!openModal)
        try {
            const res = await moveToTrash(blogId)
            console.log(res);
            if (!res?.ok) {
                toast.error(res?.data?.message)
            } else {
                // console.log(res?.data);
                toast.success(res?.data?.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const deleteBlog = async () => {
        setOpenModal(!openModal)
        try {
            const res = await deleteMyBlogs(blogId)
            console.log(res?.ok);
            if (!res?.ok) {
                toast.error(res?.data?.message)
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
    const saveToDraft = async (e) => {
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
            setDraftLoading(true)
        }
        
        try {
            const res = await addUserBlog({
                title,
                description: content,
                data: preview,
                isDraft:true
            })
            if (!res?.ok) {
                toast.error(res?.data?.message)
            } else {
                setTimeout(() => {
                    setDraftLoading(false)
                }, 1000);
                if(!draftLoading){
                toast.success("Saved to Drafts")
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
    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                <i className="nc-icon nc-zoom-split" />
                    <InputText value={filters['global'] ? filters['global'].value : ''} onChange={(e)=>{
                        setFilters({
                            global: {
                                value: e.target.value,
                                matchMode: FilterMatchMode.CONTAINS
                            }
                        })
                    }} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
 const bodyTemplate = () => {
        return <Skeleton></Skeleton>
    }

    const header = renderHeader();
    useEffect(() => {
        getTrashBlogs()
    },[trashs])
    useEffect(() => {
        getDrafts()
    },[drafts])

    useEffect(() => {
        getBlogs()
        // getTrashBlogs()
        // getDrafts()
    }, [blogs,openModal, openAdd, leave, viewBlog,edit])
    return (
        <div className="content">
            {/* Delete Blog */}
            <Modal isOpen={openModal} toggle={toggle} className="modal-dialog-centered">
                <ModalHeader toggle={toggle}>Trash Blog</ModalHeader>
                <ModalBody>
                    Are you sure you want to move this to trash ?
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-round" color="danger" onClick={trashTheBlog}>move to trash</Button>{' '}
                    <Button className="btn-round" color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={openDelete} toggle={toggleDelete} className="modal-dialog-centered">
                <ModalHeader toggle={toggle}>Delete Blog</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this blog ?
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-round" color="danger" onClick={deleteBlog}>Delete</Button>{' '}
                    <Button className="btn-round" color="secondary" onClick={toggleDelete}>Cancel</Button>
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
                       
                         : 
                             <Card style={{ maxWidth: "100%", minWidth: "100%", marginTop: '30px', borderColor: 'transparent' }} >

                                  {/* Add Blog-*/}
                                  {openAdd|| edit ? (
                                <CardBody>
                                    
                                        <>
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
                                            <Label htmlFor="exampleFormControlInput1">Title</Label>
                                            <Input disabled={loading}  type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} id="exampleFormControlInput1" placeholder="Title" />
                                            {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
                                        </div>
                                        <div className="form-group">
                                            <Label htmlFor="exampleFormControlTextarea1">Content</Label>

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
                                            <Label htmlFor="exampleFormControlFile1">Image</Label>
                                            <Input disabled={loading} type="file" className="form-control-file" id="exampleFormControlFile1" onChange={handleFileInput} value={image} />
                                            {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                                        </div>
                                        {preview && (<div className="form-group">
                                            <img src={preview} alt="blog" style={{ width: '200px', height: '200px' }} />
                                        </div>)}
                                        </>
                                        )}
                                        <div className="form-group d-flex justify-content-end">
                                         <Button className="btn btn-secondary btn-md btn-round" onClick={saveToDraft}>
                                            {draftLoading ? <Spinner style={{width:20,height:20}} color="light" /> : 'Save to Draft'}
                                         </Button>
                                        <Button className="btn btn-primary btn-md btn-round ml-3" onClick={edit? editBlog:addBlog}>
                                            {/* {edit ? 'Edit Blog' : 'Post Blog'} */}
                                            {loading ? <Spinner style={{width:20,height:20}} color="light" /> : edit ? 'Edit Blog' : 'Post Blog'}
                                        </Button>
                                        </div>
                                    </Form>
                                        </>
                                    
                                </CardBody>
                            ) : (
                                // Table of Blogs 
                                
                                <CardBody>
                                <CardHeader className="d-flex justify-content-between">
                                    <h5 className="title">Posts</h5>
                                    <Button className="btn btn-primary btn-md btn-round mt-1"  onClick={() => setOpenAdd(!openAdd)}>Add Blog</Button>
                            
                                </CardHeader>
                                <TabView>
                                    <TabPanel header={`Posts ${tc(blogs?.length,{digits: 1, uppercase: false})}`} leftIcon="pi pi-fw pi-book">
                                {blogs.length===0 ? (
                                   <DataTable value={Array.from({ length: 5 }, (v, i) => i)} showGridlines  header={header} filters={filters} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} paginatorLeft filterIcon>
                                        <Column field="S.No" header="S.No" body={bodyTemplate} />
                                        <Column field="title" header="Title" sortable body={bodyTemplate} />
                                        <Column field="createdAt" header="Date" body={bodyTemplate} sortable/>
                                        <Column header="Actions" body={bodyTemplate}/>
                                    </DataTable>
                                ) :
                                  
                                    <>
                                    <DataTable value={blogs} showGridlines  header={header} filters={filters} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} paginatorLeft filterIcon>
                                        <Column field="S.No" header="S.No" body={(e) => blogs.indexOf(e) + 1} />
                                        <Column field="title" header="Title" sortable />
                                        <Column field="createdAt" header="Date" body={(e) => moment(e.createdAt).format('DD-MM-YYYY')} sortable/>
                                        <Column header="Actions" body={(e) => (
                                            <>
                                                <Button className="btn btn-primary btn-sm mr-2 btn-round mt-1" onClick={() => {
                                                    setViewBlog(!viewBlog)
                                                    localStorage.setItem("blogId", e._id)
                                                }}><i className="pi pi-eye"  style={{ fontSize: '1.2rem'}}/></Button>
                                                <Button className="btn btn-warning btn-sm mr-2 btn-round mt-1"
                                                    onClick={async () => {
                                                        setEdit(!edit)
                                                        setBlogId(e._id)
                                                        getBlogForEdit(e._id)
                                                    }
                                                    }
                                                ><i className="pi pi-pencil" style={{ fontSize: '1.2rem'}}/></Button>
                                                <Button className="btn btn-danger btn-sm btn-round mt-1" onClick={() => {
                                                    toggle()
                                                    setBlogId(e._id)
                                                }}><i className="pi pi-trash" style={{ fontSize: '1.2rem'}}/></Button>
                                            </>
                                        )}/>
                                    </DataTable>
                                    </>
                                    }
                                    </TabPanel>
                                    <TabPanel header={`Drafts ${drafts?.length}`}  leftIcon="pi pi-fw pi-paperclip">
                                    <DataTable value={drafts} showGridlines  header={header} filters={filters} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} paginatorLeft filterIcon>
                                        <Column field="S.No" header="S.No" body={(e) => drafts.indexOf(e) + 1} />
                                        <Column field="title" header="Title" sortable />
                                        <Column field="createdAt" header="Date" body={(e) => moment(e.createdAt).format('DD-MM-YYYY')} sortable/>
                                        <Column header="Actions" body={(e) => (
                                            <>
                                            {/* View the blog */}
                                                <Button className="btn btn-success btn-sm mr-2 btn-round mt-1" onClick={() => {
                                                    setViewBlog(!viewBlog)
                                                    localStorage.setItem("blogId", e._id)
                                                }}><i className="pi pi-eye"  style={{ fontSize: '1.2rem'}}/></Button>

                                            {/* Edit the blog */}
                                                <Button className="btn btn-warning btn-sm mr-2 btn-round mt-1"
                                                    onClick={async () => {
                                                        setEdit(!edit)
                                                        setBlogId(e._id)
                                                        getBlogForEdit(e._id)
                                                    }
                                                    }
                                                ><i className="pi pi-pencil" style={{ fontSize: '1.2rem'}}/></Button>

                                            {/* Move the blog to trash */}
                                                <Button className="btn btn-danger btn-sm btn-round mt-1" onClick={() => {
                                                    toggle()
                                                    setBlogId(e._id)
                                                }}><i className="pi pi-trash" style={{ fontSize: '1.2rem'}}/></Button>
                                            </>
                                        )}/>
                                    </DataTable>
                                    </TabPanel>
                                    <TabPanel header={`Trash ${trashs?.length}`}  leftIcon="pi pi-fw pi-trash">
                                    <DataTable value={trashs} showGridlines  header={header} filters={filters} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} paginatorLeft filterIcon>
                                        <Column field="S.No" header="S.No" body={(e) => trashs.indexOf(e) + 1} />
                                        <Column field="title" header="Title" sortable />
                                        <Column field="createdAt" header="Date" body={(e) => moment(e.createdAt).format('DD-MM-YYYY')} sortable/>
                                        <Column header="Actions" body={(e) => (
                                            <>
                                                
                                                {/* Restore the blog to draft */}
                                                <Button className="btn btn-success btn-sm mr-2 btn-round mt-1" onClick={() => {
                                                    // toggleRestore()
                                                    setBlogId(e._id)
                                                }}><i className="pi pi-refresh"  style={{ fontSize: '1.2rem'}}/></Button>

                                                
                                                {/* Delete the blog */}

                                                <Button className="btn btn-danger btn-sm btn-round mt-1" onClick={() => {
                                                    toggleDelete()
                                                    setBlogId(e._id)
                                                }}><i className="pi pi-trash" style={{ fontSize: '1.2rem'}}/></Button>
                                            </>
                                        )}/>
                                    </DataTable>
                                    </TabPanel>
                                </TabView>
                            </CardBody>
                            )}
                            </Card>        
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
