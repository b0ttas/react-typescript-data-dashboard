import * as React from 'react';
import "./AreaForm.scss";



function AreaForm() {
  return (
    <div className="areaform">
        <form>
            <input id="areaName" type="text" name="areaName" />
            <input id="areaCulture" type="text" name="areaCulture" />
            <input id="areaAcres" type="text" name="areaAcres" />
            <select id="deviceUID">
                <option value="device1">device1</option>
                <option value="device2">device2</option>
                <option value="device3">device3</option>
                <option value="device4">device4</option>
            </select>
        <input id="submit" type="submit" value="Submit" />
        </form>
    </div>
  );}

export default AreaForm;