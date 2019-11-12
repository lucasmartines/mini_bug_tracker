import React,{Component} from 'react';
import {Link} from 'react-router-dom';


/**
 * unifica o li com o a ou link
 */
function ListLink ( props ){
    return (
        <li className="nav-item active">
            <Link className="nav-link" to={props.link}>
                {props.name}
            </Link>
        </li>
    )
}
function LogoutLink(props){
    return(
        <li className="nav-item active ">
            <a className="nav-link" href=""onClick={props.onClick}>
                {props.name}
            </a>
        </li>
    )
}
function logged(){
    if( localStorage.getItem("token") != "" ){
        return true;
    }
    else{
        return false;
    }
}
function doLogout(e){
    e.preventDefault();
    localStorage.setItem("token","");

    Axios.post("/logout")
        .then((response)=>{
            console.log("logout")  
            
        })
        .catch((e)=>console.log(e))

    window.location="/"
}
function LoggedRoutes(){
    if(!logged()){
        return <>
            <ListLink name="Login" link="/login"/>
            <ListLink name="Register" link="/register"/>
        </>
    }
    else{
        return <>
             <LogoutLink name="Logout" onClick={(e) => doLogout(e)}  />
        </>
    }
}
export default class Login extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="">
                    BugTracker
                </Link>
                <button className="navbar-toggler" 
                        type="button"
                        data-toggle="collapse" 
                        data-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <ListLink name="About" link="/about"/>
                        
                        <ListLink name="Bug Tracker" link="/bugtracker"/>
                        <ListLink name="Admin User" link="/user"/>

                        {
                            logged() && 
                             <ListLink name="Admin Project" link="/projects"/>
                        }
                    
                        <ListLink name="Admin Bugs" link="/bugspanel" />
                        <LoggedRoutes/>

                    </ul>
                </div>
            </nav>
        )
    }
}