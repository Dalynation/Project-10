import React, { Component } from 'react';
import Header from "./Header";
import axios from "axios";
import {NavLink} from 'react-router-dom';
class CourseDetail extends Component {

  //these are the appropiate states to display the correct data
    constructor(props) {
        super(props) 
         this.state = {
        course: [], //the course will be store in state
        user:[] //the user will be store in state
        }
        this.handleDelete = this.handleDelete.bind(this);//the delete funtion is binded to my constructor
    }

 componentDidMount() {
  //  const {match: {params} } = this.props
const cID= this.props.match.params.id; //this get the id of the spefic course
  axios.get(`http://localhost:5000/api/courses/${cID}`) //a get request will be sent to the course's unique link
    .then(res => {
        const courseInfo = res.data; //course data is stored here
        this.setState({
            course :courseInfo, 
            user: courseInfo.user //the user array in the course data is stored her
        })
    })
    
}

//this function allows me to delete a course
handleDelete() {
  //the username and password from local storage is stored in these varibles
  const localusername = localStorage.getItem('username')
  const localpassword = localStorage.getItem('password')
  
  const cID= this.props.match.params.id;//specific course id

  //a delete request is sent then sends the user to the home page
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
    
     
     //Here I am rendering the page for course details
     const cID= this.props.match.params.id;
     const localData = JSON.parse(localStorage.getItem('user'))
     const courseData = this.state.course;
     const userData = this.state.user;

    if (userData._id === localData[0]._id){ //
        return (
                  <div>
                    <Header/>
                    <div className="actions--bar">
                      <div className="bounds">
                        <div className="grid-100"><span><NavLink to={`/courses/${cID}/update`} className="button" >Update Course</NavLink><a className="button" onClick={this.handleDelete}>Delete Course</a></span><a className="button button-secondary" href="/">Return to List</a></div>
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
     } else { //
      return (
        <div>
          <Header/>
          <div className="actions--bar">
            <div className="bounds">
              <a className="button button-secondary" href="/">Return to List</a>
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

}

export default CourseDetail;