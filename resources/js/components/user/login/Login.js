import React,{Component} from 'react';

export default class Login extends Component{

    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return <>
            <div class="mx-1">
                <div className="card col-sm-8 col-lg-4 col-12 mx-auto  my-5 py-5 px-4 ">
                    <h2> Login </h2>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" 
                                class="form-control"  
                                placeholder="Name"/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Password</label>
                        <input type="password" 
                                class="form-control"  
                                placeholder="Password"/>
                    </div>
                    <button className="btn btn-success"> Login </button>
                </div>
            </div>
        </>
    }
}