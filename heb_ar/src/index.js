import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
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
import ScavengerHunt from "./pages/ScavengerHunt/ScavengerHunt";
import Cupones from "./pages/Cupones/Cupones";
import "firebase/functions";
import firebase from "firebase/app";
import Home from "./pages/Home/home";
import Historial from "./pages/Historial/Historial";
import Ayuda from "./pages/Ayuda/Ayuda";
import Metodo from "./pages/MetodoPago/MetodoPago";
import MetodoPago from "./pages/MetodoPago/MetodoPago";
import { ClockTime } from "./context/timeContext";
import GastosMensuales from "./pages/GastosMensuales/GastosMensuales";
import InfoProducto from "./pages/InfoProducto/InfoProducto";
import Aisle from "./pages/Aisle/Aisle";
import Pago from "./pages/Pago/Pago";
import ScavengeTest from "./pages/testQuest/ScavengeTest";
import { Canvas } from "@react-three/fiber";

const httpLink = createHttpLink({
  uri: "https://strong-polliwog-81.hasura.app/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token =
    "IgayxJEcbgTwLd4Dp72wzzTr2xncoykU5f8GqRGuBLoIKvhotuVtUxPHfuJ1yW6u";
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
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
            path="/pasillo/:aisleName"
            element={
              <ProtectedRoute>
                <Aisle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gastos-mensuales"
            element={
              <ProtectedRoute>
                <GastosMensuales />
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
            path="/scavenger-hunt"
            element={
              <ProtectedRoute>
                <ScavengerHunt />
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
          <Route
            path="/ayuda"
            element={
              <ProtectedRoute>
                <Ayuda />
              </ProtectedRoute>
            }
          />
          <Route
            path="/metodo"
            element={
              <ProtectedRoute>
                <MetodoPago />
              </ProtectedRoute>
            }
          />
          <Route
            path="/producto"
            element={
              <ProtectedRoute>
                <InfoProducto />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pago"
            element={
              <ProtectedRoute>
                <Pago />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scavengeTest"
            element={
              <ProtectedRoute>
                  <ScavengeTest/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ClockTime />
    </AuthProvider>
    <script src="html5-qrcode.min.js"></script>
  </ApolloProvider>
);
