import React, { Component } from 'react';
import Header from "./Header";
import axios from "axios";



class CreateCourse extends Component {

  constructor(props) {
    super(props);
    this.state={
      user:[],
      title:'',
      description:'',
      estimatedTime:'',
      materialsNeeded: '',

      // emailAddress:'',
      // password:''

    }
    this.onChange = this.onChange.bind(this);

  }

  // onAuthenticate(){
  //   const localusername = localStorage.getItem('username')
  //   const localpassword = localStorage.getItem('password')

  //   this.setState({
  //     emailAddress:localusername,
  //     password: localpassword
  //   })
   // console.log(this.state);
  // }


    onChange (text) {
      this.setState({ 
        [text.target.name]: text.target.value
      });
      
    }

    handleSubmit = () => {
      const localusername = localStorage.getItem('username')
      const localpassword = localStorage.getItem('password')
      const localuser = localStorage.getItem('user')
       let body = {
        // "password": localpassword, 
        // "emailAddress": localusername,
         "user":localuser._id,
         "title":this.state.title,
         "description": this.state.description,
         "estimatedTime":this.state.estimatedTime,
         "materialsNeeded":this.state.materialsNeeded
        }
       console.log(localusername)
       console.log(localpassword)

     // this.props.makeCourse(body)

        axios({	
          method:'POST',
          url: "http://localhost:5000/api/courses", 
          auth:
              {
                  username: `${localusername}`,
                  password: `${localpassword}`,
              },
          data: body
          })  
          .then(function(response){
            //debugger;
            const user = response.data;
            console.log(user);
            alert(localusername +", your course has been succesfully created")
            if(response.status === 201){
              window.location.href = "/"
            } else if ( response.status === 500){
             // e.preventDefault()
            }
            
          }) 
    
        

    //   const course ={
    //     user: this.state.user,
    //     title: this.state.title,
    //     description: this.state.description,
    //     estimatedTime: this.state.estimatedTime,
    //     materialsNeeded: this.state.materialsNeeded
    // }

  }


      
    

    render () {
      const localData = JSON.parse(localStorage.getItem('user'))
        return (
            <div>
              <Header/>
            
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
                      <form onSubmit = {this.handleSubmit}>
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
                        <div className="grid-100 pad-bottom"><button className="button" type="submit" >Create Course</button><button className="button button-secondary" href="/">Cancel</button></div>
                      </form>
                    </div>
                  </div>
                </div>
          );
    }

}

export default CreateCourse;