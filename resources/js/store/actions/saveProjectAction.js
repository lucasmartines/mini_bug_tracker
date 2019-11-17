export const saveProject = () => dispatch => {
    Axios.post('/project')
        .then( project =>  dispatch ({
            type: STORE_PROJECT,
            payload: project.data
        })  ) 
        .catch( err =>{ 
        	console.log("erro: Não Autorizado "+ err ) 
    		alert("Erro, Não Autorizado: "+err)

    		 localStorage.setItem("token","")
        	dispatch({
	            type:FAIL_FETCH_BUGS,
	            payload:"Erro Não autorizado"
	        })

        });
}