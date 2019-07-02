import React from 'react';

import {SidebarComponent} from './sidebar';

import logo from './logo.svg';
import brand from './brand.svg';
import spacer from './spacer.svg';
import plus from './plus.svg';
import area from './area.svg';
import sensor from './sensor.svg';

import AreaList from "./components/AreaList";
import SensorList from "./components/SensorList";


import './appstyle.scss';
import SensorForm from './components/SensorForm';
import AreaForm from './components/AreaForm';


//Sample area data
const areas = [
  { id: 1, areaName: "Leanne Grand", areaCulture: "Pomatine", areaAcres: 9000 },
  { id: 2, areaName: "Ervin Bowel", areaCulture: "Brocolis", areaAcres: 59  },
  { id: 3, areaName: "Benjamin Clementine", areaCulture: "Bloody Beetroots", areaAcres: 666  },
  { id: 4, areaName: "Delicious Bloodpack", areaCulture: "Bananen", areaAcres: 23  }
];

//sample sensor data
const sensors = [
  { id: 1, areaName: "Leanne Grand", areaCulture: "Pomatine", deviceUID: "EVA-01" },
  { id: 2, areaName: "Ervin Bowel", areaCulture: "Brocolis", deviceUID: "WALL-E" },
  { id: 3, areaName: "Benjamin Clementine", areaCulture: "Bloody Beetroots", deviceUID: "Something Something"},
  { id: 4, areaName: "Delicious Bloodpack", areaCulture: "Bananen", deviceUID: "Ribbit", isHidden: false }
];

function TopNav() {
  let addPath, addHref = null;
  let navTitle;

  addHref = window.location.pathname.substring(1);

  switch (addHref) {
    case "areas":
      navTitle = <a className="active" href={window.location.href} >Áreas</a>
      addHref = window.location.pathname.substring(1) + "-add";
      addPath = <a id="add" href={addHref}>Adicionar<img id="add-img" src={plus} className="App-plus" alt="plus"/></a>    
      break;
    case "sensores":
      navTitle = <a className="active" href={window.location.href} >Sensores</a>;
      addHref = window.location.pathname.substring(1) + "-add";
      addPath = <a id="add" href={addHref}>Adicionar<img id="add-img" src={plus} className="App-plus" alt="plus"/></a>    
      break;
    case "areas-add":
      navTitle = <a className="active" href={window.location.href} >Áreas</a>;
      addHref = "";
      break;
    case "sensores-add":
      navTitle = <a className="active" href={window.location.href} >Sensores</a>;
      addHref = "";
      break;
    default:
    }

return (
  <div>
    {navTitle}
    {addPath}
  </div>
)
}

const TopbarComponent: React.FunctionComponent = props => (
  <div className="topmennav">
    {props.children}
  </div>
);

function AppContent() {

  let currHref = null;
  let appcontent; 

  currHref = window.location.pathname.substring(1);
  console.log(currHref);

  switch (currHref) {
    case "":
      appcontent = <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        This is the homepage, please navigate using the sidebar.
      </p>
    </div>;
      break;
    case "areas":
      appcontent = <AreaList areas={areas}/>;
      break;
    case "sensores":
      appcontent = <SensorList sensors={sensors}/>;
      break;
    case "areas-add":
      appcontent = <AreaForm/>
      break;
    case "sensores-add":
        appcontent = <SensorForm/>
      break;
    default:
      appcontent = <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        [404] Page not found.
      </p>
    </div>;;
    }

  
 return (
    <div className="App-content">
      {appcontent}
    </div>
  )
}

const App: React.FC = () => {

  const [isVisible, setVisible] = React.useState(true);

  return (
    <div className="App">
      <TopbarComponent>
      <div className="topnav">
      <span onClick={() => setVisible(!isVisible)} id="menu-span">&#9776;</span>
    <a href="/" id="brand"><img src={brand} className="App-brand" alt="brand"/></a>
    <span><img src={spacer} alt=""/></span>
  <TopNav/>
  </div>
</TopbarComponent>
    <SidebarComponent isVisible={isVisible}>    
      <a href="areas"><img src={area} alt="area"/>Áreas</a>
      <a href="sensores"><img src={sensor} alt="sensor"/>Sensores</a>
      </SidebarComponent>
    <AppContent/>
    </div>
  );
}

export default App;