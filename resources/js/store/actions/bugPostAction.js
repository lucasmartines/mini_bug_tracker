import {FETCH_BUGS,NEW_BUG} from './types'

export const fetchBugs = () => dispatch =>{
    console.log("FETCHING")
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(bugs => dispatch({
            type:FETCH_BUGS,
            payload:bugs
        }))
    
}