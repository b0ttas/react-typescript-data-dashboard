export const apiUrl = "https://api-device.agroop.net";
const username = "testuser";
const password = "testpassword";
export const token = btoa(`${username}:${password}`);

export function fetchDevices() {
    return fetch(apiUrl + '/devices', {
        method: "GET",
        headers: { 'Content-Type': 'application/json', Authorization: `Basic ${token}` }

    })
        .then(r => r.json())
}

export function fetchMoisture(deviceID: string, agregation: string, beginDate: number, endDate: number) {

    return fetch(apiUrl + '/devices/' + deviceID + '/soilMoisture?aggregation=' + agregation + '&beginDate=' + beginDate + '&endDate=' + endDate, {
        method: "GET",
        headers: { 'Content-Type': 'application/json', Authorization: `Basic ${token}`, Accept: 'application/json' }

    })
        .then(r => r.json())
}