import BlogCard from "components/Cards/BlogCard";
import React, { useEffect, useState } from "react";
// react plugin used to create charts
// import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  // Card,
  // CardHeader,
  // CardBody,
  // CardFooter,
  // CardTitle,
  Row,
  Col,
} from "reactstrap";
import { getAllBlogs } from "utilities/apiService";
import Blog from "./ezhuth/Blog/Blog";
// core components
// import {
//   dashboard24HoursPerformanceChart,
//   dashboardEmailStatisticsChart,
//   dashboardNASDAQChart
// } from "variables/charts.js";
import CardSkeleton from "components/Skeletons/CardSkeleton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(false);
  const [loading, setLoading] = useState(true);
  const allBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setBlogs(response?.data?.data);
      console.log(blog);
    } catch (error) {
      console.log(error);
    }
  };

  const randoms = Array.from({ length: 5 }, (v, i) => i);
  const history = useHistory();
  useEffect(() => {
    allBlogs();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="content">
      {!blog ? (
        <Row className="justify-content-center">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => {
              return (
                <Col md="8" key={index}>
                  <BlogCard
                    key={index}
                    title={blog.title}
                    image={blog.image}
                    author={blog.userId?.name}
                    date={blog.createdAt}
                    id={blog._id}
                    blog={blog}
                    setBlog={setBlog}
                    likes={blog.likes?.length}
                  />
                </Col>
              );
            })
          ) : loading ? (
            randoms.map((blog, index) => {
              return (
                <Col md="8" key={index}>
                  <CardSkeleton />
                </Col>
              );
            })
          ) : (
            <h3>No Blogs Found</h3>
          )}
        </Row>
      ) : (
        <Blog blog={blog} setBlog={setBlog} />
      )}
    </div>
  );
}

export default Dashboard;
