import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index.js'

import {loadUser} from './actions/loadUserAction';

const initialState = {}

let store = createStore(rootReducer,initialState,applyMiddleware(thunk))
window.store = store;

loadUser();


export default store;