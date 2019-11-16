import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index.js'
const initialState = {}

let store = createStore(rootReducer,initialState,applyMiddleware(thunk))
window.store = store;

export default store;