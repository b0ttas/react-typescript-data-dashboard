import React from 'react';
import logo from './logo.svg';
import './appstyle.scss';

const App: React.FC = () => {
  
  function openNav() {
    //document.getElementById("mySidenav").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
  function closeNav() {
    //document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
  }

  return (

    <div className="App">

      <div className="topnav">
        <a id="clickable" onClick={openNav}> <span>&#9776;</span> </a>
        <a> logo here </a>
        <a className="active" href="#areas">Áreas</a>
      </div>

      <div id="mySidenav" className="sidenav">
        <a href="#" className="closebtn" onClick={closeNav}>&times;</a>
        <a href="#areas">Áreas</a>
        <a href="#sensores">Sensores</a>
      </div>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          In construction.
        </p>

      </header>
    </div>
  );
}

export default App;
