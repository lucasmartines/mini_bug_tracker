import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchBugs} from '../../store/actions/bugPostAction.js'

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
    }
    componentDidMount(){
        this.props.fetchBugs();
    }
    render() {
        console.log(this.props.bugs)
        const postItems = this.props.bugs.map(bug=>(
      
            <div key={bug.id}>
                <h3>{bug.title}</h3>
                <p> {bug.body} </p>
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