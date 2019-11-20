
import User from '../../providers/user.js';
import {FETCH_USER} from './types'


export const loadUser = () => dispatch => {
    Axios.post('me')
        .then( data => {
            console.log(data)
            dispatch({
                type:FETCH_USER,
                payload: data.data
            })
            
        })
}