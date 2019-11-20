import React, { Component , useState} from 'react'
import {connect} from 'react-redux'
import {fetchBugs} from '../../store/actions/bugPostAction.js'
import User from '../../providers/user'
import {Form,Modal,Button} from 'react-bootstrap';

import {
    InputReact,
    TextAreaReact,
    SelectInputLevel,
    ButtonInput,
    SelectInputStatus,
    ShowProjectOptions
} from './RegisterBug.js'

const ShowItemBug = (name,value) => {
    return<div>
        <h2> {name }</h2>
        <p> {value} </p>
        <hr/>
    </div>
}
const showSeverity = (name) => {
    let intensityColor = "";

    // intensityColor = name == "low" ?'badge-primary' : false;
    // intensityColor = name == "moderate" ?' badge-warning' : false;
    // intensityColor = name == "critical" ?' badge-danger' : false;

    if(name == "low"){ intensityColor = "badge-primary"}
    if(name == "moderate"){ intensityColor = "badge-warning"}
    if(name == "critical"){ intensityColor = "badge-danger"}


    return<>
        <span className={"badge w-75 py-2 "+intensityColor}>
            {name} 
        </span>
    </>
}

/**EDIT PROJECT */
const EditProject = (props) => {

    let [name , setName ] = useState();
 

    return <Modal className="mt-lg-2" show={props.show} onHide={()=>props.onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Update  </Modal.Title>
      </Modal.Header>
        <Modal.Body>
            Bug Name
            <InputReact />
            <SelectInputLevel />
            <SelectInputStatus />
            Bug Description
            <TextAreaReact />
        </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" 
                onClick={()=>props.onSave( )}>
                Save changes
        </Button>
      </Modal.Footer>
    </Modal>

}

class AdminBugs extends Component {
    constructor(props){
        super(props)
        this.state = {
            openModal:false
        }
        if ( !User.isLoggeIn() ) {
            this.props.history.push("/") 
        }
    }
    componentDidMount(){
        this.props.fetchBugs();
    }
    showProject(project){
       if ( project ){
            return <p>Project: {project.name || "Sem projeto"}</p>
       }
        else{
            return <> </>
        }
                
    }
    deleteProject(id){
        if( window.confirm("Tem certeza que quer deletar o bug "+id+"?")){
            Axios.delete("bug/"+id)
                .then(data=>{ 
                    alert(data.data.message) 
                    this.props.fetchBugs();
                });
           
        }
        
    }
    render() {
        console.log('BUGS '+this.props.bugs)
        const postItems = this.props.bugs.map(bug=>(
      
            <div className="mb-3" key={bug.id}>
                <h4>Name:  <b>{bug.name}</b></h4>
                <h5> <b>description:</b> {bug.description} </h5>
                
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th> Status </th>
                            <th> Severity </th>
                            <th className="d-md-none d-lg-block"> UserName </th>
                            <th> Project </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> {bug.status} </td>
                            <td> {showSeverity(bug.severity)}
                            </td>
                            <td> {bug.user_name || "anonymous"} </td>
                            <td>  {this.showProject(bug.project)} </td>
                        </tr>   
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-danger m-1 d-flex" onClick={()=>this.deleteProject(bug.id)}>
                        <i class="material-icons"> delete </i>
                        <span className="d-md-none d-lg-inline-flex"> Delete  </span>
                    </button>
                    <button className="btn btn-primary m-1 d-flex" onClick={()=>this.setState({openModal:true})}>
                        <i class="material-icons"> edit </i>
                        <span className="d-md-none d-lg-inline-flex"> Update  </span>
                    </button>
                </div>
                <hr/>
            </div>  
        ))
        return (
            <>
            <div className="container container-height mt-sm-3 mx-sm-auto container-height p-0 m-0 p-sm-1 m-sm-1">
                <div className="card">
                    <div className="card-header">
                        <h2> 
                            <i className="material-icons">
                                bug_report
                            </i>
                            Admin Bugs Panel
                        </h2>
                    </div>
                    <div className="card-body">
                        {postItems}
                    </div>
                </div>
            </div>
            <EditProject show={this.state.openModal} 
                          onHide={()=>this.setState({openModal:!this.state.openModal})} 
                          onSave={()=>alert("teste save")}/>
            </>
        )
    }
}
const mapStateToProps = state => ({
    bugs:state.bugs.items
})
export default connect(mapStateToProps,{fetchBugs})(AdminBugs)