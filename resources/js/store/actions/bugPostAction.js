import {FETCH_BUGS,NEW_BUG} from './types'


export const fetchBugs = () => dispatch =>{
    //console.log("FETCHING")

    Axios.get('/bug')
    	.then(bugs => dispatch({
            type:FETCH_BUGS,
            payload:bugs.data
        }))
    
    // fetch('/bug')
    //     .then(response => response.json())
    //     .then(bugs => dispatch({
    //         type:FETCH_BUGS,
    //         payload:bugs
    //     }))
    
}
