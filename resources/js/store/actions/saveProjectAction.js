import User from '../../providers/user.js';
import {STORE_PROJECT} from './types'


export const saveProject = () => dispatch => {
    Axios.post('/project')
        .then( project =>  dispatch ({
            type: STORE_PROJECT,
            payload: project.data
        })  ) 
        .catch( err =>{ 
            User.logoutWhenStatusCodeNotAuthorized(err.response.status);

        	dispatch({
	            type:FAIL_FETCH_BUGS,
	            payload:"Erro Não autorizado"
	        })

        });
}