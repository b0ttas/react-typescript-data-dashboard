import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
// *** IMPORTANT: Make sure Chart.js components are registered ***
// Usually done in your main app file (e.g., index.js or App.js)
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend as ChartJsLegend, // Rename to avoid conflict with custom Legend
//   TimeScale, // Import TimeScale
// } from 'chart.js';
// import 'chartjs-adapter-date-fns'; // Or your preferred adapter

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   ChartJsLegend,
//   TimeScale // Register TimeScale
// );
// ***************************************************************


import '../styles/SensorView.scss';
import { fetchMoisture } from '../deviceAPI'; // Assuming this returns Promise<MoistureData[]>
import calendar from '../resources/calendar.svg';

interface MoistureData {
    S1T: number;  // 10cm depth
    S2T: number;  // 25cm depth
    S3T: number;  // 40cm depth
    S4T: number;  // 55cm depth
    timestamp: number; // Assuming this is a Unix timestamp (milliseconds)
}

interface SeriesData {
    x: number;
    y: number;
}

// --- Define constants outside the component ---
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
const AGGREGATION = "day";
// Calculate dates once, potentially outside or using useState/useRef if they need to be dynamic but stable
const endDate = Date.now();
const beginDate = 0;

// --- Define colors outside ---
const COLORS = {
    S1: '#F44336', // 10cm
    S2: '#FFC107', // 25cm
    S3: '#2E7D32', // 40cm
    S4: '#2979FF', // 55cm
    SUM: '#673AB7', // Example color for Sum
};

// --- Custom Legend Component (moved outside SensorView) ---
interface CustomLegendProps {
    datasets: { label: string; backgroundColor: string }[];
    isVisible: boolean[];
    onToggle: (index: number) => void;
}

const CustomLegend: React.FC<CustomLegendProps> = React.memo(({ datasets, isVisible, onToggle }) => {
    const handleToggle = (index: number) => {
        const currentlyVisibleCount = isVisible.filter(Boolean).length;
        // Prevent hiding the last visible item
        if (currentlyVisibleCount === 1 && isVisible[index]) {
            console.log("Cannot hide the last visible sensor.");
            return;
        }
        onToggle(index);
    };

    const getLegendStyle = (visible: boolean): React.CSSProperties => ({
        textDecoration: visible ? "none" : "line-through",
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
    });

    const getDotStyle = (color: string): React.CSSProperties => ({
        backgroundColor: color,
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '8px',
    });

    return (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {datasets.map((dataset, index) => (
                <li key={dataset.label} onClick={() => handleToggle(index)} style={getLegendStyle(isVisible[index])}>
                    <span style={getDotStyle(dataset.backgroundColor)}></span>
                    <span>{dataset.label}</span>
                </li>
            ))}
        </ul>
    );
});
// --- End Custom Legend Component ---


