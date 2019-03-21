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
  //here is where I get courses inorder to display the visual quantity I have mapped out in my render method
    componentDidMount() {
        axios.get('http://localhost:5000/api/courses')
          .then(res =>  {
            const course = res.data; 
            
            this.setState({
              courses: course,
              user: course.user
            })

          })


        }

         pleaseSigin(){
           alert("Please sign in to access and view courses.")
           window.location.href=("signin")
         }
        


    render () {
 
      //here is where I render the private route
        return (
          <div>
          <Header/>
            <div className="bounds">
            
                  {
                    this.state.courses.map(course => (
                      <div key={course._id}>
                      <div className="grid-33"><div onClick={this.pleaseSigin} className="course--module course--link" >  
                      <h4 >To view and access courses you must be signed in</h4>
                      
                      </div>
                      </div>
                      </div>
                  ))
                }
            </div>
            </div>
            
        );
       }
    }

export default PrivateRoute;