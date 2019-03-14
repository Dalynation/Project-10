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
import axios from 'axios';

 
  
class App extends Component {

  constructor(){
    super();
    this.state = {
      emailAddress:'',
      password:'',
  //     user:[]
    }
  //   //this.login = this.login.bind(this);
  //   this.onChange = this.onChange.bind(this);
  }


  // onChange(text){
  //   this.setState({[text.target.name]: text.target.value})
  //  // console.log(this.state);
  // }

  getUser = (body) => {
    axios({	
      method:'GET',
      url: "http://localhost:5000/api/users", 
      auth:
          {
              username: `${this.state.emailAddress}`,
              password: `${this.state.password}`
          }
      })  
      .then(function(response){
        const user = response.data;
        console.log(user);
        alert("Welcome " + response.data[0].firstName)
      })
    }
    
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path = "/" component={Courses} />
            <Route exact path = "/sign-up" component={Signup} />
            <Route exact path = "/sign-in" component={Signin} getUserText={this.getUser.bind(this)} />
            <Route exact path = "/courses/:id" component={CourseDetail} />
            <Route exact path = "/create-course" component={CreateCourse} />
          </Switch>
        </div>

      </BrowserRouter>
    );
    }
  }


export default App;
