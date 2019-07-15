import React, { useEffect, useState } from 'react';
import Sensor from "./Sensor"

import { fetchDevices } from '../deviceAPI';

function SensorList() {

    //Set devices initialy as an empty array
    const [devices, setDevices] = useState([]);
    //fetch the devices when the compnent mounts
    useEffect(() => {
        fetchDevices()
            .then(setDevices)
    }, [])


    return (
        <div>
            {devices.map(d =>  <Sensor key={d} deviceUID={d} />)}
        </div>);
}

export default SensorList;