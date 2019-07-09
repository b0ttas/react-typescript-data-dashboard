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