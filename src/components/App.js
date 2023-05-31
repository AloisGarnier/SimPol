import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Link, useNavigate} from "react-router-dom";

import Eur from "./Eur";
import Leg from "./Leg";
import Reg from "./Reg";
import Mun from "./Mun";

import "../css/morph.min.css";
import "../css/fontawesome.all.min.css";
import "../css/myStyle.css";


export default function App(){

    function navBar() {

        return(
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">SimPol</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarColor01">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <Link class="nav-link" to="/eur">Européennes</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" href="#">Législatives</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" href="#">Régionales</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" href="#">Municipales</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    return(
        <div>
            {navBar()}

            <Routes>
                <Route exact path="/eur" element={
                    <Eur
                />}></Route>
                <Route exact path="/leg" element={
                    <Leg
                />}></Route>
                <Route exact path="/reg" element={
                    <Reg
                />}></Route>
                <Route exact path="/mun" element={
                    <Mun
                />}></Route>
            </Routes>
        </div>
    );

}