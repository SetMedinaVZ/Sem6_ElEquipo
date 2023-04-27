import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IniciarSesion from "./pages/AccessPage/IniciarSesion";
import CrearCuenta from "./pages/CrearCuenta/CrearCuenta";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/protectedRoute";
import Perfil from "./pages/Perfil/Perfil";
import Carrito from "./pages/Carrito/Carrito";
import Escaneo from "./pages/Escaneo/Escaneo";
import Quests from "./pages/Quests/Quests";
import Cupones from "./pages/Cupones/Cupones";
import "firebase/functions";
import firebase from "firebase/app";
import Home from "./pages/Home/home";
import Historial from "./pages/Historial/Historial";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/historial"
          element={
            <ProtectedRoute>
              <Historial />
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
