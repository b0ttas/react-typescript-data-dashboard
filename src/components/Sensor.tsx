import * as React from 'react';
import "./Sensor.scss";

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

    const divStyle = (): React.CSSProperties => ({
        display: isHidden ? "none" : "block"
    });

    const [isHidden, setHidden] = React.useState(false);

    return (
        <Link to={`sensores/${props.deviceUID}`}>
        <div className="sensor" style={divStyle()}>
            <span id="title">{props.deviceUID}</span>
            <span id="content">{props.areaName} - {props.areaCulture}</span>
            <img id="spacer" src={ItemSpacer} alt=""></img>
            <span id="options">
            <Link to={`sensores/${props.deviceUID}`} id="edit">Editar</Link>
            <Link to="/sensores" onClick={() => setHidden(!isHidden)} id="delete">Eliminar</Link>
            </span>
        </div>
        </Link>

    );
}

export default Sensor;