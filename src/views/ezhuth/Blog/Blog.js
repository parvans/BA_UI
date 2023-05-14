import { Image } from 'cloudinary-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardText, Col, Row } from 'reactstrap'
import { getABlog } from 'utilities/apiService';

export default function Blog(props) {
    const {blog,setBlog}=props;
    const blogId=localStorage.getItem("blogId");
    const [data,setData]=useState(null);
    const [content,setContent]=useState('');
    const getBlog=async()=>{
        try {
            const res=await getABlog(blogId);
            console.log(res?.data);
            if(res?.ok){
                setData(res?.data);
                setContent(res?.data?.blog?.description);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBlog();
    }, [])
  return (
    <div className="content">
        <Row>
            <Col md="12">
                <Card style={{ maxWidth: "100%", minWidth: "100%", marginTop: '30px', borderColor: 'transparent' }} >
                    <CardBody >
                        <CardHeader className="d-flex justify-content-between">
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
                                backgroundColor: '#e9ecef'
                                

                            }}
                            onClick={() => {
                                setBlog(false)
                                localStorage.removeItem("blogId")}}
                            />  
                            </div>
                            <CardText style={{ fontSize: '20px', fontWeight: 'bold' }}>{data?.blog?.title}</CardText>
                            <CardText style={{ fontSize: '15px', fontWeight: 'bold' }}>{moment.utc(data?.blog?.date).format("DD-MM-YYYY")}</CardText>
                            
                        </CardHeader>
                        <Image cloudName="dgupyenrw" publicId={data?.blog?.image} style={{ height: "300px", width: "100%" }} />
                        <CardText 
                        dangerouslySetInnerHTML={{__html:content}}
                        style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold' }}
                        ></CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
  )
}
