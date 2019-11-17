import {FETCH_BUGS,NEW_BUG,FAIL_FETCH_BUGS} from '../actions/types'

const initialState = {
    items:[],
    // item:{},
    error:"",
    bugQuantity:0
}
export default function bugReducer ( state = initialState , action ) {
    switch( action.type){
        case FETCH_BUGS:
            return {
                ...state,
                items: action.payload
            }
            break;
        case FAIL_FETCH_BUGS:
            return {
                ...state,
                error: action.payload
            }
            break;
        case NEW_BUG:
            break;
        default:
            return state;
            break;
    }
}