export const apiUrl = "http://localhost:3001/areas";

/*
JSON-server endpoints
GET    /employees
GET    /employees/{id}
POST   /employees
PUT    /employees/{id}
PATCH  /employees/{id}
DELETE /employees/{id}
*/

export function fetchDB() {
    return fetch(apiUrl, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }

    })
        .then(r => r.json())
}

export function fetchIdDB(data: string) {
    return fetch(apiUrl + "/" + data, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }

    })
        .then(r => r.json())
}

export function postDB(data: { id: null, name: string, crop: string, area: string, device: string }) {

    let temp = {
        "name": data.name,
        "crop": data.crop,
        "area": Number(data.area),
        "device": data.device
    }

    return fetch(apiUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(temp)
    })
        .then(r => r.json())
}

export function patchDB(data: { id: string, name: string, crop: string, area: string, device: string }) {

    //patch - update atribute, put - update resource

    let temp = {
        "id": Number(data.id),
        "name": data.name,
        "crop": data.crop,
        "area": Number(data.area),
        "device": data.device
    }

    console.log(data.id);
    return fetch(apiUrl + "/" + temp.id, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(temp)
    })
        .then(r => r.json())
}

export function deleteDB(data: string[]) {
    
    return fetch(apiUrl + "/" + data[0], {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(r => r.json())
}
