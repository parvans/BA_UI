import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Input } from 'reactstrap'
import AddIcon from '@mui/icons-material/Add';
export default function MyChats() {
  return (
    <Col md="4">
        <Card className="card-user">
              <CardHeader style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <h3 className="mt-1">My Chats</h3>
                <div style={{display:"flex",flexDirection:"column"}}>
                  <Button className="btn btn-primary btn-sm  mt-2 ml-4 btn-round">
                    <AddIcon /> Group
                  </Button>
                </div>
                
              </CardHeader>
            <CardBody>
            </CardBody>
        </Card>

    </Col>
  )
}
