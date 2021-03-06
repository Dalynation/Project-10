import React, { Component } from 'react';
//import axios from "axios";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// importing the css
import "./styles/global.css"; 

//import the react components
import Courses from "./components/Courses";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import axios from 'axios';
import signout from "./components/Signout"

 
  
class App extends Component {
// this function authenticates the user with user credentials
  getUser = (body) => { 
    // a get request is send to return user data, store that data, while also storing user credentials
    axios({	
      method:'GET',
      url: "http://localhost:5000/api/users", // 
      auth:
          {
              username: body.emailAddress,
              password: body.password,
          }
      })  
      .then(function(response){
       // debugger;
        const user = response.data;
        console.log(user);
        alert("Welcome " + response.data[0].firstName)
        localStorage.setItem("user", JSON.stringify(user) );//
        localStorage.setItem("username", body.emailAddress );//
        localStorage.setItem("password", body.password );//
         window.location.href = "/"//
      })
      
    }


    
  render() { //these are all my route assicated with my react app
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path = "/" component={Courses} />
            <Route exact path = "/signup" component={Signup} />
            <Route path = "/signin" component={() => <Signin getUser={this.getUser}/>} />
            <Route exact path = "/signout" component={signout} />
            <Route exact path = "/courses/:id" component={CourseDetail} />
            <Route exact path = "/create-course" component={() => <CreateCourse makeCourse={this.makeCourse}/>} />
            <Route exact path = "/courses/:id/update" component={UpdateCourse} />
          </Switch>
        </div>

      </BrowserRouter>
    );
    }
  }


export default App;
