import React,{Component} from 'react';
import User from '../../../providers/user';
import SimpleReactValidator from 'simple-react-validator';

export default class Login extends Component{

    constructor(props){ 
        super(props)
        

        this.state = {
            name:"",
            password:"",
        }
        this.validator = new SimpleReactValidator();

        
    }
 
    componentDidMount(){
        if(User.isLoggeIn()){
            props.history.push('/')
            //window.location="/"
        }

    }
    loginUser(e)
    {
        if(this.validator.allValid()){
            let user = {
                name:this.state.name,
                password:this.state.password,
            }
            Axios.post("/login",user)
                .then((response)=>{
                    localStorage.setItem("token",response.data.access_token);
                    window.location="/"
                    console.log(localStorage.getItem('token'))
                })
                .catch((e)=>{
                    alert("Erro nome ou senha não estão certos!")
                    localStorage.setItem("token","");
                })
        }
        else{
          //  alert("fail please fill all the fields!")
            this.validator.showMessages();
            this.forceUpdate();
        }
        
        
            
    }
    render(){
        return <>
            <div className="mx-1 container-height">
                <div className="card col-sm-8 col-lg-4 col-12 mx-auto  my-5 py-5 px-4 ">
                    <h2> Login </h2>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text" 
                                className="form-control"  
                                placeholder="Name"
                                onChange={(e)=>this.setState({name:e.target.value})}
                                defaultValue={this.state.name}/>
                        <p className="text-danger">{this.validator.message('name', this.state.name, 'required|alpha')}</p>

                    </div>
                    <div className="form-group"> 
                        <label htmlFor="exampleInputEmail1">Password</label>
                        <input type="password" 
                                className="form-control"  
                                placeholder="Password"
                                onChange={(e)=>this.setState({password:e.target.value})}/>
                         <p className="text-danger">{this.validator.message('password', this.state.password, 'required|alpha')}</p>
                    </div>
                    <button className="btn btn-success"
                         onClick={(e)=>this.loginUser(e)}> Login </button>
                </div>
            </div>
        </>
    }
}