import React,{useState,useEffect} from 'react';



function CardData(props){
    return<>
        <div className={"card text-white  mb-3 col-12 col-md-3 mx-md-1  "+props.color+" "}>
            <div className="card-body">
                <h2 className="card-title h5 ">{props.title}</h2>
                <span className="card-text h1">{props.data}</span>
            </div>
        </div>
    </>
}
export default function Home() {
    
    let [userQuantity,setUserQtd] = useState(0)
    let [bugQuantity,setBugQtd] = useState(0)
    let [projectQuantity,setProjectQtd] = useState(0)

    useEffect(()=>{
        Axios.get("bug/count")
            .then(({data}) => setBugQtd(data.bugQuantity))
        Axios.get("user/count")  
            .then(({data}) => setUserQtd(data.userQuantity))
        Axios.get("project/count")     
            .then(({data}) => setProjectQtd(data.projectQuantity))
    },[])
    return <>
        <div 
            className="container pt-4 container-height">
             <h2>Home</h2>
            <div className="row justify-content-between mx-sm-0 mx-1">   
                <CardData title="Usuarios"  data={userQuantity} color="bg-primary"/>
                <CardData title="Bugs"  data={bugQuantity} color="bg-success"/>
                <CardData title="Tags"  data={projectQuantity} color="bg-secondary" />
            </div>
        </div>
    </>;
}
  