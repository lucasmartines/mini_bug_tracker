import React,{Component} from 'react';

export default class Login extends Component{

    constructor(){
        super()
      
        this.state = {
            name:"",
            password:"",
        }
        
    }
    componentDidMount(){
        if(localStorage.getItem("token")!== null && localStorage.getItem("token") !== ""){
            // props.history.push('/')
            window.location="/"

        }
    }
    loginUser(e)
    {

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
                console.log(e)
                localStorage.setItem("token","");
            })
        
            
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
                                onChange={(e)=>this.setState({name:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Password</label>
                        <input type="password" 
                                className="form-control"  
                                placeholder="Password"
                                onChange={(e)=>this.setState({password:e.target.value})}/>
                    </div>
                    <button className="btn btn-success"
                         onClick={(e)=>this.loginUser(e)}> Login </button>
                </div>
            </div>
        </>
    }
}