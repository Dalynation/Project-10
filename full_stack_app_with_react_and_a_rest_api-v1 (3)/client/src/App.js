import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// importing the css
import "./styles/global.css"; 

//import the react components
import Courses from "./components/Courses";



 
  
class App extends Component {

  render() {
 

    return (
      <BrowserRouter>

        <div>
          <Switch>
            <Route exact path = "/" component={Courses} />
          </Switch>
        </div>

      </BrowserRouter>
    );
    }
  }


export default App;
