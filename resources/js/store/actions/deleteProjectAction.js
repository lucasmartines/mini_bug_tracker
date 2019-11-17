
import {DELETE_PROJECT} from './types'

export const deleteProject = (id) => dispatch => {
	Axios.delete("project/"+id)
		.then(projects => dispatch({
            type:DELETE_PROJECT
        }))
		.catch( err =>{ 
        	console.log("erro: Não Autorizado "+ err ) 
    		alert("Erro, Não Autorizado: "+err)
        	dispatch({
	            type:FAIL_FETCH_BUGS,
	            payload:"Erro Não autorizado"
	        })

        })
}
