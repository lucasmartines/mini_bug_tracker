import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import User from '../../providers/user'

import {loadProjects} from '../../store/actions/loadProjectsAction'
import {deleteProject} from'../../store/actions/deleteProjectAction.js'
import {connect} from 'react-redux';




class Project extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            nomeProjeto : ""
        }
        if ( !User.isLoggeIn() ) {
            this.props.history.push("/") 
        } 
        
        
    }
    componentDidMount(){
        this.props.dispatch(loadProjects())
    }
    deleteProject(id){
        confirm("tem certeza que quer deletar esse projeto")
        this.props.dispatch(deleteProject(id))
         this.props.dispatch(loadProjects())
    }
    showProjects(){

        return this.props.projects.map( project => (
            <div className="card m-1 p-2 d-flex flex-row" key={project.id}>
                <span className="mr-auto">{project.name}</span>
                <button className="btn btn-danger col-sm-2"
                        onClick={()=>this.deleteProject(project.id)}>
                    Delete
                </button>
                <button className="btn btn-success mx-1 col-sm-2">
                    Update
                </button>
            </div>) )
    }

    cadastrarProjeto(e){
        console.log(this.state.nomeProjeto)

        Axios.post('/project',{name:this.state.nomeProjeto});
        this.props.dispatch(loadProjects())
    }
    render() {
        return (
            <div className=" mt-3 container container-height ">
                <div className="card mb-2">
                    <div className="card-header">
                        <h2> Project </h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            Novo Projeto
                            <input  className="form-control" 
                                    placeholder="Nome do projeto!"
                                    onChange={(e)=>{ this.setState({[e.target.id]:e.target.value })   }}
                                    id="nomeProjeto"/>
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
            </div>

        )
    }
}
const mapStateToProps = (state) => ({
    projects:state.projects
})

export default connect(mapStateToProps)( Project )