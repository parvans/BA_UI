import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'

export default function ChatArea() {
  return (
    <div className="content">
        <Row>
            <Col md="4">
                <Card>
                    <CardBody>
                        <div className="card-title">Chat</div>
                        <hr/>
                        <div className="messages">
                            {/* <Message/> */}
                            <div className="message">
                                <div className="message-content">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                                </div>
                                <div className="message-time">10:12 PM | 12/12/2020</div>
                                <div className="message-content">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                                </div>
                                <div className="message-time">10:12 PM | 12/12/2020</div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col md="8">
                <Card>
                    <CardBody>
                        <div className="card-title">Chat</div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
  )
}
