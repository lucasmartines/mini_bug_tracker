import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import User from '../../../providers/user';
import SimpleReactValidator from 'simple-react-validator';



export default class Register extends Component{

    constructor(){
        super()
        this.state = {
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        }
        this.validator = new SimpleReactValidator();

    }
    componentDidMount(){
        if(User.isLoggeIn()){
            props.history.push('/')
            //window.location="/"
        }
       
    }
    registerUser(e)
    {
        if( this.state.password !== this.state.confirmPassword){
            this.validator.showMessageFor('confirmPassword');
        }
        else{
            this.validator.hideMessageFor('confirmPassword')
        }

        if (this.validator.allValid()) {
            let newUser = {
                name:this.state.name,
                email:this.state.email,
                password:this.state.password,
                confirmPassword:this.state.confirmPassword,
            }
            Axios.post("/register",newUser)
                .then((response)=>{
                    localStorage.setItem("token",response.data.access_token);
                    window.location="/"
                // props.history.push('/')
                    console.log(response)
                    console.log(localStorage.getItem('token'))
                })
                .catch((e)=>console.log(e))
        }
        else{
            this.validator.showMessages();
            this.forceUpdate();
        }
            
    }
    render(){
        return <>
            <div className="mx-1">
                <div className="card col-sm-8 col-lg-4 col-12 mx-auto  my-5 py-5 px-4 ">
                    <h2><i class="material-icons">security </i>  Register </h2>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text" 
                                className="form-control"  
                                placeholder="Name"
                                onChange={(e)=>this.setState({name:e.target.value})}/>
                        <p className='text-danger'>{this.validator.message('name', this.state.name, 'required|min:4') }</p>

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" 
                                className="form-control"  
                                placeholder="email@email.com"
                                onChange={(e)=>this.setState({email:e.target.value})}/>
                          <p className='text-danger'>{this.validator.message('email', this.state.email, 'required|email') } </p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Password</label>
                        <input type="password" 
                                className="form-control"  
                                placeholder="Password"
                                onChange={(e)=>this.setState({password:e.target.value})}/>
                       <p className='text-danger'> {this.validator.message('password', this.state.password, 'required|min:6') }</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Confirm Password</label>
                        <input type="password" 
                                className="form-control"  
                                placeholder="Password"
                                onChange={(e)=>this.setState({confirmPassword:e.target.value})}
                                />

                    <p className='text-danger'>{this.validator.message('confirmPassword', this.state.confirmPassword, 'required|min:8') } </p>

                    </div>
                    <button className="btn btn-success"
                        onClick={(e)=>this.registerUser(e)}> Register </button>
                </div>
            </div>
        </>
    }
}