import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

class Header extends Component {
  //this function send the user to the signout page and clears the local storage upon arrival. 
 signOut(){
   // window.location.href = "/signout";
    
    localStorage.clear();

 }
 //if the the user is availible in local storage a unique header will appear with the ability to signout 
    render(){
        const localData = JSON.parse(localStorage.getItem('user'))
        if (localData){
        return(
        <div>
        <NavLink to="/"><title >Courses</title></NavLink>
        <div id="root">
          <div>
          <form>
            <div className="header">
              <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav><a href="http://localhost:3000/" className="signup" >Welcome {localData[0].firstName}</a><a href="/signout" className="signout" onClick= {this.signOut}>Sign Out</a></nav>
              </div>
            </div>
            <hr />
            </form>
            </div>
            </div>
            </div> )
        } else if(!localData) {
            return(
                <div>
               <NavLink to="signin"> <title >Courses</title> </NavLink>
                <div id="root">
                  <div>
                  <form>
                    <div className="header">
                      <div className="bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav><a className="signup" href="signup">Sign Up</a><a className="signin" href="signin">Sign In</a></nav>
                      </div>
                      
                    </div>
                    </form>
                    <hr />
              </div>
              
           </div>
           
        </div>
        
             )
        }

       
    }

}

export default Header;