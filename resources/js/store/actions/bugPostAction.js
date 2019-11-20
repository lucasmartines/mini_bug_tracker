import {FETCH_BUGS,NEW_BUG,FAIL_FETCH_BUGS} from './types'
import User from '../../providers/user.js';

export const fetchBugs = () => dispatch =>{
    //console.log("FETCHING")

    Axios.get('/bug')
    	.then(bugs => dispatch({
            type:FETCH_BUGS,
            payload:bugs.data
        }))
        .catch( err =>{ 

            User.logoutWhenStatusCodeNotAuthorized(err.response.status);
    
        	dispatch({
	            type:FAIL_FETCH_BUGS,
	            payload:"Erro Não autorizado"
	        })

        })

    
}
