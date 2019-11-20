import React,{Component} from 'react';
import {connect} from 'react-redux';
import User from '../../../providers/user.js';
import {loadRoles} from '../../../store/actions/loadRolesAction.js'
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
function ShowRoles(props) {
    
    let items ;
    
    if ( typeof props.roles.items !== 'undefined'  ){
        items = props.roles.items.map( item => <div key={item.id} className="badge badge-primary m-1 px-5">
                {item.name}
            </div>)
    }
    else{
        items = <> Não tem roles!</>
    }
    return <>
        <h2> Roles </h2>
        {items}
    </>
}
function ShowUsers(props){
    let items ;
    console.log("teste")
    if ( typeof props.users !== 'undefined' && typeof props.users !== 'undefined' ){
        items = props.users.map( item => <tr key={item.id} className="">
               <td> {item.id} </td>
               <td> {item.name} </td>
               <td> {item.email}</td>
               <td> 
                   <button className="btn btn-primary d-inline-flex align-items-center"> 
                        <i class="material-icons"> edit </i>
                        Modificar
                   </button>
                   <button className="btn btn-danger d-inline-flex align-items-center  mx-1">
                        <i class="material-icons"> delete </i>
                        Deletar
                   </button>
               </td>
            </tr>)
    }
    else{
        items = <> Estranho! Não existe nenhum usuário, como você chegou aqui? </>
    }
    return <>
        <h2> Users </h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th> Id </th>
                    <th> User </th>
                    <th> Email </th>
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody>
                
                    {items}
               
            </tbody>
        </table>

        
    </>
}

 class AdminUser extends Component{

    constructor(props){
        super(props)
        this.state = {
            users: []
        }
    }
   componentDidMount(){

        if ( !User.isLoggeIn() ) {
            this.props.history.push("/") 
        }    
        
        this.props.loadRoles();

       Axios.get('/user').
        then( data => {
            this.setState({users:data.data})
        })
    }
    render(){
        return <>
            <div className="container  mt-sm-3 mx-sm-auto  p-0 m-0 p-sm-1 m-sm-1 ">
                {/* <TabsBar/> */}
                <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs  card-header-tabs" 
                            id="myTab" role="tablist">
                            <NavItem 
                                name="All Roles" 
                                id="role" 
                                active="active" />                
                            <NavItem 
                                name="All users" 
                                id="users" />
                        </ul>
                    </div>
                    <div className="card-body container-height" >
                        <div className="tab-content" 
                            id="myTabContent">
                            <TabPane 
                                name="Create Role" 
                                id="role"  
                                active="active"
                                show="show"
                                as={<ShowRoles roles={this.props.roles} />} />
                            <TabPane 
                                name="All users" 
                                id="users" 
                                as={<ShowUsers users={this.state.users} />} />
                        </div>
                    </div>
                </div>{/* ./card */}
            </div> {/* ./container */}
        </>
    }
}
const mapStateToProps = state => ({
    roles: state.roles
})
export default connect(mapStateToProps,{loadRoles})( AdminUser)