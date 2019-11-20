import {LOAD_PROJECTS,FAIL_FETCH_BUGS} from './types'
import User from '../../providers/user.js';


export const loadProjects = () => dispatch =>{
    //console.log("FETCHING")

    Axios.get('/project')
    	.then(projects => dispatch({
            type:LOAD_PROJECTS,
            payload:projects.data
        }))
        .catch( err =>{ 
            User.logoutWhenStatusCodeNotAuthorized(err.response.status);

        	dispatch({
	            type:FAIL_FETCH_BUGS,
	            payload:"Erro Não autorizado"
	        })

        })

    
}
