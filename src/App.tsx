import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom';

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
import SensorView from "./components/SensorView";

import './styles/AppStyle.scss';
import AddAreaForm from './components/AddAreaForm';
import EditAreaForm from './components/EditAreaForm';

function TopNav() {
    let addPath, currHref = null;
    let navTitle;

    currHref = window.location.pathname.substring(1);

    switch (currHref) {
        case "areas":
            navTitle = <Link to="/areas" className="active">Áreas</Link>
            addPath = <Link to="/areas/add" id="add">Adicionar<img id="add-img" src={plus} className="App-plus" alt="plus" /></Link>
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
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <p>This is the homepage, please navigate using the sidebar.</p>
            </div>
        </div>
    );
}

function Areas() {
    const [isVisible, setVisible] = React.useState(true);
    return (
        <AppContainer isVisible={isVisible}><AreaList /></AppContainer>
    );
}

function AreasAdd() {
    const [isVisible, setVisible] = React.useState(true);
    return (
        <AppContainer isVisible={isVisible}><AddAreaForm /></AppContainer>
    );
}

function AreasEdit() {
    const [isVisible, setVisible] = React.useState(true);
    return (
        <AppContainer isVisible={isVisible}><EditAreaForm /></AppContainer>
    );
}

function Sensores() {
    const [isVisible, setVisible] = React.useState(true);
    return (
        <AppContainer isVisible={isVisible}><SensorList /></AppContainer>
    );
}

function SensoresView() {

    const [isVisible, setVisible] = React.useState(true);
    return (
        <AppContainer isVisible={isVisible}><SensorView /></AppContainer>
    );
}

function Page404() {
    return (
        <div className="App-header">
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <p>[404] Page not found.</p>
            </div>
        </div>
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
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/404" component={Page404} />
                    <Route exact path="/areas" component={Areas} />
                    <Route path="/areas/add" component={AreasAdd} />
                    <Route path="/areas/edit" component={AreasEdit} />
                    <Route exact path="/sensores" component={Sensores} />
                    <Route path="/sensores/view" component={SensoresView} />
                    <Redirect from="*" to="/404" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;