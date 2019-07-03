import * as React from 'react';
import "./SensorForm.scss";


function SensorForm() {
    return (
        <div className="sensorform">
            <form>
                <div id="line">
                    <fieldset id="left">
                        <input type="text" name="sensorName" placeholder="Nome do sensor *" required />
                        <div className="after"></div>
                    </fieldset>
                    <fieldset id="right">
                        <input type="text" name="areaName" placeholder="Nome da área *" required />
                        <div className="after"></div>
                    </fieldset>
                </div>
                <div id="line">
                    <fieldset id="left">
                        <input type="text" name="sensorCulture" placeholder="Nome da cultura *" required />
                        <div className="after"></div>
                    </fieldset>
                    <fieldset id="right">
                        <select className="select_box" required>
                            <option value="" disabled selected hidden>Sensor *</option>
                            <option value="0">device2</option>
                            <option value="1">device3</option>
                            <option value="2">device4</option>
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

export default SensorForm;