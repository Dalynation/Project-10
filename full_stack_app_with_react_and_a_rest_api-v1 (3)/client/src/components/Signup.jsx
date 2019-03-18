import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from "axios";


class Signup extends Component {

  //
constructor(props) {
  super(props)
  this.state = {
    firstName:'',
    lastName:'',
    emailAddress:'',
    password:'',
    confirmPassword:''
  }

  this.onChange = this.onChange.bind(this);

}

//
onChange = (text) => {
  this.setState({ 
    [text.target.name]: text.target.value
   
  });
  console.log(JSON.stringify(text.target.password))
  
}

//
handlesignup = (e) => {
  
if (e.status(200)) {
    // e.preventDefault();
     alert("Please fill in all fields correctly")
if (this.state.password === this.state.confirmPassword) { //
  e.preventDefault();

  let body = {
    "firstName":this.state.firstName,
    "lastName":this.state.lastName,
    "emailAddress":this.state.emailAddress,
    "password":this.state.password,
    "confirmpassword":this.state.confirmPassword
  }
  
    axios({	
            method:'POST',
            url: "http://localhost:5000/api/users", 
            data: body 
    })
   

    // redirects to sign in page
    //window.location.href="/signin"

 
 } else {
   alert("Passwords do not match.")
 } 
} else {
  alert("Please fill in all fields correctly.")
}
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
                <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="sign-in">Sign In</a></nav>
              </div>
            </div>
            <hr />
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                  {/* <form> */}
                    <div><input id="firstName" name="firstName" type="text" placeholder="First Name" onChange = {this.onChange} /></div>
                    <div><input id="lastName" name="lastName" type="text" placeholder="Last Name" onChange = {this.onChange}  /></div>
                    <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange = {this.onChange}  /></div>
                    <div><input id="password" name="password" type="password" placeholder="Password" onChange = {this.onChange} /></div>
                    <div><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" onChange = {this.onChange}  /></div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.handlesignup}>Sign Up</button><NavLink to="signin"><button className="button button-secondary" >Cancel</button></NavLink></div>
                  {/* </form> */}
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <a href="signin">Click here</a> to sign in!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
}
}

export default Signup;