import React, { useEffect, useState } from 'react';
import Sensor from "./Sensor"
import { fetchDevices } from '../deviceAPI';

interface Device {
    id: string;
    name: string;
    type: string;
    location: string;
    lastActive: string;
}

function SensorList() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDevices = async () => {
            try {
                const data = await fetchDevices();
                setDevices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadDevices();
    }, []);

    if (loading) return <div>Loading devices...</div>;
    if (error) return <div>Error loading devices: {error}</div>;
    if (devices.length === 0) return <div>No devices found</div>;

    return (
        <div>
            {devices.map(device =>
                <Sensor key={device.id} deviceUID={device.id}
                />
            )}
        </div>);
}

export default SensorList;