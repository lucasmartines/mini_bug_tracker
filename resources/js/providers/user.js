export default class User{
    
    static isLoggeIn(){
        if(localStorage.getItem("token").length > 20){
            // window.location = "/login";
            return true;
         }
         else{
            Axios.post('logout')
         }
         return false;
    }
    static logout(){

         localStorage.setItem("token","")
    }
    static logoutWhenStatusCodeNotAuthorized(statusCode){
        if(statusCode == '401' || statusCode == '403'){
            
            //alert("Erro, Não Autorizado: "+statusCode)
            Axios.post('logout')
            localStorage.setItem("token","")
            window.location.reload(true)
        }
    }
    
}