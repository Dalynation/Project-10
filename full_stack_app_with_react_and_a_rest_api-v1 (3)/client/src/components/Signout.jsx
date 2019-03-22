import React, { Component } from 'react';
import Header from './Header';

class signout extends Component {
// This is the page that renders once the user clicks on signout
    render () {
        return (
            <div>
            <Header/>

            <h2>You have succesfully signed out</h2>
            </div>

        )
    }

}

export default signout;