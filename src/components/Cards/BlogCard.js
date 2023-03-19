import moment from 'moment/moment'
import React from 'react'

export default function BlogCard(props) {
    const { title, description, image, author, date } = props
    return (
        <div className="card card-blog">

            <div className="card-header card-header-image">
                <div className="author">
                    <div className='row'>
                        <div className='col-2' style={{ marginTop: "10px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img src={require("assets/img/mike.jpg")} alt="auther" className="avatar img-raised"style={{height:"50%",width:"100%",borderRadius:"50%"}} />
                            </a>
                        </div>
                        <div className='col-10' style={{ marginTop: "10px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <span style={{ fontSize: "1.1rem", fontWeight: "bold"}}>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                    {author}
                                </a>

                                <p className="text-muted" style={{ fontSize: "0.8rem", marginTop: "0px" }}>
                                    {moment.utc(date).fromNow()}
                                </p>
                            </span>

                        </div>
                    </div>

                </div>
                <div className="card-body">
                <h4 className="card-title">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                        {title}
                    </a>
                </h4>
                <p>
                    {description.length > 200 ? description.substring(0, 200) + "..." : description}
                </p>
            </div>
                {image&&<a href="#pablo" onClick={e => e.preventDefault()} >
                    <img className="img" src={image} style={{ height: "300px", width: "100%"}} />
                </a>}
                {/* <div className="colored-shadow" style={{ backgroundImage: `url(${image})`, opacity: 1 }} /> */}
            </div>

            
            
        </div>
    )
}

// moment.utc(date).utcOffset("+05:30").format("DD MMM YYYY") output: 12 Dec 2019
//moment.utc(date).fromNow() output: 2 months ago
