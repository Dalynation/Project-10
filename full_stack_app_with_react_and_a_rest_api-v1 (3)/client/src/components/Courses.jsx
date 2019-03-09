import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import axios from "axios";

class Courses extends Component {
constructor(props) {
 super(props) 
  this.state = {
      courses:[], //
    //  loading: true
  }
}
      componentDidMount() {
        axios.get('http://localhost:5000/api/courses')
          .then(res =>  {
            const course = res.data; //
            
            this.setState({
              courses: course
            })
            console.log(res.data);
            // this.setState({course: data})
            // console.log({title: course.title});
          })


        }

         
        


    render () {

      //
        return (
          <div>
        <title>Courses</title>
        <div id="root">
          <div>
            <div className="header">
              <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav><a className="signup" href="sign-up">Sign Up</a><a className="signin" href="sign-in">Sign In</a></nav>
              </div>
            </div>
            <hr />
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
        </div>
      </div>
        );
    }
  }


export default Courses;