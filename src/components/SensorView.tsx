import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";

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
    const [data, setData] = useState([]);
    //fetch the values when the compnent mounts
    useEffect(() => {
        fetchMoisture()
            .then(setData)
    }, [])

    const sampledata = [
        ["Year", "10cm", "25cm", "40cm", "55cm"],
        ["2004", 1000, 400, 100, 230],
        ["2005", 100, 755, 500, 725],
        ["2006", 660, 1120, 132, 225],
        ["2007", 1030, 540, 800, 345]
    ];


    let numOr0 = (n: any) => isNaN(n) ? 0 : n

    //loop here
    var datasum = [
        [sampledata[0].slice(0, 1).toString(), "Sum"],
        [sampledata[1].slice(0, 1).toString(), sampledata[1].slice(1, sampledata[1].length).reduce((a, b) => numOr0(a) + numOr0(b))],
        [sampledata[2].slice(0, 1).toString(), sampledata[2].slice(1, sampledata[2].length).reduce((a, b) => numOr0(a) + numOr0(b))],
        [sampledata[3].slice(0, 1).toString(), sampledata[3].slice(1, sampledata[3].length).reduce((a, b) => numOr0(a) + numOr0(b))],
        [sampledata[4].slice(0, 1).toString(), sampledata[4].slice(1, sampledata[4].length).reduce((a, b) => numOr0(a) + numOr0(b))]
    ];

    console.log(datasum);

    const options = {
        series: {
            colors:[ '#F44336', '#FFC107', '#2E7D32','#2979FF']
          },
        hAxis: {
            title: 'Time',
            baselineColor: '#989898',
            gridlineColor: '#989898',
        },
        vAxis: {
            baselineColor: '#989898',
            gridlineColor: '#989898',
        },
        curveType: 'function',
        title: "Humidade do Solo",
    };

    const optionsSum = {
        hAxis: {
            title: 'Time',
            baselineColor: '#989898',
            gridlineColor: '#989898',
        },
        vAxis: {
            baselineColor: '#989898',
            gridlineColor: '#989898',
        },

        curveType: 'function',
    };

    return (
        <div className="sensorview">
            <Chart
                chartType="LineChart"
                data={sampledata}
                options={options}
                width="960px"
                height="400px"
                legendToggle
            />
            <Chart
                chartType="LineChart"
                data={datasum}
                options={optionsSum}
                width="960px"
                height="400px"
                legendToggle
            />
        </div>
    )
}
export default SensorView;