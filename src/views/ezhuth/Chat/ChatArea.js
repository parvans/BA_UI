import { Divider } from "@mui/material";
import ChatBox from "components/miscellaneous/ChatBox";
import MyChats from "components/miscellaneous/MyChats";
import { ChatState } from "context/ChatProvider";
import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

export default function ChatArea() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = React.useState(false);

  return (
    <div className="content">
      <Row>
        {/* {user&& <MyChats/>}
                {user&& <ChatBox/>} */}

        <Col md="12">
          <Card>
            <CardBody>
              <Row>
                <Col md="4">
                  {/* <MyChats/> */}
                  <h1>mychat</h1>
                </Col>
                <Col md="8">
                  {/* <MyChats/> */}
                  <h1>chatbox</h1>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
