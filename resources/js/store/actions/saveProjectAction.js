export const saveProject = () => dispatch => {
    Axios.post('/project')
        .then( project => dispatch ({
            type: STORE_PROJECT,
            payload: project.data
        }) ) ;
}