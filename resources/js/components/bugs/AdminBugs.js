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
        /*
        if ( !User.isLoggeIn() ) {
            this.props.history.push("/") 
        }*/
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
    render() {
        console.log('BUGS '+this.props.bugs)
        const postItems = this.props.bugs.map(bug=>(
      
            <div key={bug.id}>
                <h3>Bug: {bug.name}</h3>
                <h5>description: {bug.description} </h5>
                <p>status: {bug.status} </p>
                <p>severity: {bug.severity} </p>
                <p>User name: {bug.user_name} </p>
                {this.showProject(bug.project)}
                

            </div>  
        ))
        return (
            <div className="container container-height pt-4">
                <h2> AdminBugs </h2>
                <div>
                    {postItems}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    bugs:state.bugs.items
})
export default connect(mapStateToProps,{fetchBugs})(AdminBugs)