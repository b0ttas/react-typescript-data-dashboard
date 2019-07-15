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

export function postDB(data: string[]) {
    //duplicate id error

    let temp = { 
        //"id": Number(data[0]), 
        "name": data[1],
        "crop": data[2],
        "area": Number(data[0]),
        "device":data[4]
      }

    console.log(temp);
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(temp)
    })
        .then(r => r.json())
}

export function patchDB(data: string[]) {
    //patch - update atribute, put - update resource
    //ids are ignored in these types of request
    //tested working
    let temp = { 
        //"id": Number(data[0]), 
        "name": data[1],
        "crop": data[2],
        "area": Number(data[0]),
        "device":data[4]
      }

    console.log(temp);
    return fetch(apiUrl + "/" + data[0], {
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
    //tested working
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
