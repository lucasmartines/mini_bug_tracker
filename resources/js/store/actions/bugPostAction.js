import {FETCH_BUGS,NEW_BUG,FAIL_FETCH_BUGS} from './types'
import User from '../../providers/user.js';

export const  fetchBugs = (url) => dispatch =>  {
    //console.log("FETCHING")
    let bugData = {}
     Axios.get(url)
    	.then(bugs => {
            dispatch({
                type:FETCH_BUGS,
                payload:bugs.data
            }) 
            bugData = bugs;
        })
        .catch( err =>{ 

            User.logoutWhenStatusCodeNotAuthorized(err.response.status);
    
        	dispatch({
	            type:FAIL_FETCH_BUGS,
	            payload:"Erro Não autorizado"
	        })

        })

        return bugData
    
}
