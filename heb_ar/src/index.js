import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import IniciarSesion from "./pages/AccessPage/IniciarSesion";
import CrearCuenta from "./pages/CrearCuenta/CrearCuenta";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/protectedRoute";
import Perfil from "./pages/Perfil/Perfil";
import Carrito from "./pages/Carrito/Carrito";
import Escaneo from "./pages/Escaneo/Escaneo";
import Quests from "./pages/Quests/Quests";
import Cupones from "./pages/Cupones/Cupones";
import Sidebar from "./common/Sidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <Carrito />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/escaneo"
          element={
            <ProtectedRoute>
              <Escaneo />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/quests"
          element={
            <ProtectedRoute>
              <Quests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cupones"
          element={
            <ProtectedRoute>
              <Cupones />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
