import React from 'react';
import ReactDOM from 'react-dom';
import store from '../store/store.js'



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
import AdminBugs from './bugs/AdminBugs.js'
import Project from './project/Project.js'


/**
 * Axios
*/
import axios from 'axios'


window.Axios = axios.create({
    baseURL:"/api",
})

/**
 * ====================================
 * use token
 */
if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
    let bearer = "Bearer "+localStorage.getItem("token")
   
    Axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: bearer
    }  
}

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import {Provider} from 'react-redux'

function App(  ) {
    return (
        <Provider store={store}>
            <Router>
                <Header/>
                    <Switch>
                        <Route path="/about">     <About />              </Route>
                        <Route path="/projects">   <Project />             </Route>
                        <Route path="/login">     <Login />              </Route>
                        <Route path="/bugtracker"><RegisterBug />        </Route>
                        <Route path="/register">  <Register />           </Route>
                        <Route path="/user">      <AdminUser />          </Route>
                        <Route path="/bugspanel"> <AdminBugs />           </Route>
                        <Route path="/">          <Home />                </Route>

                    </Switch>
                <Footer/>
            </Router>
        </Provider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
