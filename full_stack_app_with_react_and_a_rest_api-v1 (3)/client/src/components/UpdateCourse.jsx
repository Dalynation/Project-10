import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Header from "./Header";
import axios from "axios";
import ReactMarkdown from 'react-markdown'

class UpdateCourse extends Component {

  //I require the title and description states to help with validation
  constructor(props) {
    super(props) 
     this.state = {
    course: [], //
    title:'',
    description:''

    }
}

// this is where I get course info to display unique course data on the page.
componentDidMount() {
const cID= this.props.match.params.id; //
axios.get(`http://localhost:5000/api/courses/${cID}`) //
.then(res => {
    const courseInfo = res.data; //
    this.setState({
        course :courseInfo,//
        title:courseInfo.title,
        description:courseInfo.description
    })
});
}
//--------------------------------------------------------------

//function for record input values
handleChange = event => {
  this.setState({ [event.target.name]: event.target.value});
  console.log(event.target.title)
}

//this function edits a course
handleSubmit = event => {
  //this validates to make sure the title and description isn't empty note:"try backspacing"
  if(this.state.title <= 2 || this.state.description <= 2 ){//
    alert ("Please do not update course without a title or description.")
} else {
 
  // I ame geting the credential to store them in a variable to use it to authenticate to edit the route
  const localusername = localStorage.getItem('username')
  const localpassword = localStorage.getItem('password')

  const course ={
    title: this.state.title,
    description: this.state.description,
    estimatedTime: this.state.estimatedTime,
    materialsNeeded: this.state.materialsNeeded
}
  const cID= this.props.match.params.id;
axios({
    method:'PUT',
    url:`http://localhost:5000/api/courses/${cID}`,
    auth:
                  {
                      username: `${localusername}`,
                      password: `${localpassword}`,
                  },
              data: course
})
// once axios is completed the user will be redirected
.then( res => {console.log(res.data)
  window.location.href=`/courses/${cID}`
  })
}

}
  render () {
    const cID= this.props.match.params.id;
    const courseData = this.state.course;
    console.log(courseData)

    // this render my update course page
return (
    <div>
      <Header/>
          <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
              {/* <form> */}
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" 
                    onChange = {this.handleChange} placeholder="Course title..." defaultValue={courseData.title} /></div>
                    <p>By Joe Smith</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" 
                    onChange = {this.handleChange} placeholder="Course description..." defaultValue={courseData.description} /></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" 
                        onChange = {this.handleChange} placeholder="Hours" defaultValue={courseData.estimatedTime} /></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" 
                        onChange = {this.handleChange} placeholder="List materials..." defaultValue={courseData.materialsNeeded} /></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick = {this.handleSubmit}>Update Course</button><NavLink to={`/courses/${cID}`}><button className="button button-secondary" >Cancel</button></NavLink></div>
              {/* </form> */}
            </div>
          </div>
        </div>
  );

  }

}
  export default UpdateCourse;