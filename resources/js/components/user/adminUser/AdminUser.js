import React,{Component} from 'react';

/**
 * TabPane receive 
 * props.active
 * props.name
 * props.id
 * 
 */
function NavItem(props){
    return <>
        <li className="nav-item">
            <a className={"nav-link "+ props.active}
                
                id={props.id+"-tab" } 
                data-toggle="tab" 
                href={"#"+props.id} 
                role="tab" 
                aria-controls={props.id} 
                aria-selected="true">{props.name}
            </a>
        </li>
    </>
}
/**
 * TabPane receive 
 * props.id
 * props.name
 * props.active
 * props.show

 */
function TabPane(props)
{
    return <>
        <div className={"tab-pane fade " + props.show + " "+props.active}
            
            id={props.id} 
            role="tabpanel" 
            aria-labelledby={props.name+"-tab"}>
            {props.as}
        </div>
    </>
}

export default class AdminUser extends Component{

    constructor(){
        super()
        this.state = {

        }
    }
    componentDidMount(){
        if(localStorage.getItem("token") == null || localStorage.getItem("token") == ""){
            window.location = "/login";
        }
    }
    render(){
        return <>
            <div className="container  mt-3 container-height ">
                {/* <TabsBar/> */}
                <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs  card-header-tabs" 
                            id="myTab" role="tablist">
                            <NavItem 
                                name="Create Role" 
                                id="role" 
                                active="active" />                
                            <NavItem 
                                name="Create user" 
                                id="user" />
                            <NavItem 
                                name="All users" 
                                id="users" />
                        </ul>
                    </div>
                    <div className="card-body">
                        <div className="tab-content" 
                            id="myTabContent">
                            <TabPane 
                                name="Create Role" 
                                id="role"  
                                active="active"
                                show="show"
                                as={<h2> Create Role </h2>} />
                            <TabPane 
                                name="Create user" 
                                id="user" 
                                as={<h2> Create User </h2>} />
                            <TabPane 
                                name="All users" 
                                id="users" 
                                as={<h2> All Users </h2>} />
                        </div>
                    </div>
                </div>{/* ./card */}
            </div> {/* ./container */}
        </>
    }
}