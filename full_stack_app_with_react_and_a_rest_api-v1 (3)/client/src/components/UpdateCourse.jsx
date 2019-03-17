import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Header from "./Header";
import axios from "axios";


class UpdateCourse extends Component {
  constructor(props) {
    super(props) 
     this.state = {
    course: [], //

    }
}

componentDidMount() {
//  const {match: {params} } = this.props
const cID= this.props.match.params.id; //
axios.get(`http://localhost:5000/api/courses/${cID}`) //
.then(res => {
    const courseInfo = res.data; //
    this.setState({
        course :courseInfo //
    })
});
}
//--------------------------------------------------------------

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value});
}

handleSubmit = event => {
  //event.preventDefualt();
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
.then( res => {console.log(res.data)
  })

}
  render () {
    const cID= this.props.match.params.id;
    const courseData = this.state.course;
    console.log(courseData)
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