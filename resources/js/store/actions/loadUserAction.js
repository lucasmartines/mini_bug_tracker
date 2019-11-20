
import User from '../../providers/user.js';
import {FETCH_USER} from './types'
import store from '../store'

export const loadUser = () => {
    console.log("av")
    Axios.post('me')
        .then( data => {
            
            store.dispatch({
                type:FETCH_USER,
                payload: data.data
            })
            
        })
}