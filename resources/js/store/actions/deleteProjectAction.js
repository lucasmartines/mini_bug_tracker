
import {DELETE_PROJECT,FAIL_FETCH_BUGS} from './types'
import User from '../../providers/user.js';

export const deleteProject = (id) => dispatch => {
	Axios.delete("project/"+id)
		.then(projects => dispatch({
            type:DELETE_PROJECT
        }))
		.catch( err =>{ 

            User.logoutWhenStatusCodeNotAuthorized(err.response.status);
			
			
        	dispatch({
	            type:FAIL_FETCH_BUGS,
	            payload:"Erro Não autorizado"
	        })

        })
}
