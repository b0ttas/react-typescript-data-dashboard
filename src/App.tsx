import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

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
    const location = useLocation();
    let addPath;
    let object = ["", ""];

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
            <BrowserRouter>
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
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/404" element={<Page404 />} />

                        {/* Areas Routes */}
                        <Route path="/areas">
                            <Route index element={<Areas />} />
                            <Route path="add" element={<AreasAdd />} />
                            <Route path="edit/:id" element={<AreasEdit />} />
                        </Route>

                        {/* Sensores Routes */}
                        <Route path="/sensores">
                            <Route index element={<Sensores />} />
                            <Route path="view/:id" element={<SensoresView />} />
                        </Route>

                        {/* Catch-all redirect */}
                        {/*<Route path="*" element={<Navigate to="/404" replace />} />*/}
                    </Routes>
                </AppContainer>
            </BrowserRouter>
        </div>
    );
}

export default App;