import React from 'react';
import TableContainer from './TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
// import CustomCard from '../Card';
import { CContainer } from '@coreui/react';
import "./table.css";
import { Card } from 'reactstrap';
const CustomTable = (props) => {
  const {data,columns,onClick}=props
  return (
    // <Card  style={{maxWidth:"100%",minWidth:"100%",marginTop:'30px',borderColor:'transparent'}} >
      <CContainer  style={{padding:'5px',maxWidth:"100%"}}>
        <TableContainer
          columns={columns}
          data={data?(data):(()=>{
            console.log("no data");
          })}
         
          onClick={onClick}
        /> 
        
        
      </CContainer>
    // </Card>
  );
};

export default CustomTable;