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

export async function fetchDB() {
    const r = await fetch(apiUrl, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    });
    return await r.json();
}

export async function fetchIdDB(data: string) {
    const r = await fetch(apiUrl + "/" + data, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    });
    return await r.json();
}

export async function postDB(data: { id: null, name: string, crop: string, area: string, device: string }) {

    let temp = {
        "name": data.name,
        "crop": data.crop,
        "area": Number(data.area),
        "device": data.device
    }

    const r = await fetch(apiUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(temp)
    });
    return await r.json();
}

export async function patchDB(data: { id: string, name: string, crop: string, area: string, device: string }) {

    //patch - update atribute, put - update resource

    let temp = {
        "id": Number(data.id),
        "name": data.name,
        "crop": data.crop,
        "area": Number(data.area),
        "device": data.device
    }

    console.log(data.id);
    const r = await fetch(apiUrl + "/" + temp.id, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(temp)
    });
    return await r.json();
}

export async function deleteDB(data: string[]) {

    const r = await fetch(apiUrl + "/" + data[0], {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await r.json();
}
