import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import notfound from "assets/img/notfound404.png";
const NotFound = () => (
//   <div className="Container">
//     {/* <h1>404 - Not Found!</h1>
//     <Link to="/ezhuth/home">Go Home</Link> */}
//     <div className="row">
//       <div className="col-md-12">
//         <div className="justify-content-center">
//           <h1>Oops!</h1>
//           <h2>404 Not Found</h2>
//           <div className="error-details">
//             Sorry, an error has occured, Requested page not found!
//           </div>
//           <div className="error-actions">
//             <Link to="/ezhuth/home" className="btn btn-primary btn-lg">
//               <span className="glyphicon glyphicon-home"></span>
//               Take Me Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
<div className="content">
    <Row className="justify-content-center">
        <Col md="12 text-center">
            <div className="justify-content-center">
                {/* <h1>Oops!</h1>
                <div className="error-details">
                    Sorry, an error has occured, Requested page not found!
                </div> */}
                <img src={notfound} alt="nodata" width={500} height={500} />
            </div>
        </Col>
    </Row>
</div>
);

export default NotFound;
