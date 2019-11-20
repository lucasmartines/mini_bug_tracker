import React,{Component} from 'react';
import User from '../../providers/user.js'
import {connect} from 'react-redux';
import {loadProjects} from '../../store/actions/loadProjectsAction.js'
/** 
 * É o input normal do html formatado pensando em react
 * 
 * @function InputReact
 * 
 * os params disponiveis para customização: 
 * @param placeholder
 * @param inputName
 * @param onChange 
 * @param className 
 * */
function InputReact  (props) {
    return <>
        <div className="form-group mb-3">
            <label htmlFor="bug1">{props.inputName}</label>
            <input 
                type="bug" 
                className="form-control col-12 col-sm-12 " id="bug1"
                aria-describedby="bugHelp"
                placeholder={props.placeholder}
                onChange={ props.onChange }
               />
        </div>
    </>
}

/**
 * É o input do text area, não está completo ainda
 */
function TextAreaReact(props){
    return<>
         <div className="form-group mb-3">
            <label htmlFor={props.for}>{props.inputName}</label>
            <textarea 
                className="form-control col-12 col-sm-12 " 
                id={props.for} 
                rows={props.rows || 5}
                onChange={props.onChange}></textarea>
        </div>
    </>
}

/**
 * É o input do select, não está completo ainda, falta receber calback
 * que descreve qual valor foi escolhido
 */
function SelectInputLevel(props){
    return <>
          <div className="form-inline mb-3">
            <label htmlFor="level">Bug's Severity</label>
            <select
                className="form-control ml-2 col-12 col-sm-3 col-lg-2" 
                id="level"
                onChange={props.onChange}
                value={props.value}>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="critical">Critical</option>
            </select>
        </div>
    </>
}

/**
 * É um botão simples
 * @param onCLick 
 * @param className, é o class name do form-control
 * @param inputName, é o name que vai aparecer no botão 
 */
function ButtonInput(props){
    return <>
        <div className="form-group">
            <div className={props.className}>
                <button 
                    className="btn btn-primary  "
                    onClick={props.onCLick}> {props.inputName || "Submit"}  </button>
            </div>
        </div>
    </>
}

/**
*
*/
function ShowProjectOptions({options,onChange}){

    if(typeof options[0] !== 'undefined'  ){
        // console.log("ITEMS ",options[0])
        
        return <>
        <span> Project </span>
        <select 
            onChange={onChange}
            className="form-control my-2" >
            <option value={0}> </option>
            
            {
                options.map( item =>
                     <option 
                             key={item.id}
                             value={item.id} > 
                        {item.name}
                    </option> )
            }
        </select>
        </>
    }
    else{
        return <> <p> Não existe nenhum projeto! </p> </>
    }
}
class Bugs extends Component{

    constructor(){
        super()
        this.state = {
            
            name:"",
            description:"",
            severity:"low",
            project:0
            
        }
    }
    componentDidMount (){
        
        this.props.dispatch(loadProjects())
        //console.log(this.props.projects)        
           
    }
    allFieldNotEmpty(){
        let {name,description,severity,project} = this.state;

        console.log(name,description,severity,project)
        if( name.length > 0
        &&  description.length > 0 
        &&  severity.length > 0 
        &&  project > 0 ){
            return true;
        }
        else{
            return false;    
        }
        
        
    }
    componentDidUpdate(){
        console.log(this.props.projects)
       // this.forceRender();
    }
    submitForm(e){

        if(this.allFieldNotEmpty()){

            Axios.post('/bug',this.state)
                .then( response => {
                    //console.log(response.data)
                    alert("Bug adicionado no sistema corretamente!")
                })
                .catch( err => {console.log(err)
                     User.logoutWhenStatusCodeNotAuthorized(err.response.status)

                })
        }   
        else{
            alert("Por favor prencha todos os campos!")
        }
    }
    render(){
        return <>
            <div className="container mt-3 container-height">
                <div className="card m-1 d-flex flex-column">
                    <div className="card-header">
                        <h2> <i className="material-icons">
                                  bug_report
                            </i>
                            Reportar um Bug </h2>
                    </div>
                    <div className="card-body mx-auto d-flex flex-column col-10 pt-3">
                        <InputReact 
                            inputName="Bug Name"
                            placeholder="Bug name"
                            onChange={(e)=>{ this.setState({name:e.target.value}) } }
                        />
                        <SelectInputLevel 
                            onChange={ (e)=>{this.setState({severity: e.target.value})} } />
                        <TextAreaReact
                            inputName="Bug's Description"
                            htmlFor="bug input"
                            onChange={(e)=>{ this.setState({description:e.target.value}) } }/> 
                        <ShowProjectOptions 
                            options={this.props.projects}
                            onChange={(e)=>  this.setState({project: e.target.value} ) } />
                        <ButtonInput
                            inputName="Send Bug"
                            onCLick={(e)=>{this.submitForm(e)}}
                            className="justify-content-end d-flex col-12 col-sm-12  pr-0"/>
                        
                    </div>
                </div>
            </div>
        </>
    }
}
const mapStateToProps = state => ({
    projects: state.projects
})
export default connect(mapStateToProps)( Bugs )