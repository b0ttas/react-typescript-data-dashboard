import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import './SensorView.scss'
import { fetchMoisture } from '../deviceAPI';
 
var timeInMs = Date.now(); //(ms) since 1 de janeiro de 1970 00:00:00 UTC
const weekInMs = 604800000;

function SensorView(props: any) {

    /*sample response

    "S4T": 15.776285714285716,
    "S2T": 15.45042857142857,
    "S3T": 16.147714285714283,
    "S1T": 14.447571428571427,
    "timestamp": 1512950400000
    */

    //Set data initialy as an empty array
    /*  const [data, setData] = useState([]);
      //fetch the values when the compnent mounts
      useEffect(() => {
          fetchMoisture()
              .then(setData)
      }, [])
  */

    const data = {
        labels: ["Time Frame", "Dia", "Dia", "Dia"], //x-axis 
        datasets: [{
            fill:false,
            label: "10cm",
            borderColor: '#F44336',
            backgroundColor:'#F44336',
            data: [1000, 400, 100, 230],
        }, {
            fill:false,
            label: "25cm",
            borderColor: '#FFC107',
            backgroundColor:'#FFC107',
            data: [100, 755, 500, 725],
        }, {
            fill:false,
            label: "40cm",
            borderColor: '#2E7D32',
            backgroundColor:'#2E7D32',
            data: [660, 1120, 132, 225],
        }, {
            fill:false,
            label: "55cm",
            borderColor: '#2979FF',
            backgroundColor:'#2979FF',  
            data: [1030, 540, 800, 345],
        },
        ]
    }

    return (
        <div className="sensorview">
            <Line
                data={data}
                width={960}
                height={400}
            />
            <Line
                data={data}
                width={960}
                height={400}
            />
        </div>
    )
}
export default SensorView;