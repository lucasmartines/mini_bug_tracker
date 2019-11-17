import * as projectAction from '../actions/types'

const initialState = []


const projectReducer = ( state = initialState , action ) => {
	switch(action.type){
		case projectAction.STORE_PROJECT:
			//let old_projects = state;
			//old_projects.projects.push(action.payload.data);
			console.log(action.payload)
			return [...state,action.payload];
		break;
		case projectAction.LOAD_PROJECTS:

			return action.payload;
		case projectAction.DELETE_PROJECT:
			return state
		break;
		default:
		
		return state;
		break;

	}
	
}
export default projectReducer