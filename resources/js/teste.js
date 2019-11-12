*  store
*/   
const changeName = (val) =>{
   return {
       type:"CHANGE_NAME",
       payload:val
   }
}
const addPost = ( name , content ) => {
   return{
       type:"ADD_POST",
       payload:{
           name,
           content
       }
   }
}

const userReducer = (state = {},actions) => 
{   
   // mudar o estado do usuario

   
   if(actions.type == 'CHANGE_NAME'){
       state = {...state,name:actions.payload };
   }
   if(actions.type == "CHANGE_AGE"){
       state = {...state,age:actions.payload};
   }
   return state;
}

const postsReducer = (state = [],actions) => 
{
   if(actions.type == "ADD_POST")
   {
       let novoPost = { name: actions.payload.name , content:actions.payload.content };

       state = [...state,novoPost]
   }
   return state;
}

const reducers = combineReducers({
   user:userReducer,
   posts:postsReducer
} )

window.store = createStore(reducers,{
   "user":{
       "name":"lucas",
       "age":22
   },
   "posts":[]
});


store.subscribe(()=>{
   console.log(store.getState())
})
store.dispatch({type:"CHANGE_AGE",payload:23})

store.dispatch( changeName("Lucas Martines"))
store.dispatch(addPost("Post 001","Post conteudo"))
store.dispatch(addPost("Post 002","Post conteudo 2"))

