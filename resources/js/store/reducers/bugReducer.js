import {FETCH_BUGS,NEW_BUG} from '../actions/types'

const initialState = {
    items:[],
    item:{}
}
export default function bugReducer ( state = initialState , action ) {
    switch( action.type){
        case FETCH_BUGS:
            return {
                ...state,
                items: action.payload
            }
            break;
        case NEW_BUG:
            break;
        default:
            return state;
            break;
    }
}