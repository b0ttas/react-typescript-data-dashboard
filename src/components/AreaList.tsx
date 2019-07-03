import React, { AreaHTMLAttributes } from "react";

import Area from "./Area"

interface Props {
    areas: {
        id: number;
        areaName: string;
        areaCulture: string;
        areaAcres: number;
        deviceUID?: string;
    }[];
}

function AreaList(props: Props) {

    return (
        <div>
            {props.areas.map(a => <Area key={a.id} areaName={a.areaName} areaCulture={a.areaCulture} areaAcres={a.areaAcres} />)}
        </div>);
}

export default AreaList;