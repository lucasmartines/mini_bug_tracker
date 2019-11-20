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
    headers:{
        'Content-Type': 'application/json'
    }
})
window.Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * ====================================
 * use token
 */

let token = localStorage.getItem("token")

if( token !== null && token !== "" && typeof token !== "undefined"){
    
    if(token.length > 20){
        let bearer = "Bearer "+localStorage.getItem("token")

        Axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: bearer
        }  
    }
}
else{
    localStorage.setItem("token","")
}


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


  /**
   * Get User data
   */
import {loadUser} from '../store/actions/loadUserAction'
loadUser( )



import {Provider} from 'react-redux'

function App(  ) {
    return (
        <Provider store={store}>
            <Router>
                <Header/>
                    <Switch>
                        <Route path="/about" component={About}/>    
                        <Route path="/projects" component={ Project} />     
                        <Route path="/login" component={Login}/>    
                        <Route path="/bugtracker" component={RegisterBug} />
                        <Route path="/register" component={Register}/>
                        <Route path="/user" component={AdminUser}/> 
                        <Route path="/bugspanel" component={AdminBugs}/> 
                        <Route path="/" component={Home}/>      
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
