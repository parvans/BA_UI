import ChatBox from 'components/miscellaneous/ChatBox'
import MyChats from 'components/miscellaneous/MyChats'
import { ChatState } from 'context/ChatProvider'
import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'

export default function ChatArea() {
    const {user}=ChatState()
    const [fetchAgain,setFetchAgain]=React.useState(false)

  return (
    <div className="content">
            <Row>
                {user&& <MyChats/>}
                {user&& <ChatBox/>}
            </Row>
           
    </div>
  )
}
