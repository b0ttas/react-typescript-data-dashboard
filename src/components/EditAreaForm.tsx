import React, {useEffect, useState} from 'react';
import "../styles/AreaForm.scss";
import {fetchDevices} from '../deviceAPI';
import {patchDB} from '../restAPI';
import {Link, useNavigate} from 'react-router-dom';

interface Device {
    id: string;
    name: string;
    type: string;
    location: string;
    lastActive: string;
}

const EditAreaForm = () => {

    //Set devices initially as an empty array
    const [devices, setDevices] = useState<Device[]>([]);
    const navigate = useNavigate();
    //fetch the devices when the component mounts
    useEffect(() => {
        fetchDevices()
            .then(setDevices)
    }, [])

    const initialFormState = { id: '', name: '', crop: '', area: '', device: '' }
    const [data, setData] = useState(initialFormState)

    const handleInputChange = (event: any) => {
        const { name, value } = event.target

        setData({ ...data, [name]: value })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        //if (!data.name || !data.crop) return check empty fields?
        data.id = window.location.pathname.substring(12);
        console.log(data);
        // props.addData(data)
        //setData(initialFormState)
        patchDB(data);
        setTimeout(() => navigate("/areas"), 2000);
    }

    return (
        <div className="areaform">
            <form onSubmit={handleSubmit}>
                <div id="line">
                    <fieldset id="left">
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            placeholder="Nome da área *"
                            required
                            onChange={handleInputChange} />
                        <div className="after"></div>
                    </fieldset>
                    <fieldset id="right">
                        <input type="text" name="crop" value={data.crop} placeholder="Nome da cultura *" required onChange={handleInputChange} />
                        <div className="after"></div>
                    </fieldset>
                </div>
                <div id="line">
                    <fieldset id="left">
                        <input type="text" name="area" value={data.area} placeholder="Área (ha) *" required onChange={handleInputChange} />
                        <div className="after"></div>
                    </fieldset>
                    <fieldset id="right">
                        <select className="device" name="device" value={data.device} required onChange={handleInputChange}>
                            <option value="" disabled hidden>Sensor *</option>
                            {devices.map(device => (<option key={device.id} value={device.id}>{device.name}</option>))}
                        </select>
                        <div className="after"></div>
                    </fieldset>
                </div>
                <div id="right" className="options">
                    <Link to="/areas" id="cancel">Cancelar</Link>
                    <button type="submit" id="save">Guardar</button>
                </div>
            </form>
        </div>
    );
}

export default EditAreaForm;