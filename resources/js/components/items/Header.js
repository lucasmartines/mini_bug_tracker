import React from 'react';
import {Link} from 'react-router-dom';


/**
 * unifica o li com o a ou link
 */
function ListLink ( props ){
    return (
        <li class="nav-item active">
            <Link class="nav-link" to={props.link}>
                {props.name}
            </Link>
        </li>
    )
}

export default function Header(){
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
                    <ListLink name="Login" link="/login"/>
                    <ListLink name="Register" link="/register"/>
                    <ListLink name="Bug Tracker" link="/bugtracker"/>
                    <ListLink name="Admin User" link="/user"/>

                </ul>
            </div>
        </nav>
    )
}
