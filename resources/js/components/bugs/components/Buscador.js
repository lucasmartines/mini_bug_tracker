import React,{useState,useEffect} from 'react'
import {Form,Modal,Button,Card,InputGroup,FormControl} from 'react-bootstrap';


/**
 * se o usuario apertar enter então dá o enter
 */
function onEnter(e,callback){
    if(e.key == 'Enter'){
        callback(e);
    }
}

export default function Buscador(props)
{

    let [busca,setBusca] = useState('');

    
    return<>
        <Card className="my-2">
            <Card.Header>
                <h2> 
                    <i className="material-icons">  bug_report  </i>
                    Admin Bugs Panel
                </h2>     
            </Card.Header>
            <Card.Body>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Buscar"
                    onChange = {e => { setBusca( e.target.value);  } }
                />
                <InputGroup.Append>
                    <Button 
                        variant="outline-secondary"
                        onClick={ e => props.onClick(busca)}>Buscar</Button>
                </InputGroup.Append>
            </InputGroup>
            </Card.Body>
        </Card>
    </>
}