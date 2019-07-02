import * as React from 'react';
import "./SensorForm.scss";

//<label> for edit forms

function SensorForm() {
  return (
    <div className="sensorform">
        <form>
            <fieldset>
            <input id="areaName" type="text" name="areaName" placeholder="Nome da área *" required/>
            <div className="after"></div>
            </fieldset>
            <fieldset>
            <input id="areaCulture" type="text" name="areaCulture" placeholder="Nome da área *" required/>
            <div className="after"></div>
            </fieldset>
            <fieldset>
            <input id="areaAcres" type="text" name="areaAcres" placeholder="Nome da área *" required/>
            <div className="after"></div>
            </fieldset>
            <fieldset>
            <select className="select_box" id="deviceUID" required>
                <option value="" disabled selected hidden>Sensor *</option>
                <option value="0">device2</option>
                <option value="1">device3</option>
                <option value="2">device4</option>
            </select>
            <div className="after"></div>
            </fieldset>
            <fieldset>
        <button>Cancelar</button>
        <button id="submit">Guardar</button>
        </fieldset>
        </form>
    </div>
  );}

export default SensorForm;