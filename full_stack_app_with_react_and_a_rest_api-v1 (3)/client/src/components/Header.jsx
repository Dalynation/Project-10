import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import axios from "axios";

class Header extends Component {
 signOut(){
    window.location.href = "signin";
    
    localStorage.clear();

    
 }
    render(){
        const localData = JSON.parse(localStorage.getItem('user'))
        if (localData){
        return(
        <div>
        <title>Courses</title>
        <div id="root">
          <div>
            <div className="header">
              <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav><a className="signup" href="/">Welcome {localData[0].firstName}</a><a className="signout" onClick= {this.signOut}>Sign Out</a></nav>
              </div>
            </div>
            <hr />
            </div>
            </div>
            </div> )
        } else if(!localData) {
            return(
                <div>
                <title>Courses</title>
                <div id="root">
                  <div>
                    <div className="header">
                      <div className="bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav><a className="signup" href="signup">Sign Up</a><a className="signin" href="signin">Sign In</a></nav>
                      </div>
                    </div>
                    <hr />
                    </div>
                    </div>
                    </div> )
        }

       
    }

}

export default Header;