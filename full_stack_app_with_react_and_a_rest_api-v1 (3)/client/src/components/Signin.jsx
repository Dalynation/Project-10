import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import Header from "./Header";

class Signin extends Component {

  //
    constructor(props){
      super(props);
      this.state = {
        emailAddress:'',
        password:'',
        user:[]
      }
    
      this.onChange = this.onChange.bind(this); //
    }

    //
    onChange(text){
      this.setState({[text.target.name]: text.target.value})
     // console.log(this.state);
    }
 

    //
handleSubmit = () =>{
  let body = {"password": this.state.password, "emailAddress": this.state.emailAddress}

  this.props.getUser(body)

}

//
render() {
  console.log()
    return (
        <div>
          <Header/>
              <div className="bounds">
                <div className="grid-33 centered signin">
                  <h1>Sign In</h1>
                  <div>
                    {/* <form> */}
                      <div><input id="emailAddress" name="emailAddress" type="text"  placeholder="Email Address" onChange = {this.onChange} /></div>
                      <div><input id="password" name="password" type="password"  placeholder="Password" onChange = {this.onChange} /></div>
                      <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.handleSubmit}>Sign In</button><NavLink to="/"><button className="button button-secondary">Cancel</button></NavLink></div>
                    {/* </form> */}
                  </div>
                  <p>&nbsp;</p>
                  <p>Don't have a user account? <a href="signup">Click here</a> to sign up!</p>
                </div>
              </div>
            </div>
      );
    }
}

export default Signin;