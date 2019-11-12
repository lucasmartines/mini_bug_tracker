import React, { Component } from 'react'

export default class Project extends Component {
    render() {
        return (
            <div class=" mt-3 container container-height ">
                <div class="card ">
                    <div class="card-header">
                        <h2> Project </h2>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            Novo Projeto
                            <input  className="form-control" 
                                    placeholder="Nome do projeto!"/>
                            <button className="btn btn-success mt-2">
                                Adicionar 
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
