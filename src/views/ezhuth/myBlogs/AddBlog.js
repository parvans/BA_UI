import React from 'react'
import { Card, CardBody, CardHeader, Form } from 'reactstrap'

export default function AddBlog({setOpenAdd, openAdd}) {
    const toggle = () => {
        setOpenAdd(!openAdd)
    }
    return (
        <Card style={{ maxWidth: "100%", minWidth: "100%", marginTop: '30px', borderColor: 'transparent' }} >
            <CardBody>
            <CardHeader className="d-flex justify-content-between">
                <h5 className="title">Create Blogs</h5>
                <i className="nc-icon nc-minimal-left" onClick={toggle}/>           
                </CardHeader>

            <Form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Title</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Content</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Image</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </Form>
            </CardBody>
        </Card>
    )
}

