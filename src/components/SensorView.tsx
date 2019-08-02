import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import '../styles/SensorView.scss'
import { fetchMoisture } from '../deviceAPI';

var timeInMs = Date.now(); //(ms) since 1 de janeiro de 1970 00:00:00 UTC
const weekInMs = 518400000; //7 days 604800000 gives 8 results, using 6 days;
var deviceID = ""
const agregation = "day"
const beginDate = timeInMs - weekInMs;
const endDate = timeInMs;

function SensorView(props: any) {
    type ExpectedResponse = {
        S1T: number;
        S2T: number;
        S3T: number;
        S4T: number;
        timestamp: number;
    }

    deviceID = window.location.pathname.substring(15);

    const [response, setResponse] = useState<Array<ExpectedResponse> | undefined>();

    useEffect(() => {
        fetchMoisture(deviceID, agregation, beginDate, endDate)
            .then(setResponse)
    }, [])

    var one = "", two = "", three = "", four = "", sum = "";

    if (response !== undefined) {

        let begin = "[";
        let end = "]";
        let add = 0;

        for (let value of response) {
            one = one + "{x: " + value.timestamp + ", y: " + value.S1T + "}, ";
            two = two + "{x: " + value.timestamp + ", y: " + value.S2T + "}, ";
            three = three + "{x: " + value.timestamp + ", y: " + value.S3T + "}, ";
            four = four + "{x: " + value.timestamp + ", y: " + value.S4T + "}, ";

            add = value.S1T + value.S2T + value.S3T + value.S4T;

            sum = sum + "{x: " + value.timestamp + ", y: " + add + "}, ";
        }

        one = begin + one.slice(0, -2) + end;
        two = begin + two.slice(0, -2) + end;
        three = begin + three.slice(0, -2) + end;
        four = begin + four.slice(0, -2) + end;
        sum = begin + sum.slice(0, -2) + end;
        
        //avoid eval by generating array of objects instead of strings
    }


    const data = {
        datasets: [{
            fill: false,
            label: "10cm",
            borderColor: '#F44336',
            backgroundColor: '#F44336',
            data: eval(one),
        }, {
            fill: false,
            label: "25cm",
            borderColor: '#FFC107',
            backgroundColor: '#FFC107',
            data: eval(two),
        }, {
            fill: false,
            label: "40cm",
            borderColor: '#2E7D32',
            backgroundColor: '#2E7D32',
            data: eval(three),
        }, {
            fill: false,
            label: "55cm",
            borderColor: '#2979FF',
            backgroundColor: '#2979FF',
            data: eval(four),
        },
        ]
    }

    const sumdata = {
        labels: ["Time Frame", "Dia", "Dia", "Dia"], //x-axis 
        datasets: [{
            fill: false,
            label: "Total",
            borderColor: '#2979FF',
            backgroundColor: '#2979FF',
            data: eval(sum),
        }]
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
            display: true,
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