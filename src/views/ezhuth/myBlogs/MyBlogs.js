// import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
// import { getAllBlogs } from 'utilities/apiService'
export default function MyBlogs() {
    // let theData= async()=>{
    //     try {
    //         let res=await getAllBlogs()
    //         let arr=[]
    //         // eslint-disable-next-line array-callback-return
    //         res?.data?.data?.map((item,index)=>{
    //             arr.push({
    //                 title:item.title,
    //                 date:moment(item.createdAt).format('DD-MM-YYYY'),
    //                 actions:(<div style={{
    //                     display: "flex",
    //                     justifyContent: "space-evenly",
    //                     alignItems: "center",
    //                     marginTop: "10px",
    //                   }}>
    //                     <IconContext.Provider value={{ color: "green", size: "20px" }}>
    //                     <HiPencilSquare
    //                     style={{ cursor: "pointer" }}
    //                     size={20}
    //                     // onClick={() => {
    //                     //   setUserUpId(item._id);
    //                     //   setUserUpOpen(true);
    //                     // }}
    //                     />
    //                     </IconContext.Provider>
    //                     <IconContext.Provider value={{ color: "#000", size: "1.1rem" }}>
    //                     <FaEye
    //                     style={{ cursor: "pointer" }}
    //                     size={20}
    //                     // onClick={() => {
    //                     //   setUserUpId(item._id);
    //                     //   setUserUpOpen(true);
    //                     // }}
    //                     />
    //                     </IconContext.Provider>
    //                 </div>)
    //             })
    //         })
    //         setData(arr)
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    // useEffect(() => {
    //     theData()
    // }, [])

  return (
    <div className="content">
        <Row>
            <Col md="12">
                <Card style={{maxWidth:"100%",minWidth:"100%",marginTop:'30px',borderColor:'transparent'}} >
                    <CardBody>
                    <CardHeader>
                        <h5 className="title">Paper Table Heading</h5>
                        <p className="category">Created using Montserrat Font Family</p>
                    </CardHeader>
                        
                        </CardBody>
                    </Card> 
                </Col>
            </Row>
    </div>
  )
}
