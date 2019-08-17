import React, { useEffect, useState } from 'react';
import { Line, defaults } from 'react-chartjs-2';

import '../styles/SensorView.scss'
import { fetchMoisture } from '../deviceAPI';
import { number, bool } from 'prop-types';

var timeInMs = Date.now(); //(ms) since 1 de janeiro de 1970 00:00:00 UTC
const weekInMs = 518400000; //7 days 604800000 gives 8 results, using 6 days;
var deviceID = ""
const agregation = "day"
const beginDate = timeInMs - weekInMs;
const endDate = timeInMs;

var disabledLegend: number;

function SensorView(props: any) {
    type ExpectedResponse = {
        S1T: number;
        S2T: number;
        S3T: number;
        S4T: number;
        timestamp: number;
    }

    type Series = {
        x: number,
        y: number,
    }

    deviceID = window.location.pathname.substring(15);

    const [response, setResponse] = useState<Array<ExpectedResponse> | undefined>();

    const [isVisible, setVisible] = useState([true, true, true, true]);
    const [disabledLegend, setDisabled] = useState(-1)

    let one: Array<Series> = [],
        two: Array<Series> = [],
        three: Array<Series> = [],
        four: Array<Series> = [],
        sum: Array<Series> = [],
        holder = [one, two, three, four, sum];

    useEffect(() => {
        fetchMoisture(deviceID, agregation, beginDate, endDate)
            .then(setResponse)
    }, [])

    if (response !== undefined) {

        let total = 0;

        for (let value of response) {
            one.push({ x: value.timestamp, y: value.S1T });
            two.push({ x: value.timestamp, y: value.S2T });
            three.push({ x: value.timestamp, y: value.S3T });
            four.push({ x: value.timestamp, y: value.S4T });

            let auxS1T = value.S1T, auxS2T = value.S2T, auxS3T = value.S3T, auxS4T = value.S4T;

            if (isVisible[0] === false) { auxS1T = 0 }
            if (isVisible[1] === false) { auxS2T = 0 }
            if (isVisible[2] === false) { auxS3T = 0 }
            if (isVisible[3] === false) { auxS4T = 0 }

            total = auxS1T + auxS2T + auxS3T + auxS4T;

            sum.push({ x: value.timestamp, y: total });
        }

        let aux = holder;

        for (let i = 0; i <= 3; i++) {
            if (isVisible[i] === false) {
                holder[i] = []
            }
            else {
                holder[i] = aux[i]
            }
        }
    }


    var data = {
        datasets: [{
            fill: false,
            label: '10cm',
            borderColor: '#F44336',
            backgroundColor: '#F44336',
            data: holder[0],
        }, {
            fill: false,
            label: "25cm",
            borderColor: '#FFC107',
            backgroundColor: '#FFC107',
            data: holder[1],
        }, {
            fill: false,
            label: "40cm",
            borderColor: '#2E7D32',
            backgroundColor: '#2E7D32',
            data: holder[2],
        }, {
            fill: false,
            label: "55cm",
            borderColor: '#2979FF',
            backgroundColor: '#2979FF',
            data: holder[3],
        },
        ]
    }

    var sumdata = {
        labels: ["Time Frame", "Dia", "Dia", "Dia"], //x-axis 
        datasets: [{
            fill: false,
            label: "Total",
            borderColor: '#2979FF',
            backgroundColor: '#2979FF',
            data: holder[4],
        }]
    }

    function Legend() {
        const dotStyle1 = { backgroundColor: data.datasets[0].backgroundColor, };
        const dotStyle2 = { backgroundColor: data.datasets[1].backgroundColor, };
        const dotStyle3 = { backgroundColor: data.datasets[2].backgroundColor, };
        const dotStyle4 = { backgroundColor: data.datasets[3].backgroundColor, };

        var click1 = () => setVisible([!isVisible[0], isVisible[1], isVisible[2], isVisible[3]]);
        var click2 = () => setVisible([isVisible[0], !isVisible[1], isVisible[2], isVisible[3]]);
        var click3 = () => setVisible([isVisible[0], isVisible[1], !isVisible[2], isVisible[3]]);
        var click4 = () => setVisible([isVisible[0], isVisible[1], isVisible[2], !isVisible[3]]);

        const legendStyle = (isVisible: boolean): React.CSSProperties => ({
            textDecoration: isVisible ? "none" : "line-through",
        });


        if (isVisible.filter(Boolean).length === 1) {
            setDisabled(isVisible.findIndex(Boolean));
            switch (disabledLegend) {
                case 0:
                    click1 = () => undefined;
                    break;
                case 1:
                    click2 = () => undefined;
                    break;
                case 2:
                    click3 = () => undefined;
                    break;
                case 3:
                    click4 = () => undefined;
                    break;
            }
        }

        return (
            <ul>
                <li key={data.datasets[0].label} onClick={click1}>
                    <span className="dot" style={dotStyle1}></span>
                    <span className="legend-text" style={legendStyle(isVisible[0])}>{data.datasets[0].label}</span>
                </li>
                <li key={data.datasets[1].label} onClick={click2}>
                    <span className="dot" style={dotStyle2}></span>
                    <span className="legend-text" style={legendStyle(isVisible[1])}>{data.datasets[1].label}</span>
                </li>
                <li key={data.datasets[2].label} onClick={click3}>
                    <span className="dot" style={dotStyle3}></span>
                    <span className="legend-text" style={legendStyle(isVisible[2])}>{data.datasets[2].label}</span>
                </li>
                <li key={data.datasets[3].label} onClick={click4}>
                    <span className="dot" style={dotStyle4}></span>
                    <span className="legend-text" style={legendStyle(isVisible[3])}>{data.datasets[3].label}</span>
                </li>
            </ul>
        )
    }

    const options = {
        responsive: true,
        title: {
            display: false,
            text: 'Humidade do solo',
            position: 'top',
            fontColor: '#00C4B3',
        },
        legend: {
            display: false,
            position: 'top',
            labels: {
                boxWidth: 5,
                usePointStyle: true,
            },
        },
        scales: {
            xAxes: [{
                distribution: 'linear',
                type: 'time',
                time: {
                    unit: 'day',
                    unitStepSize: 1,
                    //tooltipFormat: 'll'
                    displayFormats: {
                        'millisecond': 'MMM DD',
                        'second': 'MMM DD',
                        'minute': 'MMM DD',
                        'hour': 'MMM DD',
                        'day': 'MMM DD',
                        'week': 'MMM DD',
                        'month': 'MMM DD',
                        'quarter': 'MMM DD',
                        'year': 'MMM DD',
                    }
                },
                scaleLabel: {
                    display: true,
                    //labelString: 'time'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    //labelString: 'value'
                }
            }]
        }
    }

    const options_sum = {

        legend: {
            display: false,
        }
    }


    if (response !== undefined) {
        return (
            <div className="sensorview">
                <p className="title">Humidade do solo</p>
                <Legend />
                <Line
                    data={data}
                    options={options}
                    width={960}
                    height={400}
                />
                <Line
                    data={sumdata}
                    options={options_sum}
                    width={960}
                    height={400}
                />
            </div>
        );
    }
    else {
        return (
            <></>
        )
    }
}
export default SensorView;