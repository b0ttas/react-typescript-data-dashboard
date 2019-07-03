import * as React from 'react';
import "./Area.scss";

import ItemSpacer from '../resources/ItemSpacer.svg';

interface Props {
    areaName?: string;
    areaCulture?: string;
    areaAcres?: number;
    deviceUID?: string;
    id?: number;
}

function Area(props: Props) {

    const divStyle = (): React.CSSProperties => ({
        display: isHidden ? "none" : "block"
    });

    const [isHidden, setHidden] = React.useState(false);

    return (
        <div className="area" style={divStyle()}>
            <span id="title">{props.areaName}</span>
            <span id="content">{props.areaCulture} - {props.areaAcres} ha</span>
            <img id="spacer" src={ItemSpacer} alt=""></img>
            <span id="options">
                <button id="edit">Editar</button>
                <button id="delete" onClick={() => setHidden(!isHidden)}>Eliminar</button>

            </span>
        </div>
    );
}



export default Area;