function SensorView(props: any) { // Consider defining props interface if any are passed
    // Extract deviceID (Consider using React Router's useParams for better practice)
    const deviceID = useMemo(() => window.location.pathname.substring(15), []);

    const [moistureData, setMoistureData] = useState<MoistureData[] | null>(null);
    const [isVisible, setIsVisible] = useState<boolean[]>([true, true, true, true]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data on mount or when relevant dependencies change
    useEffect(() => {
        setIsLoading(true);
        setError(null);
        console.log(`Workspaceing data for device ${deviceID} from ${new Date(beginDate)} to ${new Date(endDate)}`);

        fetchMoisture(deviceID, AGGREGATION, beginDate, endDate)
            .then(data => {
                // Sort data by timestamp if not already sorted by API
                console.log(data);
                data.sort((a:MoistureData, b:MoistureData) => a.timestamp - b.timestamp);
                setMoistureData(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch moisture data:", err);
                setError("Failed to load sensor data. Please try again later.");
                setIsLoading(false);
            });
        // Dependencies: Only include variables that, if changed, should trigger a refetch.
        // beginDate and endDate are constant in this setup. AGGREGATION is also constant.
    }, [deviceID]); // Add AGGREGATION, beginDate, endDate if they can change reactively

    // Memoize chart data preparation
    const chartDatasets = useMemo(() => {
        if (!moistureData) return [];

        return [
            {
                fill: false,
                label: '10cm',
                borderColor: COLORS.S1,
                backgroundColor: COLORS.S1,
                data: moistureData.map(d => ({ x: d.timestamp, y: d.S1T })),
                hidden: !isVisible[0], // Control visibility via 'hidden' property
            },
            {
                fill: false,
                label: "25cm",
                borderColor: COLORS.S2,
                backgroundColor: COLORS.S2,
                data: moistureData.map(d => ({ x: d.timestamp, y: d.S2T })),
                hidden: !isVisible[1],
            },
            {
                fill: false,
                label: "40cm",
                borderColor: COLORS.S3,
                backgroundColor: COLORS.S3,
                data: moistureData.map(d => ({ x: d.timestamp, y: d.S3T })),
                hidden: !isVisible[2],
            },
            {
                fill: false,
                label: "55cm",
                borderColor: COLORS.S4,
                backgroundColor: COLORS.S4,
                data: moistureData.map(d => ({ x: d.timestamp, y: d.S4T })),
                hidden: !isVisible[3],
            },
        ];
    }, [moistureData, isVisible]);

    const sumChartDataset = useMemo(() => {
        if (!moistureData) return [];

        const sumData: SeriesData[] = moistureData.map(value => {
            let total = 0;
            // Only include visible sensors in the sum
            if (isVisible[0]) total += value.S1T;
            if (isVisible[1]) total += value.S2T;
            if (isVisible[2]) total += value.S3T;
            if (isVisible[3]) total += value.S4T;
            return { x: value.timestamp, y: total };
        });

        return [{
            fill: false,
            label: "Total Visible", // Label reflects what's being summed
            borderColor: COLORS.SUM,
            backgroundColor: COLORS.SUM,
            data: sumData,
        }];
    }, [moistureData, isVisible]); // Sum MUST depend on isVisible

    // Chart options (memoized)
    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false, // Allow chart height to be controlled by container/props
        plugins: { // Use plugins object for title, legend, etc. in Chart.js v3+
            title: {
                display: false, // Kept false as per original
                // text: 'Humidade do solo',
                // position: 'top',
                // fontColor: '#00C4B3', // Note: fontColor might be just 'color' in v3+
            },
            legend: {
                display: false, // We are using a custom legend
            },
            tooltip: {
                mode: 'index' as const, // Show tooltips for all datasets at that index
                intersect: false,
            },
        },
        scales: {
            x: { // Use 'x' instead of 'xAxes' in v3+
                type: 'time' as const, // Explicitly type as 'time'
                time: {
                    unit: 'day' as const,
                    // tooltipFormat: 'MMM dd, yyyy HH:mm', // Example detailed format
                    displayFormats: {
                        day: 'MMM dd' // Format for day unit
                    }
                },
                title: { // Use 'title' for axis labels
                    display: true,
                    text: 'Date'
                }
            },
            y: { // Use 'y' instead of 'yAxes' in v3+
                beginAtZero: true, // Often useful for moisture data
                title: {
                    display: true,
                    text: 'Moisture Value' // Example axis title
                }
            }
        },
        interaction: { // Improves hover/tooltip behavior
            mode: 'index' as const,
            intersect: false,
        },
    }), []); // Empty dependency array as options are static here

    // Callback for toggling visibility
    const handleLegendToggle = useCallback((index: number) => {
        setIsVisible(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    }, []); // No dependencies needed for setIsVisible setter

    // --- Render Logic ---
    if (isLoading) {
        return <div className="sensorview loading">Loading sensor data...</div>;
    }

    if (error) {
        return <div className="sensorview error">Error: {error}</div>;
    }

    if (!moistureData || moistureData.length === 0) {
        return <div className="sensorview nodata">No moisture data available for the selected period.</div>;
    }

    // Prepare data objects for charts
    const individualChartData = { datasets: chartDatasets };
    const totalChartData = { datasets: sumChartDataset };

    return (
        <div className="sensorview">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <p className="title">Humidade do solo</p>
                {/* Consider making the calendar icon interactive for date picking */}
                <img src={calendar} className="date-picker-icon" alt="date-icon" title="Date range" />
            </div>

            {/* Pass only necessary info to CustomLegend */}
            <CustomLegend
                datasets={chartDatasets.map(ds => ({ label: ds.label, backgroundColor: ds.backgroundColor }))}
                isVisible={isVisible}
                onToggle={handleLegendToggle}
            />

            <div className="chart-container" style={{ height: '380px', width: '100%', marginBottom: '30px', position: 'relative' }}>
                <Line data={individualChartData} options={chartOptions} />
            </div>

            <p className="title" style={{marginTop: '20px'}}>Total Humidade (Visível)</p>
            <div className="chart-container" style={{ height: '380px', width: '100%', position: 'relative' }}>
                <Line data={totalChartData} options={chartOptions} />
            </div>
        </div>
    );
}

export default SensorView;