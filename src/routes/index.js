import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import Private from "./Private";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/register" element={ <Register/> } />
            <Route path="/dashboard" element={ <Private> <Dashboard/> </Private> } />
        </Routes>
    );
}

export default RoutesApp;