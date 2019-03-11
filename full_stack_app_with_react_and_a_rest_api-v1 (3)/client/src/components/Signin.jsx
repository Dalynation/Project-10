import React, { Component } from 'react';
import {signUser} from './functions/signUser';
import axios from "axios";

class Signin extends Component {

    constructor(props){
      super(props);
      this.state = {
        emailAddress:'',
        password:'',
        user:[]
      }
      this.login = this.login.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    login(){
      let obj ={}
      
      obj.emailAddress = this.state.emailAddress;
      obj.password = this.state.password

      fetch('http://localhost:5000/api/users',
     {
       header: {
         "Content-type": "application/json"
       },
       method: 'GET',
      // body:JSON.stringify({obj})
     }
     
      )
      .then(res =>  {
        const user = res.data;
        console.log(res.data);
            alert("Welcome " ) // + this.user.firstName
      }) 
      // .then(function(response){
      //       console.log(res.data);
      //       alert("Welcome " + res.user.firstName)
      //       })
     }

    onChange(text){
      this.setState({[text.target.name]: text.target.value})
      console.log(this.state);
    }


  //   componentDidMount(){
  //   axios({	
  //     method:'GET',
  //     url: "http://localhost:5000/api/users", 
  //     auth:
  //         {
  //             emailAddress: `${username}`,
  //             password: `${password}`
  //         }
  //     })  
  //     .then(function(response){
  //     console.log(response.data);
  //     alert("Welcome " + response.data.firstName)
  //     })
  // }
render() {
    return (
        <div>
          <title>Courses</title>
          <div id="root">
            <div>
              <div className="header">
                <div className="bounds">
                  <h1 className="header--logo">Courses</h1>
                  <nav><a className="signup" href="sign-up">Sign Up</a><a className="signin" href="sign-in.html">Sign In</a></nav>
                </div>
              </div>
              <hr />
              <div className="bounds">
                <div className="grid-33 centered signin">
                  <h1>Sign In</h1>
                  <div>
                    {/* <form> */}
                      <div><input id="emailAddress" name="emailAddress" type="text" className placeholder="Email Address" onChange = {this.onChange} /></div>
                      <div><input id="password" name="password" type="password" className placeholder="Password" onChange = {this.onChange} /></div>
                      <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.login} >Sign In</button><button className="button button-secondary" >Cancel</button></div>
                    {/* </form> */}
                  </div>
                  <p>&nbsp;</p>
                  <p>Don't have a user account? <a href="sign-up">Click here</a> to sign up!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default Signin;