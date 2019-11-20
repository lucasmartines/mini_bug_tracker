import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchBugs} from '../../store/actions/bugPostAction.js'
import User from '../../providers/user'

const ShowItemBug = (name,value) => {
    return<div>
        <h2> {name }</h2>
        <p> {value} </p>
        <hr/>
    </div>
}


class AdminBugs extends Component {
    constructor(props){
        super(props)
        
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
                .then(data=> alert(data.data.message));
            this.props.fetchBugs();
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
                            <th> UserName </th>
                            <th> Project </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> {bug.status} </td>
                            <td> <span class="badge badge-primary w-75 py-2">
                                 {bug.severity} 
                                 </span>
                            </td>
                            <td> {bug.user_name || "anonymous"} </td>
                            <td>  {this.showProject(bug.project)} </td>
                        </tr>   
                    </tbody>
                </table>
               
                <button className="btn btn-danger" onClick={()=>this.deleteProject(bug.id)}> Delete Project </button>
                <hr/>
            </div>  
        ))
        return (
            <div className="container container-height pt-4">
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
        )
    }
}
const mapStateToProps = state => ({
    bugs:state.bugs.items
})
export default connect(mapStateToProps,{fetchBugs})(AdminBugs)