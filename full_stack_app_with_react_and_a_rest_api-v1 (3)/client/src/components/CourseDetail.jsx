import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Header from "./Header";
import axios from "axios";

class CourseDetail extends Component {
    constructor(props) {
        super(props) 
         this.state = {
        course: [], //
        user:[] //
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

 componentDidMount() {
  //  const {match: {params} } = this.props
const cID= this.props.match.params.id; //
  axios.get(`http://localhost:5000/api/courses/${cID}`) //
    .then(res => {
        const courseInfo = res.data; //
        this.setState({
            course :courseInfo, //
            user: courseInfo.user //
        })
    })
    
}

handleDelete() {
  const localusername = localStorage.getItem('username')
  const localpassword = localStorage.getItem('password')
  
  const cID= this.props.match.params.id;
  axios({
    method:'DELETE',
    url:`http://localhost:5000/api/courses/${cID}`,
    auth:
              {
                  username: `${localusername}`,
                  password: `${localpassword}`,
              }
  })
  .then(window.location = "/" )
}
  
  render () {
    
     console.log(this.state.course)
     console.log(this.state.user)
     //
     const cID= this.props.match.params.id;
     const courseData = this.state.course;
     const userData = this.state.user;
    //
        return (
                  <div>
                    <Header/>
                    <div className="actions--bar">
                      <div className="bounds">
                        <div className="grid-100"><span><a href={`/courses/${cID}/update`} className="button" >Update Course</a><a className="button" onClick={this.handleDelete}>Delete Course</a></span><a className="button button-secondary" href="/">Return to List</a></div>
                      </div>
                    </div>
                   
                    <div className="bounds course--detail">
                    
                      <div className="grid-66">
                        <div className="course--header">
                          <h4 className="course--label">Course</h4>
                          
                          <h3 className="course--title">
                           {courseData.title}   
                          </h3>
                          
                           
                          <p>By {userData.firstName} {userData.lastName}</p> 
                        </div>
                        
                        <div className="course--description">
                        {this.state.course.description}
                        </div>
                      </div>
                    
                      <div className="grid-25 grid-right">
                        <div className="course--stats">
                          <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                              <h4>Estimated Time</h4>
                              <h3>
                              {courseData.estimatedTime}
                                </h3>
                            </li>
                            <li className="course--stats--list--item">
                              <h4>Materials Needed</h4>
                              <ul>
                              {courseData.materialsNeeded}
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
     
                    </div>
                   
                  </div>

       );
         
    }

}

export default CourseDetail;