import React, { Component } from 'react';
import Header from "./Header";
import axios from "axios";
import {NavLink} from 'react-router-dom'



class CreateCourse extends Component {

  //these state are whats neccesary for my to create a course
  constructor(props) {
    super(props);
    this.state={
      user:[],
      title:'',
      description:'',
      estimatedTime:'',
      materialsNeeded: '',
      validation:''


    }
    this.onChange = this.onChange.bind(this);//

  }

    // function that targets input values for all text field, and help me link values with state.
    onChange (text) {
      this.setState({ 
        [text.target.name]: text.target.value
      });
      
    }

    //this function sends a post request to create the course
    handleSubmit = () => {
      // if the title and description exist then comence axios post
      if(this.state.title && this.state.description ){//
      const localusername = localStorage.getItem('username')
      const localpassword = localStorage.getItem('password')
      const localuser = localStorage.getItem('user')
       let body = {
      
         "user":localuser._id,
         "title":this.state.title,
         "description": this.state.description,
         "estimatedTime":this.state.estimatedTime,
         "materialsNeeded":this.state.materialsNeeded
        }
       console.log(localusername)
       console.log(localpassword)

    

        axios({	//
          method:'POST',
          url: "http://localhost:5000/api/courses", 
          auth:
              {
                  username: `${localusername}`,
                  password: `${localpassword}`,
              },
          data: body
          })  // once course has been created the user will be directed to the home page
          .then(function(response){
           
            const user = response.data;
            console.log(user);
            alert("The account " + localusername + " has succesfully created a course")
            
              window.location.href = "/"  
          }).catch(error => {
            this.setState({
             errors: error.response.data.error.message
           })
          }) 
        } else {
         this.setState ({
           validation: <div>
           <h2 className="validation--errors--label">Validation errors</h2>
           <div className="validation-errors">
             <ul>
               <li>Please provide a value for "Title"</li>
               <li>Please provide a value for "Description"</li>
             </ul>
           </div>
         </div>
         })
         }
         
  }


      
    
  //this renders the create course page
    render () {
      const localData = JSON.parse(localStorage.getItem('user'))
      if (localData) {
        return (
            <div>
              <Header/>
            
                  <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>
                      {this.state.validation}
                      {/* <form onSubmit = {this.handleSubmit}> */}
                        <div className="grid-66">
                          <div className="course--header">
                            <h4 className="course--label">Course</h4>

                            <div><input id="title" name="title" type="text" 
                            className="input-title course--title--input"
                            placeholder="Course title..." 
                            onChange = {this.onChange}
                             /></div>
                            <p>By {localData[0].firstName} {localData[0].lastName}</p>
                          </div>

                          <div className="course--description">
                            <div><textarea id="description" 
                            name="description" 
                            className = "true"
                            placeholder="Course description..." 
                            onChange = {this.onChange}
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
                                placeholder="Hours" 
                                onChange = {this.onChange}
                                /></div>
                              </li>

                              <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <div><textarea id="materialsNeeded" 
                                name="materialsNeeded" 
                                className = "true"
                                placeholder="List materials..." 
                                onChange = {this.onChange}
                               /></div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick = {this.handleSubmit} >Create Course</button><NavLink to= "/"><button className="button button-secondary" >Cancel</button></NavLink></div>
                      {/* </form> */}
                    </div>
                  </div>
                </div>
          );
        } else {
          return (
            <div>
              <Header/>
              <h2>This route is private</h2>
              </div>
             
          );
        }
    }

}

export default CreateCourse;