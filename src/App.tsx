import React from 'react';
import logo from './logo.svg';
import brand from './brand.svg';
import spacer from './spacer.svg';
import plus from './plus.svg';
import area from './area.svg';
import sensor from './sensor.svg';

import './appstyle.scss';

function TopNav() {
  let addPath, addHref = null;
  let navTitle = null;

  addHref = window.location.pathname.substring(1);

  switch (addHref) {
    case "areas":
      navTitle = "Áreas";
      addHref = window.location.pathname.substring(1) + "-add";
      addPath = <a id="add" href={addHref}>Adicionar<img id="add-img" src={plus} className="App-plus" alt="plus"/></a>    
      break;
    case "sensores":
      navTitle = "Sensores";
      addHref = window.location.pathname.substring(1) + "-add";
      addPath = <a id="add" href={addHref}>Adicionar<img id="add-img" src={plus} className="App-plus" alt="plus"/></a>    
      break;
    case "areas-add":
      navTitle = "Áreas";
      addHref = "";
      break;
    case "sensores-add":
      navTitle = "Sensores"
      addHref = "";
      break;
    }

return (
  <div className="topnav">
  <span id="menu-span">&#9776;</span>
  <a href="/" id="brand"><img src={brand} className="App-brand" alt="brand"/></a>
  <span><img src={spacer} alt=""/></span>
  <a className="active" href={window.location.href}>{navTitle}</a>
  {addPath} 
</div>
)
}

function SideNav() {
  return (
    <div className="sidenav">
    <a href="areas"><img src={area} alt="area"/>Áreas</a>
    <a href="sensores"><img src={sensor} alt="sensor"/>Sensores</a>
  </div>
  )
}

const App: React.FC = () => {
  return (
    <div className="App">
    <TopNav/>
    <SideNav/>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          In construction.
        </p>
      </div>
    </div>
  );
}

export default App;