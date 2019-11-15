import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import User from '../../providers/user'

/**
 * unifica o li com o a ou link
 */
function ListLink ( props ){
    return (
        <li className="nav-item active">
            <Link className={props.className +" nav-link"} to={props.link} props={{...props}}>
                {props.name}
            </Link>
        </li>
    )
}
/**
 * Button logout link
 */
function LogoutLink(props){
    return(
        <li className="nav-item active ">
            <a className="nav-link" href=""onClick={props.onClick}>
                {props.name}
            </a>
        </li>
    )
}

function doLogout(e){

  
  localStorage.setItem("token","");

    Axios.post("/logout")
        .then((response)=>{
           console.log("Loggout")
            //localStorage.setItem("token","");
        })
        .catch((e)=>console.log(e))

   // window.location="/"
}
/**
 * rotas de login e cadastro,
 * verificam se o usuario está logado 
 */
function LoginAndRegisterLink()
{

    if(!User.isLoggeIn()){
        return <div className="ml-lg-auto d-lg-flex ">
            <ListLink name="Login" link="/login"/>
            <ListLink name="Register" link="/register"/>
        </div>
    }
    else{
        return <div className="ml-lg-auto d-lg-flex ">
             <LogoutLink name="Logout" onClick={(e) => doLogout(e)}  />
        </div>
    }
}

export default class Login extends Component{
    constructor(props){
        super(props)
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
                    <ul className="navbar-nav mr-auto w-100">
                        <ListLink name="About" link="/about"/>
                        
                        <ListLink name="Report Bug" link="/bugtracker"/>
                        
                            {User.isLoggeIn() && <ListLink name="Admin User" link="/user"/>}
                            {User.isLoggeIn() && <ListLink name="Admin Project" link="/projects"/> }
                            {User.isLoggeIn() && <ListLink name="Admin Bugs" link="/bugspanel" />}
                        
                        <LoginAndRegisterLink/>

                    </ul>
                </div>
            </nav>
        )
    }
}