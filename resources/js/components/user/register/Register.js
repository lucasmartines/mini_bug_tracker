import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';



export default class Register extends Component{

    constructor(){
        super()
        this.state = {
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    }
    componentDidMount(){
        if(localStorage.getItem("token")!== null && localStorage.getItem("token") !== ""){
            //history.push('/')
            window.location="/"
        }
       
    }
    registerUser(e)
    {

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
                console.log(localStorage.getItem('token'))
            })
            .catch((e)=>console.log(e))

            
    }
    render(){
        return <>
            <div className="mx-1">
                <div className="card col-sm-8 col-lg-4 col-12 mx-auto  my-5 py-5 px-4 ">
                    <h2> Register </h2>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text" 
                                className="form-control"  
                                placeholder="Name"
                                onChange={(e)=>this.setState({name:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" 
                                className="form-control"  
                                placeholder="email@email.com"
                                onChange={(e)=>this.setState({email:e.target.value})}/>
                                
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Password</label>
                        <input type="password" 
                                className="form-control"  
                                placeholder="Password"
                                onChange={(e)=>this.setState({password:e.target.value})}/>
                                
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Confirm Password</label>
                        <input type="password" 
                                className="form-control"  
                                placeholder="Password"
                                onChange={(e)=>this.setState({confirmPassword:e.target.value})}
                                />
                       
                    </div>
                    <button className="btn btn-success"
                        onClick={(e)=>this.registerUser(e)}> Register </button>
                </div>
            </div>
        </>
    }
}