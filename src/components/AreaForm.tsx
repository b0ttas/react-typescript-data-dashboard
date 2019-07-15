import React, { useEffect, useState } from 'react';
import "./AreaForm.scss";
import { fetchDevices } from '../deviceAPI';
import { postDB, patchDB } from '../restAPI';
import { Link, Redirect } from 'react-router-dom';


function AreaForm() {
    //Set devices initialy as an empty array
    const [devices, setDevices] = useState([]);
    //fetch the devices when the compnent mounts
    useEffect(() => {
        fetchDevices()
            .then(setDevices)
    }, [])

    const [redirect, setRedirect] = useState(false);
    const [name, setName] = useState<string>('');
    const [area, setArea] = useState<string>('');
    const [crop, setCrop] = useState<string>('');
    const [device, setDevice] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //if add, get id from length+1 postDB()
        //edit, get id from item patchDB()
        //in case POST leave id "" else {id}
        var id = "";
        var data = [id, name, crop, area, device];
        //patchDB(data);
        postDB(data);
        setTimeout(()=>setRedirect(true), 2000);
    }

    //must(?) receive coorrespondant Area component in edit cases
    //using a set flag for hasArea may be a easy way to read/write placeholder values and ids (if no id/area must receive lenght of db)
    return (
        <div className="areaform">
            {redirect ? <Redirect to="/areas" /> : null}
            <form onSubmit={handleSubmit}>
                <div id="line">
                    <fieldset id="left">
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Nome da área *"
                            required
                            onChange={e => setName(e.target.value)}
                        />
                        <div className="after"></div>
                    </fieldset>
                    <fieldset id="right">
                        <input type="text" name="crop" value={crop} placeholder="Nome da cultura *" required onChange={e => setCrop(e.target.value)} />
                        <div className="after"></div>
                    </fieldset>
                </div>
                <div id="line">
                    <fieldset id="left">
                        <input type="text" name="area" value={area} placeholder="Área (ha) *" required onChange={e => setArea(e.target.value)} />
                        <div className="after"></div>
                    </fieldset>
                    <fieldset id="right">
                        <select className="device" value={device} required onChange={e => setDevice(e.target.value)}>
                            <option value="" disabled hidden>Sensor *</option>
                            {devices.map(d => (<option key={d} value={d}>{d}</option>))}
                        </select>
                        <div className="after"></div>
                    </fieldset>
                </div>
                <div id="right" className="options">
                    <Link to="/areas" id="cancel">Cancelar</Link>
                    <button type="submit"></button>
                    {/*check react-router integration, button must be ruining spa*/}
                    <Link to="/areas" type="submit" id="save">Guardar</Link>
                </div>
            </form>
        </div>
    );
}

export default AreaForm;