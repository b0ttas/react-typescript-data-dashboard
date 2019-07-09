import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { SidebarComponent } from './components/Sidebar';
import { AppContainer } from './components/AppContainer';

import logo from './resources/logo.svg';
import brand from './resources/brand.svg';
import spacer from './resources/spacer.svg';
import plus from './resources/plus.svg';
import area from './resources/area.svg';
import sensor from './resources/sensor.svg';

import AreaList from "./components/AreaList";
import SensorList from "./components/SensorList";

//import './AppStyle.scss';
import SensorForm from './components/SensorForm';
import AreaForm from './components/AreaForm';


//Sample area data
const areas = [
    { id: 1, areaName: "Leanne Grand", areaCulture: "Pomatine", areaAcres: 9000 },
    { id: 2, areaName: "Ervin Bowel", areaCulture: "Brocolis", areaAcres: 59 },
    { id: 3, areaName: "Benjamin Clementine", areaCulture: "Bloody Beetroots", areaAcres: 666 },
    { id: 4, areaName: "Delicious Bloodpack", areaCulture: "Bananen", areaAcres: 23 }
];

//sample sensor data
const sensors = [
    { id: 1, areaName: "Leanne Grand", areaCulture: "Pomatine", deviceUID: "EVA-01" },
    { id: 2, areaName: "Ervin Bowel", areaCulture: "Brocolis", deviceUID: "WALL-E" },
    { id: 3, areaName: "Benjamin Clementine", areaCulture: "Bloody Beetroots", deviceUID: "Something Something" },
    { id: 4, areaName: "Delicious Bloodpack", areaCulture: "Bananen", deviceUID: "Ribbit", isHidden: false }
];

function TopNav() {
    let addPath, currHref = null;
    let navTitle;

    currHref = window.location.pathname.substring(1);

    switch (currHref) {
        case "areas":
            navTitle = <Link to="/areas" className="active">Áreas</Link>
            addPath = <Link to="/areas-add" id="add">Adicionar<img id="add-img" src={plus} className="App-plus" alt="plus" /></Link>
            break;
        case "sensores":
            navTitle = <Link to="/sensores" className="active">Sensores</Link>
            break;
        case "areas-add":
            navTitle = <Link to="/areas" className="active">Áreas</Link>
            currHref = "";
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

function Landing() {
    return (
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>This is the homepage, please navigate using the sidebar.</p>
        </div>
    );
}

function Areas() {
    return (
        <div className="App-content">
            <AreaList areas={areas} />
        </div>
    );
}

function AreasAdd() {
    return (
        <div className="App-content">
            <AreaForm />
        </div>
    );
}

function Sensores() {
    return (
        <div className="App-content">
            <SensorList sensors={sensors} />
        </div>
    );
}

function Page404() {
    return (
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>[404] Page not found.</p>
        </div>
    )
}

{/*missing route for sensor:id, area:id*/ }


function DBread() {


    let url = "http://localhost:3001/posts"
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);

        })
    return (
        <div></div>
    )
}

const App: React.FC = () => {

    const [isVisible, setVisible] = React.useState(true);

    return (
        <div className="App">
            <Router>
                <TopbarComponent>
                    <div className="topnav">
                        <span onClick={() => setVisible(!isVisible)} id="menu-span">&#9776;</span>
                        <Link to="/" id="brand"><img src={brand} className="App-brand" alt="brand" /></Link>
                        <span><img src={spacer} alt="" /></span>
                        <TopNav />
                    </div>
                </TopbarComponent>
                <SidebarComponent isVisible={isVisible}>
                    <Link to="/areas"><img src={area} alt="area" />Áreas</Link>
                    <Link to="/sensores"><img src={sensor} alt="sensor" />Sensores</Link>
                </SidebarComponent>
                <AppContainer isVisible={isVisible}>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route path="/areas" component={Areas} />
                        <Route path="/areas/:id" component={Areas} />
                        {/*not tested yet, AreaForm(area-add) element + id*/}
                        <Route path="/areas-add" component={AreasAdd} />
                        <Route path="/sensores" component={Sensores} />
                        <Route path="/404" component={Page404} />
                        <Redirect from="*" to="/404" />
                    </Switch>
                </AppContainer>
            </Router>
        </div>
    );
}

export default App;