import {LOAD_ROLES,FAIL_FETCH_BUGS} from './types'
import User from '../../providers/user.js';


export const loadRoles = () => dispatch => {
    //console.log("FETCHING")

    Axios.get('/roles')
    	.then(roles =>{ 
            
            dispatch({
                type:LOAD_ROLES,
                payload:roles.data
            })

        })
        .catch( err =>{ 
            User.logoutWhenStatusCodeNotAuthorized(err.response.status);

        }) 

    
}
