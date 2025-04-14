import React, { useEffect, useState } from 'react';
import "../styles/AreaForm.scss";
import { fetchDevices } from '../deviceAPI';
import { postDB } from '../restAPI';
import { Link, useNavigate } from 'react-router-dom';

interface Device {
    id: string;
    name: string;
    type: string;
    location: string;
    lastActive: string;
}
const AddAreaForm = () => {

    //Set devices initially as an empty array
    const [devices, setDevices] = useState<Device[]>([]);
    const navigate = useNavigate();
    //fetch the devices when the component mounts
    useEffect(() => {
        fetchDevices()
            .then(setDevices)
    }, [])

    const initialFormState = { id: null, name: '', crop: '', area: '', device: '' }
    const [data, setData] = useState(initialFormState)

    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        console.log(data);
        postDB(data)
        setTimeout(() => navigate("/areas"), 2000);
    }

    return (
        <div className="areaForm">
            <form onSubmit={handleSubmit}>
                {/* Line 1: Area Name and Crop Name */}
                <div id="line" className="form-row">
                    <div id="left" className="form-field-group">
                        <label htmlFor="areaName">Nome da área *</label>
                        <input
                            type="text"
                            id="areaName"
                            name="name"
                            value={data.name}
                            required
                            onChange={handleInputChange}
                        />
                        <div className="after"></div>
                    </div>

                    <div id="right" className="form-field-group">
                        <label htmlFor="cropName">Nome da cultura *</label>
                        <input
                            type="text"
                            id="cropName"
                            name="crop"
                            value={data.crop}
                            required
                            onChange={handleInputChange}
                        />
                        <div className="after"></div>
                    </div>
                </div>

                {/* Line 2: Area Size and Sensor */}
                <div id="line" className="form-row">
                    <div id="left" className="form-field-group">
                        <label htmlFor="areaSize">Área (ha) *</label>
                        <input
                            type="number"
                            step="any"
                            min="0"
                            id="areaSize"
                            name="area"
                            value={data.area}
                            required
                            onChange={handleInputChange}
                        />
                        <div className="after"></div>
                    </div>

                    <div id="right" className="form-field-group">
                        <label htmlFor="deviceSensor">Sensor *</label>
                        <select
                            id="deviceSensor"
                            className="device"
                            name="device"
                            value={data.device}
                            required
                            onChange={handleInputChange}
                        >

                            <option value="" disabled hidden>Selecione um sensor...</option>
                            {devices.map(device => (
                                <option key={device.id} value={device.id}>
                                    {device.name}
                                </option>
                            ))}
                        </select>
                        <div className="after"></div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div id="right" className="options form-actions">
                    <Link to="/areas" id="cancel" className="button cancel-button">
                        Cancelar
                    </Link>
                    <button type="submit" id="save" className="button save-button">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddAreaForm;