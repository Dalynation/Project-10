import React, { Component } from 'react';
import axios from "axios";
import Courses from './Courses';

class CourseDetail extends Component {

  state = {
    courseInfo:[]
  }

  componentDidMount() {
    
    
    const cID = this.props.match.params.id;
   
    axios.get(`http://localhost:5000/api/courses/${cID}`)
      .then(res => {
        const data = res.data;
        this.setState({
          courseInfo: data
        })
      })
  }
    render () {
        return (
            <div>
              <title>Courses</title>
              <div id="root">
                <div>
                  <div className="header">
                    <div className="bounds">
                      <h1 className="header--logo">Courses</h1>
                      <nav><span>Welcome Joe Smith!</span><a className="signout" href="index.html">Sign Out</a></nav>
                 </div>
                     </div>
                  <hr />
                  <div>
                    <div className="actions--bar">
                      <div className="bounds">
                        <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a className="button button-secondary" href="index.html">Return to List</a></div>
                      </div>
                    </div>
                    <div className="bounds course--detail">
                      <div className="grid-66">
                        <div className="course--header">
                          <h4 className="course--label">Course</h4>
                          <h3 className="course--title">
                          {/* /////////////////////////// */}
                          </h3>
                          <p>By Joe Smith</p> 
                        </div>
                        <div className="course--description">
                         {/* //////////////////////////////// */}
                        </div>
                      </div>
                      <div className="grid-25 grid-right">
                        <div className="course--stats">
                          <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                              <h4>Estimated Time</h4>
                              <h3>
                                {/* /////////////// */}
                                </h3>
                            </li>
                            <li className="course--stats--list--item">
                              <h4>Materials Needed</h4>
                              <ul>
                                {/* //////////////////////////////// */}
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
    }

}

export default CourseDetail;