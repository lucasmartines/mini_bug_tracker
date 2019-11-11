import React,{Component} from 'react';



export default class Register extends Component{

    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return <>
            <div class="mx-1">
                <div className="card col-sm-8 col-lg-4 col-12 mx-auto  my-5 py-5 px-4 ">
                    <h2> Register </h2>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" 
                                class="form-control"  
                                placeholder="Name"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email" 
                                class="form-control"  
                                placeholder="email@email.com"/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Password</label>
                        <input type="password" 
                                class="form-control"  
                                placeholder="Password"/>
                    </div>
                    <button className="btn btn-success"> Register </button>
                </div>
            </div>
        </>
    }
}