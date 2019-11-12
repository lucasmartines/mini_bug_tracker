import React from 'react';



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
    return <>
        <div 
            className="container pt-4">
             <h2>Home</h2>
            <div className="row justify-content-between mx-sm-0 mx-1">   
                <CardData title="Usuarios"  data={5} color="bg-primary"/>
                <CardData title="Bugs"  data={2} color="bg-success"/>
                <CardData title="Tags"  data={3} color="bg-secondary" />
            </div>
        </div>
    </>;
}
  