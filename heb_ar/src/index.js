import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import IniciarSesion from "./pages/AccessPage/IniciarSesion";
import { AuthProvider } from "./context/AuthContext";
import Perfil from "./pages/Perfil/Perfil";
import Carrito from "./pages/Carrito/Carrito";
import Escaneo from "./pages/Escaneo/Escaneo";
import Quests from "./pages/Quests/Quests";
import Cupones from "./pages/Cupones/Cupones";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/escaneo" element={<Escaneo />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/cupones" element={<Cupones />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
