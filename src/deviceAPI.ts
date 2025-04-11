export const apiUrl = "http://localhost:3001/devices";
export async function fetchMoisture(
    deviceID: string,
    aggregation: string,
    beginDate: number,
    endDate: number
) {

    const url = new URL(`http://localhost:3001/soilMoisture`);
    url.searchParams.append('deviceID', deviceID);
    url.searchParams.append('timestamp_gte', beginDate.toString());
    url.searchParams.append('timestamp_lte', endDate.toString());

    const response = await fetch(url.toString(), {        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function fetchDevices() {
    const r =
        await fetch(apiUrl, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });
    return await r.json();
}