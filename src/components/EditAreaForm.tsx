import React, {useEffect, useState} from 'react';
import "../styles/AreaForm.scss";
import {fetchDevices} from '../deviceAPI';
import {fetchIdDB, patchDB} from '../restAPI';
import {Link, useNavigate, useParams} from 'react-router-dom';

interface Device {
    id: string;
    name: string;
    type: string;
    location: string;
    lastActive: string;
}

interface AreaFormData {
    id?: string;
    name?: string;
    area?: number;
    crop?: string;
    device?: string;
}

const EditAreaForm = () => {
    const { id: areaId } = useParams<{ id: string }>(); // <-- Get ID from URL using useParams
    const navigate = useNavigate();

    const [devices, setDevices] = useState<Device[]>([]);
    // Single state for the form's data
    const [formData, setFormData] = useState<AreaFormData | null>(null); // Initialize as null or with default structure
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Combined useEffect for fetching initial data
    useEffect(() => {
        if (!areaId) {
            console.error("Area ID missing from URL");
            setError("ID da área inválido.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        Promise.all([
            fetchIdDB(areaId), // <-- Fetch using areaId from useParams
            fetchDevices()
        ])
            .then(([fetchedAreaData, fetchedDevices]) => {
                if (fetchedAreaData) {
                    setFormData(fetchedAreaData);
                } else {
                    throw new Error("Área não encontrada.");
                }
                setDevices(fetchedDevices);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setError(`Falha ao carregar dados: ${err.message}`);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [areaId]); // Dependency array

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        // Update the formData state
        setFormData(prevData => {
            if (!prevData) return null; // Should not happen if loaded
            return { ...prevData, [name]: value };
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formData || !formData.name || !formData.crop || !formData.area || !formData.device) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        console.log("Submitting data:", formData);
        patchDB(formData)
            .then(() => {
                console.log("Update successful");
                setTimeout(() => navigate("/areas"), 1000);
            })
            .catch(err => {
                console.error("Error updating data:", err);
                alert("Erro ao guardar as alterações.");
            });
    };

    // --- Loading and Error States ---
    if (loading) {
        return <div className="areaForm">A carregar...</div>;
    }

    if (error) {
        return <div className="areaForm error-message">{error}</div>;
    }

    // Render form only when formData is available
    if (!formData) {
        // This case should ideally be covered by loading/error states
        return <div className="areaForm">Não foi possível carregar os dados do formulário.</div>;
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
                            value={formData.name}
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
                            value={formData.crop}
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
                            value={formData.area}
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
                            value={formData.device}
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

export default EditAreaForm;