import * as React from 'react';
import "./Area.scss";

import ItemSpacer from '../ItemSpacer.svg';


interface Props {
    areaName?: string;
    areaCulture?: string;
    areaAcres?: number;
    deviceUID?: string;
    id?: number;
}

function Area(props: Props) {
  return (
    <div className="area">
      <span id="title">{props.areaName}</span>
      <span id="content">{props.areaCulture} - {props.areaAcres} ha</span>
      <img id="spacer" src={ItemSpacer} alt=""></img>
      <span id="options">
        <a id="edit" href="#">Editar</a>
        <a id="delete" href="#">Eliminar</a>
      </span>
    </div>
  );}



export default Area;