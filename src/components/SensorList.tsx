import React from "react";

import Sensor from "./Sensor"

interface Props {
    sensors: { 
        id: number; 
        areaName: string;
        areaCulture: string;
        deviceUID: string;
        isHidden?: boolean;
     }[];
}

function SensorList(props: Props) {

  return (
    <div>
      {props.sensors.map(s => <Sensor key={s.id} deviceUID={s.deviceUID} areaName={s.areaName} areaCulture={s.areaCulture} isHidden={s.isHidden} />)}
     </div>   );
}

export default SensorList;