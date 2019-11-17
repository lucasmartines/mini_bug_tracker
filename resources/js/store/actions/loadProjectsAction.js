import {LOAD_PROJECTS,FAIL_FETCH_BUGS} from './types'


export const loadProjects = () => dispatch =>{
    //console.log("FETCHING")

    Axios.get('/project')
    	.then(projects => dispatch({
            type:LOAD_PROJECTS,
            payload:projects.data
        }))
        .catch( err =>{ 
            //console.log("erro: Não Autorizado "+ err ) 
    		// alert("Erro, Não Autorizado: "+err)
            localStorage.setItem("token","")

        	dispatch({
	            type:FAIL_FETCH_BUGS,
	            payload:"Erro Não autorizado"
	        })

        })

    
}
