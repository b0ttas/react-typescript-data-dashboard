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

export function fetchMoisture(/*deviceID:string*/) {
    
    //depths in model 10 25 40 55 (cm), default window (week) starting on curr day
    //must show 1 graph with each depth and 1 with depth.sum
    //vectors must be hideable and sum must change to represent changes
    //1 must always be visible

    //agregation none, hour, day, week, auto
    //beginDate, endDate

    const deviceID = "ac160007-6894-1d8a-8168-94bdb2ad002f";
    const beginDate = 1456486741000;
    const endDate = 1551181141000

    return fetch(apiUrl + '/devices/' + deviceID + '/soilMoisture?beginDate=' + beginDate + '&endDate=' + endDate, {
        method: "GET",
        headers: { 'Content-Type': 'application/json', Authorization: `Basic ${token}`, Accept: 'application/json' }

    })
        .then(r => r.json())
}