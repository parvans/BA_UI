import CustomTable from 'components/custom/Table'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { getAllBlogs } from 'utilities/apiService'
import {HiPencilSquare} from 'react-icons/hi2'
import {FaEye} from 'react-icons/fa'
export default function MyBlogs() {
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([
        {
            Header: 'SI No',
            id:"index",
            accessor: (row, index) => (
                <div style={{ textAlign: "center" }}>{index + 1}</div>
            )
        },
        {
            Header: 'Blog Title',
            accessor: 'title',
        },
        {
            Header: 'Date',
            accessor: 'date',
        },
        {
            Header: 'Actions',
            accessor: 'actions',
        },
    ])

    let theData= async()=>{
        try {
            let res=await getAllBlogs()
            let arr=[]
            // eslint-disable-next-line array-callback-return
            res?.data?.data?.map((item,index)=>{
                arr.push({
                    title:item.title,
                    date:moment(item.createdAt).format('DD-MM-YYYY'),
                    actions:(<div style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        marginTop: "10px",
                      }}>
                        <IconContext.Provider value={{ color: "green", size: "20px" }}>
                        <HiPencilSquare
                        style={{ cursor: "pointer" }}
                        size={20}
                        // onClick={() => {
                        //   setUserUpId(item._id);
                        //   setUserUpOpen(true);
                        // }}
                        />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ color: "#000", size: "1.1rem" }}>
                        <FaEye
                        style={{ cursor: "pointer" }}
                        size={20}
                        // onClick={() => {
                        //   setUserUpId(item._id);
                        //   setUserUpOpen(true);
                        // }}
                        />
                        </IconContext.Provider>
                    </div>)
                })
            })
            setData(arr)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        theData()
    }, [])

  return (
    <div className="content">
        <Row>
            <Col md="12">
                <Card style={{maxWidth:"100%",minWidth:"100%",marginTop:'30px',borderColor:'transparent'}} >
                    {/* <CardHeader>
                        <h5 className="title">Paper Table Heading</h5>
                        <p className="category">Created using Montserrat Font Family</p>
                    </CardHeader>*/}
                    <CardBody>
                        
                    <CustomTable
                        data={data}
                        columns={columns}
                        onClick={() => { }}
                    />
                        </CardBody>
                    </Card> 
                </Col>
            </Row>
    </div>
  )
}
