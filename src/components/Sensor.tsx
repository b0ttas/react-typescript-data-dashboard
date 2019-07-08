import * as React from 'react';
import "./Sensor.scss";

import ItemSpacer from '../resources/ItemSpacer.svg';

interface Props {
    areaName?: string;
    areaCulture?: string;
    deviceUID?: string;
    id?: number;
}

function Sensor(props: Props) {

    const divStyle = (): React.CSSProperties => ({
        display: isHidden ? "none" : "block"
    });

    const [isHidden, setHidden] = React.useState(false);

    return (
        <div className="sensor" style={divStyle()}>
            <span id="title">{props.deviceUID}</span>
            <span id="content">{props.areaName} - {props.areaCulture}</span>
            <img id="spacer" src={ItemSpacer} alt=""></img>
            <span id="options">
                <button id="edit">Editar</button>
                <button id="delete" onClick={() => setHidden(!isHidden)}>Eliminar</button>

            </span>
        </div>

    );
}

export default Sensor;