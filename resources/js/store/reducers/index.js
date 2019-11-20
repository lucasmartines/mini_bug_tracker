import {combineReducers} from 'redux'

import bugReducer from './bugReducer'
import projectReducer from './projectReducer.js'
import rolesReducer from './rolesReducer.js'
import userReducer from './userReducer.js'


export default combineReducers({
    bugs:bugReducer,
    projects:projectReducer,
    roles:rolesReducer,
    users:userReducer
})