import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from "axios";
import Header from './Header';


class Signup extends Component {

  // these are all states required for signup component.
constructor() {
  super()
  this.state = {
    firstName:'',
    lastName:'',
    emailAddress:'',
    password:'',
    confirmPassword:'',
    errors:"",
    passwordError:""
  }

  this.onChange = this.onChange.bind(this);

}

// function that targets input values for all text field, and help me link values with state.
onChange = (text) => {
  this.setState({ 
    [text.target.name]: text.target.value
   
  });
}

handlesignup = (e) => {

  let body = {
    "firstName":this.state.firstName,
    "lastName":this.state.lastName,
    "emailAddress":this.state.emailAddress,
    "password":this.state.password,
  }
  
  if (this.state.password === this.state.confirmPassword) { //

    // this is the content that's being posted to the api with axios.

    axios({	
            method:'POST',
            url: "http://localhost:5000/api/users", 
            data: body 
            
    }).then(response => {
      if (response.status === 200){
        alert("Your account has been successfully created")
        window.location.href="/signin"
      }
    })
     .catch(error => {
       this.setState({
        errors: error.response.data
      })

     console.log(error.response.data)

    })
  } else{
    this.setState({
      errors: "Passwords do not match."
    })
  }


}

//   handlesignup = (e) => {
//    // parameters for email validation
//   var reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
//       //if any fields are left empty, user will be alerted.
//         if(this.state.firstName < 1 || this.state.lastName < 1 || this.state.emailAddress < 1 || this.state.password < 1){
//           e.preventDefault();
//           alert("You need to fill in all fields for firstname, lastname, email address, and password.")
//         } else {
          
//           // if email does not match up with parmeters then the user will be alerted.
//           if(reg.test(this.state.emailAddress) == false) {
//             alert("Invalid email")
//           } else {
//          // if password and confirmed password matches, the axios post will take place.
//           if (this.state.password === this.state.confirmPassword) { //

//             // this is the content that's being posted to the api with axios.
//       let body = {
//         "firstName":this.state.firstName,
//         "lastName":this.state.lastName,
//         "emailAddress":this.state.emailAddress,
//         "password":this.state.password,
//       }
      
//         axios({	
//                 method:'POST',
//                 url: "http://localhost:5000/api/users", 
//                 data: body 
                
//         }) .then(response => {
//           if (response.status == 200){
//             alert("Your account has been successfully created")
//             window.location.href="/signin"
//           }
//         })
//         .catch(res => {
//           // if it fails then email already exists, and if not the user will be redirected.
//           if (400) {
//             alert("Email already exists")
//           }else{
//             alert("Your account has been successfully created")
//             window.loca/tion.href="/signin"
//           } 
//         }) 
        

//     } else {
//       alert("Passwords do not match.")
//     } 

//     }
//   }

  
// }



//Here is where I render the signup page
render () {


  const error = this.state.errors;
  //console.log(error.firstName)
  
  
    return(
  <div>
        
          <Header/>
          
            <div className="bounds">
              <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>

                <h2 className="signup--validation--label" style={{color: 'red'}}>{error}</h2>
                

                
                  
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
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <a href="signin">Click here</a> to sign in!</p>
              </div>
            </div>
          </div>
       

    );
}
}

export default Signup;