export default class User{
    
    static isLoggeIn(){
        if(localStorage.getItem("token").length > 20){
            // window.location = "/login";
            return true;
         }
         return false;
    }
    static logout(){
        if(localStorage.getItem("token").length > 20){
            localStorage.setItem("token","")
         }
    }
}