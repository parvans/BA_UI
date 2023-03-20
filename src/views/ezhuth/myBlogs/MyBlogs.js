import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'

export default function MyBlogs() {
  return (
    <div className="content">
        <Row>
            <Col md="12">
                <Card>
                    <CardHeader>
                        <h5 className="title">Paper Table Heading</h5>
                        <p className="category">Created using Montserrat Font Family</p>
                    </CardHeader>
                    <CardBody>
                        <h1>
                            <span>Header 1</span>
                            The Life of Paper Dashboard
                        </h1>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
    </div>
  )
}
