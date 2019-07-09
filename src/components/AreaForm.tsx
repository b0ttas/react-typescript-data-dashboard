import React, { useEffect, useState } from 'react';
import "./AreaForm.scss";
import { fetchDevices } from '../deviceAPI';


function AreaForm() {
    //Set devices initialy as an empty array
    const [devices, setDevices] = useState([]);
    //fetch the devices when the compnent mounts
    useEffect(() => {
        fetchDevices()
            .then(setDevices)
    }, [])

    return (
        <div className="areaform">
            <form>
                <div id="line">
                    <fieldset id="left">
                        <input type="text" name="areaName" placeholder="Nome da área *" required />
                        <div className="after"></div>
                    </fieldset>
                    <fieldset id="right">
                        <input type="text" name="areaCulture" placeholder="Nome da cultura *" required />
                        <div className="after"></div>
                    </fieldset>
                </div>
                <div id="line">
                    <fieldset id="left">
                        <input type="text" name="areaAcres" placeholder="Área (ha) *" required />
                        <div className="after"></div>
                    </fieldset>
                    <fieldset id="right">
                        <select className="select_box" required defaultValue="">
                            <option value="" disabled hidden>Sensor *</option>
                            {devices.map(d => (<option key={d} value={d}>{d}</option>))}
                        </select>
                        <div className="after"></div>
                    </fieldset>
                </div>
            </form>
            <div id="right">
                <button>Cancelar</button>
                <button id="submit">Guardar</button>
            </div>
        </div>
    );
}

export default AreaForm;