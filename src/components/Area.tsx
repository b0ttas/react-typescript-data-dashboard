import React, { useState } from 'react';
import "../styles/Area.scss";
import { deleteDB } from '../restAPI';
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

    const divStyle = (): React.CSSProperties => ({
        display: remove ? "none" : "block"
    });

    const handleRemove = () => {
        var id = [`${props.id}`];
        deleteDB(id);
        setRemove(!remove)
    }

    return (
        <div className="area" style={divStyle()}>
            <span id="title">{props.name}</span>
            <span id="content">{props.crop} - {props.area} ha</span>
            <img id="spacer" src={ItemSpacer} alt=""></img>
            <span id="options">
                <Link to={`/areas/edit/${props.id}`} id="edit">Editar</Link>
                <Link to="/areas" onClick={handleRemove} id="delete">Eliminar</Link>
            </span>
        </div>
    );
}

export default Area;