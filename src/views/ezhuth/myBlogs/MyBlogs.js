import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap'
import { getMyBlogs } from 'utilities/apiService'
export default function MyBlogs() {
    const [blogs, setBlogs] = useState()
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
    useEffect(() => {
        getBlogs()
    }, [blogs])
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card style={{ maxWidth: "100%", minWidth: "100%", marginTop: '30px', borderColor: 'transparent' }} >
                        <CardBody>
                            <CardHeader>
                                <h5 className="title">My Blogs</h5>
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
                                                <button className="btn btn-success btn-sm mr-2" onClick={() => window.location.href = `/ezhuth/view-blog/${blog?._id}`}>View</button>
                                                <button className="btn btn-warning btn-sm mr-2" onClick={() => window.location.href = `/ezhuth/edit-blog/${blog?._id}`}>Edit</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => window.location.href = `/ezhuth/delete-blog/${blog?._id}`}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
