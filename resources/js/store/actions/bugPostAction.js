import {FETCH_BUGS,NEW_BUG,FAIL_FETCH_BUGS} from './types'


export const fetchBugs = () => dispatch =>{
    //console.log("FETCHING")

    Axios.get('/bug')
    	.then(bugs => dispatch({
            type:FETCH_BUGS,
            payload:bugs.data
        }))
        .catch( err =>{ 
        	console.log("erro: Não Autorizado "+ err ) 

        	dispatch({
	            type:FAIL_FETCH_BUGS,
	            payload:"Erro Não autorizado"
	        })

        })

    
}
