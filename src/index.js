import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Students from "./pages/Students";
import Student from "./components/Student/Student";
import ObraSociales from "./pages/ObraSocial";
import Personas from "./pages/Personas";
import ObraSocial from "./components/ObraSocial/ObraSocialForm";
import Persona from "./components/Personas/AcompañanteForm";
import { Auth0Provider } from "@auth0/auth0-react";
import { SnackbarProvider } from "notistack";
import  Home  from "./pages/Home";
import Search from "./pages/Search";
import StudentsDown from "./pages/StudentsDown";

const domainAuth = process.env.REACT_APP_AUTH0_DOMAIN;
const clientIdAuth = process.env.REACT_APP_AUTH0_CLIENT_ID;
ReactDOM.render(
  <Auth0Provider
    domain={domainAuth}
    clientId={clientIdAuth}
    redirectUri={"http://localhost:3000/lahuellaAdministracion"}
  >
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter basename="lahuellaAdministracion">
        <Routes>
          <Route path="/" element={<App />}>
          <Route index element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/personas" element={<Personas />} />
            <Route path="/obrasociales" element={<ObraSociales />} />
            <Route path="/student/:id" element={<Student />} />
            <Route path="/student" element={<Student />} />
            <Route path="/obrasocial/:id" element={<ObraSocial />} />
            <Route path="/obrasocial" element={<ObraSocial />} />
            <Route path="/persona/:id" element={<Persona />} />
            <Route path="/persona" element={<Persona />} />
            <Route path="/search" element={<Search />} />
            <Route path="/studentsDown" element={<StudentsDown />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
