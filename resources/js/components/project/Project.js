import React, { useState, Component } from 'react'
import {Redirect} from 'react-router-dom'
import User from '../../providers/user'

import {loadProjects} from '../../store/actions/loadProjectsAction'
import {deleteProject} from'../../store/actions/deleteProjectAction.js'
import {connect} from 'react-redux';
import {Form,Modal,Button} from 'react-bootstrap';



const EditProject = (props) => {

    let [name , setName ] = useState();

    return <Modal show={props.show} onHide={()=>props.onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {props.project.nameProjeto}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Control 
                placeholder={props.project.nameProjeto}
                onChange={(e)=> setName(e.target.value)} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" 
                onClick={()=>props.onSave(props.project.id,name)}>
                Save changes
        </Button>
      </Modal.Footer>
    </Modal>

}
class Project extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            nameProjeto : "",
            modal : false,
            editProject:{
                nameProjeto:"",
                id:0
            }
        }
        if ( !User.isLoggeIn() ) {
            this.props.history.push("/") 
        } 
        
        
    }
    componentDidMount(){
        this.props.dispatch(loadProjects())
    }
    deleteProject(id){
        confirm("tem certeza que quer deletar esse projeto?")
        this.props.dispatch(deleteProject(id))
        this.props.dispatch(loadProjects())
    }
    updateProject(id,name){

        this.setState({editProject:{
            nameProjeto:name,
            id:id
        }})
        
      
        
        Axios.put('/project/'+id,{name})
            .then(data => {
                if(typeof data !== "undefined"){
                    alert("Projetos atualizados")
                }
            })

        this.props.dispatch(loadProjects())           
        this.setState({modal:false})
        
        
    }
    showProjects(props){

        if( typeof this.props.projects !== 'undefined'){
            return this.props.projects.map( project => (
                <div className="card m-1 p-2 d-flex flex-row" key={project.id}>
                    <span className="mr-auto">{project.name}</span>
                    <button className="btn btn-danger m-1"
                            onClick={()=>this.deleteProject(project.id)}>
                        Delete
                    </button>
                    <button className="btn btn-success m-1"
                            onClick={()=>this.setState({
                                modal:true,
                                editProject:{
                                    nameProjeto:project.name,
                                    id:project.id
                                }
                            })}>
                        Update
                    </button>
                </div>) )
        }
    }

    cadastrarProjeto(e){

        if(this.state.nameProjeto == ""){
            alert("Por favor precha o nome do projeto");
        }
        else{
            
            Axios.post('/project',{name:this.state.nameProjeto});
            this.props.dispatch(loadProjects())
        }
    }
    render() {
        return (
            <div className=" mt-3 container container-height ">
                <div className="card mb-2">
                    <div className="card-header">
                        <h2> 
                        Project Panel </h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            Novo Projeto
                            <input  className="form-control" 
                                    placeholder="Nome do projeto!"
                                    onChange={(e)=>{ this.setState({[e.target.id]:e.target.value })   }}
                                    id="nameProjeto"/>
                            <button  className="btn btn-success mt-2"
                                     onClick={(e)=>{ this.cadastrarProjeto(e) }}>
                                Adicionar 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <h2 className="p-2"> Projects </h2>
                    {this.showProjects()}
                </div>
                <EditProject show={this.state.modal}  
                             onHide={()=>this.setState({modal:false})}
                             onSave={(id,name)=>this.updateProject(id,name)}
                             project={this.state.editProject }

                             
                 />
            </div>

        )
    }
}
const mapStateToProps = (state) => ({
    projects:state.projects
})

export default connect(mapStateToProps)( Project )