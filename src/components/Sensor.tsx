import * as React from 'react';
import "./Sensor.scss";

import ItemSpacer from '../ItemSpacer.svg';

interface Props {
    areaName?: string;
    areaCulture?: string;
    deviceUID?: string;
    id?: number;
    isHidden?: boolean;
}

const divStyle = (props: Props): React.CSSProperties => ({
  display: props.isHidden ? "none" : "block"
});

function Sensor(props: Props) {

  const [isHidden, setHidden] = React.useState(false);
  console.log(isHidden);
  return (
    <div className="sensor" style={divStyle(props)}>
        <span id="title">{props.deviceUID}</span>
        <span id="content">{props.areaName} - {props.areaCulture}</span>
        <img id="spacer" src={ItemSpacer} alt=""></img>
        <span id="options">
          <a id="edit">Editar</a>
          <button id="delete" onClick={() => setHidden(!isHidden)}>Eliminar</button>
        </span>
    </div>
  );}

export default Sensor;