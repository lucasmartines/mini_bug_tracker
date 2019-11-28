import React, { Component , useState,useEffect } from 'react'
import {connect} from 'react-redux'
import {fetchBugs} from '../../store/actions/bugPostAction.js'
import User from '../../providers/user'
import {Form,Modal,Button,Card,Container,Row} from 'react-bootstrap';

import Buscador from './components/Buscador.js';

import ReactPaginate from 'react-paginate';

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

    if(name == "low")     { intensityColor = "badge-primary"}
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
    let [bugSeverity , setBugSeverity ] = useState("low");
    let [bugStatus , setBugStatus ] = useState("new bug");
    let [bugDescription , setBugDescription ] = useState( );
    
    useEffect(() => {
        setBugSeverity(   props.bug.severity )
    },[props.bug.severity])

    useEffect(() => {
        setBugStatus(   props.bug.status )
    },[props.bug.status])

    useEffect(() => {
            setName(   props.bug.name )
    },[props.bug.name])

    useEffect(() => {
        setBugDescription(  props.bug.description )
    },[props.bug.description])


    return <Modal  className="mt-lg-2" show={props.show} onHide={()=>props.onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Update  </Modal.Title>
      </Modal.Header>
        <Modal.Body>
            Bug Name
            
            <InputReact default={props.bug.name} onChange={(e)=>{ setName(e.target.value)  }} />
            {/* bug severity */}
            <SelectInputLevel value={props.bug.severity} onChange={(e)=>{ setBugSeverity(e.target.value)  }}/>
            {/* bug status */}
            <SelectInputStatus value={props.bug.status} onChange={(e)=>{  setBugStatus(e.target.value) }}/>
            Bug Description
            <TextAreaReact
                default={props.bug.description} 
                onChange={(e)=>{  setBugDescription(e.target.value) }}
            />
        </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" 
                onClick={()=>{
                    props.onSave( name,bugSeverity,bugStatus,bugDescription )
                }}>
                Save changes
        </Button>
      </Modal.Footer>
    </Modal>

}

class AdminBugs extends Component {
    constructor(props){
        super(props)
        this.state = {
            openModal:false,
            selectedBug:{ name:"",description:""},
            currentPage:1,
            busca:""
        }

        if ( !User.isLoggeIn() ) {
            this.props.history.push("/") 
        }
        
        this.updateBug = this.updateBug.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this)
    }
    componentDidMount(){
        this.props.fetchBugs('/bug?page=1')
 
        
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
    updateBug({ id,name,bugSeverity,bugStatus,bugDescription}){

        let newProject = {  id,name,description: bugDescription ,severity:bugSeverity,status: bugStatus,}
       

        Axios.put('bug/'+newProject.id,newProject)
            .then( data => { 
                alert( data.data.message ) 
                this.props.fetchBugs();
                this.setState({openModal:false})
                
            })
            .catch( err => {
                User.logoutWhenStatusCodeNotAuthorized(err.response.status)

            })
    }
    search(entry)
    {
        if(entry){
            this.props.fetchBugs('/bug?page='+ this.state.currentPage+"&name="+entry)
        }
        else{
            this.props.fetchBugs('/bug?page='+ this.state.currentPage)
        }
    }
    handlePageClick(data){
        console.log('PAGINATE',data.selected+1)
        let page = data.selected + 1 
        this.props.fetchBugs('/bug?page='+page)
    }
    render() {
        console.log('BUGS ',this.props.bugs)
        let postItems = <> Loading items </>
        if( this.props.bugs.data !== undefined){
             postItems = this.props.bugs.data.map(bug=>(
      
                <div className="mb-3" key={bug.id}>
                    <h4>Name:  <b>{bug.name}</b></h4>
                    <h5> <b>description:</b> {bug.description} </h5>
                    <p> Criação {bug.created_at} </p>
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
                    <Row>
                        <Button 
                            className="btn btn-danger m-1 d-flex" 
                            onClick={()=>this.deleteProject(bug.id)}>
                            <i class="material-icons"> delete </i>
                            <span className="d-md-none d-lg-inline-flex"> Delete  </span>
                        </Button>
                        <Button 
                            className="btn btn-primary m-1 d-flex" 
                            onClick={
                                ()=>{         
                                    this.setState({selectedBug:{ 
                                        id:bug.id,
                                        name:bug.name,
                                        description:bug.description,
                                        status:bug.status,
                                        user_name:bug.user_name  ,
                                        severity: bug.severity
                                    }})
        
                                    this.setState({openModal:true})
                            }}>
                            <i class="material-icons"> edit </i>
                            <span className="d-md-none d-lg-inline-flex"> Update  </span>
                        </Button>  
                    </Row> 
                    <hr/>
                </div>
            ) /** end loop */
        )} /** end if loop */
     
        
        
        return (
            <>
            <Container className="container-height mt-sm-3 mx-sm-auto container-height p-0 m-0 p-sm-1 m-sm-1">
                
                <Buscador onClick={ e => {   this.search(e) ;  } }     
                          />
                <Card>
                    <Card.Body>
                        {postItems}
                    </Card.Body>
                </Card>
                <Container className="d-flex justify-content-center mt-3">
                    <ReactPaginate
                        pageCount={this.props.bugs.last_page||1}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={this.props.bugs.per_page||1}
                    
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                        pageClassName={'page-item'}
                        containerClassName={'pagination'}
                        pageLinkClassName={'page-link'}
                        nextClassName={'page-link'}
                        previousClassName={'page-link'}
                    />
                </Container>
            </Container>{/* ./container cont height */}
            
            <EditProject  
                bug = {this.state.selectedBug}
                show={this.state.openModal} 
                onHide={()=>this.setState({openModal:!this.state.openModal})} 
                onSave={(  name,bugSeverity,bugStatus,bugDescription)=>this.updateBug({
                    id:this.state.selectedBug.id, name,bugSeverity,bugStatus,bugDescription
                })} 
                onEntered = {()=>console.log('teste')}
            />

            </>
        )
    }
}
const mapStateToProps = state => ({
    bugs:state.bugs.items
})
export default connect(mapStateToProps,{fetchBugs})(AdminBugs)