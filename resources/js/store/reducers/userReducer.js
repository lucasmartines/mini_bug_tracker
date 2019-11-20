import {FETCH_USER} from '../actions/types'

const initialState = {
    user:{},
    error:""
}
export default function userReducer ( state = initialState , action ) {
    switch( action.type){
        case FETCH_USER:
            return {
                ...state,
                user: action.payload
            }
            break;
        default:
            return state;
            break;
    }
}