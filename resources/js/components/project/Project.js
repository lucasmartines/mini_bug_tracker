import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import User from '../../providers/user'






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
    cadastrarProjeto(e){
        console.log(this.state.nomeProjeto)
    }
    render() {
        return (
            <div className=" mt-3 container container-height ">
                <div className="card ">
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
            </div>

        )
    }
}

export default Project