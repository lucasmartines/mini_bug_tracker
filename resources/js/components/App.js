import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers} from 'redux'



/**Part of template */
import Header from './items/Header.js'
import Footer from './items/Footer.js'


/**
 * ========================================
 * Routes 
 */
import About from './about/About.js'
import Home from './home/Home.js'
import Login from './user/login/Login.js'
import RegisterBug from './bugs/RegisterBug.js'
import Register from './user/register/Register.js'
import AdminUser from './user/adminUser/AdminUser.js'



/**
 * Axios
*/



import axios from 'axios'


window.Axios = axios.create({
    baseURL:"/api",
})


if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
    let bearer = "Bearer "+localStorage.getItem("token")
   
    Axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: bearer
    }
    
}

Axios.post("/me")
    .then((e)=>{
        console.log(e.data)
    })
    .catch((e)=>{
        console.log(e)
    });

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


function App(  ) {
    return (
        <>
            <Router>
                <Header/>
                    <Switch>
                        <Route path="/about">     <About />       </Route>
                        <Route path="/login">     <Login />       </Route>
                        <Route path="/bugtracker"><RegisterBug />        </Route>
                        <Route path="/register">  <Register />    </Route>
                        <Route path="/user">      <AdminUser />        </Route>
                        <Route path="/">          <Home />        </Route>
                    </Switch>
                <Footer/>
            </Router>
        </>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
