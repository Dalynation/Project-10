import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import axios from "axios";
import Header from "./Header";
import PrivateRoute from "./PrivateRoute";

class Courses extends Component {

  //neccesary state to get and store course data
constructor(props) {
 super(props) 
  this.state = {
      courses:[], 
      user:[]
   
  }
}

// once the component is mounted the a get request will be sent to return course data
      componentDidMount() {
        axios.get('http://localhost:5000/api/courses')
          .then(res =>  {
            const course = res.data; //course data is stored in a course variable
            
            this.setState({
              courses: course,
              user: course.user
            })      
          })
        }


        //this function sends an alert and redirects the user to the signin page
         pleaseSigin(){
           alert("You must be signed to access and view courses.")
           window.location.href=("/signin")
         }


    render () {
 
      const localData = JSON.parse(localStorage.getItem('user')) //

      if (localData){ //if the user exist in local starage render the regular page mapped for course data else render private route
        return (
          <div>
          <Header/>
            <div className="bounds">
            
                  {
                    this.state.courses.map(course => (
                      <div key={course._id}>
                      <div className="grid-33"><NavLink to= {`courses/${course._id}`} className="course--module course--link" >  
                      <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                      
                      </NavLink></div>
                      </div>
                  ))
                }
              <div className="grid-33"><a className="course--module course--add--module" href="create-course">
                  <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                      <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                    </svg>New Course</h3>
                </a></div>
            </div>
            </div>
        );
       } else { //
        return (
          <PrivateRoute/>
            
        );
       }
    }
  }


export default Courses;