import React, { Component } from 'react';
import axios from "axios";
import Header from "./Header";

//
class PrivateRoute extends Component {
    constructor(props) {
        super(props) 
         this.state = {
             courses:[], 
             user:[]
           
         }
       }
  
    componentDidMount() {
        axios.get('http://localhost:5000/api/courses')
          .then(res =>  {
            const course = res.data; //
            
            this.setState({
              courses: course,
              user: course.user
            })

          })


        }

         pleaseSigin(){
           alert("You must be signed to access and view courses.")
           window.location.href=("signin")
         }

         pleaseSigin2(){
          alert("You must be signed to created a course.")
          window.location.href=("signin")
        }
        


    render () {
 
     
        return (
          <div>
          <Header/>
            <div className="bounds">
            
                  {
                    this.state.courses.map(course => (
                      <div key={course._id}>
                      <div className="grid-33"><div onClick={this.pleaseSigin} className="course--module course--link" >  
                      <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                      
                      </div>
                      </div>
                      </div>
                  ))
                }
              <div className="grid-33"><a className="course--module course--add--module"  onClick={this.pleaseSigin2}>
                  <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                      <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                    </svg>New Course</h3>
                </a></div>
            </div>
            </div>
            
        );
       }
    }

export default PrivateRoute;