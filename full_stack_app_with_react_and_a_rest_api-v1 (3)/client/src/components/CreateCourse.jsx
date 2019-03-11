import React, { Component } from 'react';
import axios from "axios";



class CreateCourse extends Component {

  constructor(props) {
    super(props);
    this.state={
      courseName:'',
      courseDescription:'',
      courseTime:'',
      courseMaterials: ''

    }
  }

    onAddingNewCourse(e){
      this.setState({
      // [e.target.name]: e.target.value
        courseName:e.target.value,
        courseDescription:e.target.value,
        courseTime:e.target.value,
        courseMaterials:e.target.value
      });
    }


    onSubmit(e) {
      e.preventDefualt();
      const courseValues = {
        courseName : this.state.courseName,
        courseDescription : this.state.courseDescription,
        courseTime : this.state.courseTime,
        courseMaterials : this.state.courseMaterials
      }

      axios.post("/api/courses", courseValues)
      .then( res => console.log(res.data))
    }

    render () {

        return (
            <div>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              <link rel="shortcut icon" href="/favicon.ico" />
              <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500" rel="stylesheet" type="text/css" />
              <link href="https://fonts.googleapis.com/css?family=Cousine" rel="stylesheet" type="text/css" />
              <link href="../styles/global.css" rel="stylesheet" />
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
                  <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>
                      <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors">
                          <ul>
                            <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li>
                          </ul>
                        </div>
                      </div>
                      <form onSubmit = {this.onSubmit}>
                        <div className="grid-66">
                          <div className="course--header">
                            <h4 className="course--label">Course</h4>

                            <div><input id="title" name="title" type="text" 
                            className="input-title course--title--input"
                            value = {this.state.courseName}
                            onChange = {this.onAddingNewCourse}
                            placeholder="Course title..." 
                             /></div>
                            <p>By Joe Smith</p>
                          </div>

                          <div className="course--description">
                            <div><textarea id="description" 
                            name="description" 
                            className = "true"
                            value = {this.state.courseDescription}
                            onChange = {this.onAddingNewCourse}
                            placeholder="Course description..." 
                            /></div>
                          </div>
                        </div>

                        <div className="grid-25 grid-right">
                          <div className="course--stats">
                            <ul className="course--stats--list">
                              <li className="course--stats--list--item">

                                <h4>Estimated Time</h4>
                                <div><input id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                className="course--time--input" 
                                value = {this.state.courseTime}
                                onChange = {this.onAddingNewCourse}
                                placeholder="Hours" 
                                /></div>
                              </li>

                              <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <div><textarea id="materialsNeeded" 
                                name="materialsNeeded" 
                                className = "true"
                                value = {this.state.courseMaterials}
                                onChange = {this.onAddingNewCourse}
                                placeholder="List materials..." 
                               /></div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
    }

}

export default CreateCourse;