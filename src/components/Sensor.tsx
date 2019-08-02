import * as React from 'react';
import "../styles/Sensor.scss";

import ItemSpacer from '../resources/ItemSpacer.svg';
import { Link } from 'react-router-dom';

interface Props {
    areaName?: string;
    areaCulture?: string;
    deviceUID?: string;
    id?: number;
    key?: string;
}

function Sensor(props: Props) {

    return (
        <Link to={{ pathname: `sensores/view/${props.deviceUID}`}}>
            <div className="sensor">
                <span id="title">{props.deviceUID}</span>
                <span id="content">{props.areaName} - {props.areaCulture}</span>
                <img id="spacer" src={ItemSpacer} alt=""></img>
                <span id="options">
                    {/*
                    Links commented to avoid link nesting, also Sensors will only be read
                    <Link to={`sensores/${props.deviceUID}`} id="edit">Editar</Link>
                    <Link to="/sensores" onClick={() => setHidden(!isHidden)} id="delete">Eliminar</Link>*/}
                </span>
            </div>
        </Link>

    );
}

export default Sensor;