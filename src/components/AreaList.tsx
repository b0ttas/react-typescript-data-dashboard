import React, { useEffect, useState } from 'react';

import Area from "./Area"
import { fetchDB } from '../restAPI';



function AreaList() {
    type ExpectedData = {
        id?: number;
        name?: string;
        area?: number;
        crop?: string;
        device?: string;
    }
    //Set areas initialy as an empty array
    const [areas, setAreas] = useState<Array<ExpectedData> | undefined>();
    //fetch the areas when the compnent mounts
    useEffect(() => {
        fetchDB()
            .then(setAreas)

    }, [])

    if(areas !== undefined){
        return (
        <div>
            {areas.map(a => <Area key={a.id} id={a.id} name={a.name} area={a.area} crop={a.crop} device={a.device} />)}
        </div>);
}
    else{
        return(
            <div></div>
        )
    }
}

export default AreaList;