import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom';

import useReactRouter from 'use-react-router';

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

const TopNav = () => {
    let addPath;
    let object = ["", ""];
    const { location } = useReactRouter();


    if (location.pathname === "/areas") {
        object = ["Áreas", "/areas"];
        addPath = <Link to="/areas/add" id="add">Adicionar<img id="add-img" src={plus} className="App-plus" alt="plus" /></Link>
    }
    else if (location.pathname === "/sensores") {
        object = ["Sensores", "/sensores"];
        addPath = undefined;
    }
    else if (location.pathname === "/areas/add") {
        object = ["Criar Área", "/areas"];
        addPath = undefined;
    }

    else if (location.pathname.slice(0,11) === "/areas/edit") {
        object = ["Editar Área", "/areas"];
        addPath = undefined;
    }

    else if (location.pathname.slice(0,14) === "/sensores/view") {
        object = [location.pathname.slice(15), "/sensores"];
        addPath = undefined;
    }
    
    return (
        <div>
            <Link to={object[1]} className="active">{object[0]}</Link>
            {addPath}
        </div>
    )
}


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
    return (
        <AreaList />
    );
}

function AreasAdd() {
    return (
        <AddAreaForm />
    );
}

function AreasEdit() {
    return (
        <EditAreaForm />
    );
}

function Sensores() {
    return (
        <SensorList />
    );
}

function SensoresView() {

    return (
        <SensorView />
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

const App = () => {

    const [isVisible, setVisible] = useState(true);

    return (
        <div className="App">
            <Router>
                <div className="topnav">
                    <span onClick={() => setVisible(!isVisible)} id="menu-span">&#9776;</span>
                    <Link to="/" id="brand"><img src={brand} className="App-brand" alt="brand" /></Link>
                    <span><img src={spacer} alt="" /></span>
                    <TopNav />
                </div>
                <SidebarComponent isVisible={isVisible}>
                    <Link to="/areas"><img src={area} alt="area" />Áreas</Link>
                    <Link to="/sensores"><img src={sensor} alt="sensor" />Sensores</Link>
                </SidebarComponent>

                <AppContainer isVisible={isVisible}>
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
                </AppContainer>
            </Router>
        </div>
    );
}

export default App;