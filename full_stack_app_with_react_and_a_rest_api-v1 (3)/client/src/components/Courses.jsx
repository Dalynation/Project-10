import React, { Component } from 'react';
import axios from "axios";

class Courses extends Component {

  state = {
      course:[],
    //  loading: true
  }

      componentDidMount() {
        axios.get('http://localhost:5000/api/courses')
          .then(res =>  {
            const data = res.data;
            console.log(data);
            this.setState({
              course: data
            })
            // this.setState({course: data})
            // console.log({title: course.title});
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
                <nav><a className="signup" href="sign-up">Sign Up</a><a className="signin" href="sign-in">Sign In</a></nav>
              </div>
            </div>
            <hr />
            <div className="bounds">
              
                  
                 
                  {
                    this.state.course.map(data => (
                      <div key={data._id}>
                      <div className="grid-33"><a className="course--module course--link" href="course-detail/${cID}">
                      <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{data.title}</h3>
                      
                      </a></div>
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

  //   axios({	
//     method:'get',
//     url: "http://localhost:5000/api/courses", 
// }).then(function(response){
//     console.log(response.data);
// })

export default Courses;