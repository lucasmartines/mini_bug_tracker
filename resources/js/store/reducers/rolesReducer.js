import * as projectAction from '../actions/types'

const initialState = []


const rolesReducer = ( state = initialState , action ) => {
	switch(action.type){
		case projectAction.LOAD_ROLES:
            return {
                ...state,
                items: action.payload
            }
            break;
		default:
		
		    return state;
		break;

	}
	
}
export default rolesReducer