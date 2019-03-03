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

 
  
class App extends Component {

  render() {
 

    return (
      <BrowserRouter>

        <div>
          <Switch>
            <Route exact path = "/" component={Courses} />
            <Route exact path = "/sign-up" component={Signup} />
            <Route exact path = "/sign-in" component={Signin} />
            <Route exact path = "/course-detail" component={CourseDetail} />
            <Route exact path = "/create-course" component={CreateCourse} />
          </Switch>
        </div>

      </BrowserRouter>
    );
    }
  }


export default App;
