import {combineReducers} from 'redux'

import bugReducer from './bugReducer'
import projectReducer from './projectReducer.js'


export default combineReducers({
    bugs:bugReducer,
    projects:projectReducer
})