import * as React from 'react';
import "./SensorForm.scss";



function SensorForm() {
  return (
    <div className="sensorform">
        <form>
            <fieldset>
            <input id="areaName" type="text" name="areaName" required/>
            <label>Nome da área *</label>
            <div className="after"></div>
            </fieldset>
            <fieldset>
            <input id="areaCulture" type="text" name="areaCulture" />
            <label>Nome da área *</label>
            <div className="after"></div>
            </fieldset>
            <fieldset>
            <input id="areaAcres" type="text" name="areaAcres" />
            <label>Nome da área *</label>
            <div className="after"></div>
            </fieldset>
            <fieldset>
            <select id="deviceUID">
                <option value="device1">device1</option>
                <option value="device2">device2</option>
                <option value="device3">device3</option>
                <option value="device4">device4</option>
            </select>
            <label>Nome da área *</label>
            <div className="after"></div>
            </fieldset>
            <fieldset>
        <button id="submit" />
        </fieldset>
        </form>
    </div>
  );}

export default SensorForm;