import React, { useState } from 'react';
import "./Area.scss";
import {deleteDB} from '../restAPI';
import ItemSpacer from '../resources/ItemSpacer.svg';
import { Link } from 'react-router-dom';

interface Props {
    id?: number;
    name?: string;
    area?: number;
    crop?: string;
    device?: string;
}

function Area(props: Props) {

    const [remove, setRemove] = useState(false);

    const handleRemove = () => {        
        //must re-render here, working tho
        var id = [`${props.id}`];
        console.log(id)
        deleteDB(id);
        setTimeout(()=>setRemove(!remove), 0);
    }

    return (
        <div className="area">
            <span id="title">{props.name}</span>
            <span id="content">{props.crop} - {props.area} ha</span>
            <img id="spacer" src={ItemSpacer} alt=""></img>
            <span id="options">
                <Link to={`areas/add/${props.id}`} id="edit">Editar</Link>
                <Link to="/areas" onClick={handleRemove} id="delete">Eliminar</Link>              
            </span>
        </div>
    );
}

export default Area;