import React, { useState } from "react";
// import "./CrearCuenta.css";
import AppBar from "../../common/AppBar/AppBar";
// import styled from "styled-components";
import Calendar from "../../assets/icons/calendar.svg";
import { Titulo, Input, InputDiv, Fecha, Button } from "./CrearCuentaStyled";
import NavBarAccess from "../../common/NavBar/NavBarAccess";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDoc } from "firebase/firestore";

function CrearCuenta() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(null);

  const onCreateAccount = (e) => {
    e.preventDefault();
    if (password == password2) {
      signup(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setDoc(user.uid, {
            nombre: name,
            apellido: lastname,
            email: email,
            fechaNacimiento: fechaNacimiento,
          });
          navigate("/perfil");
          console.log(user);
        })
        .catch((error) => {
          toast.error(error.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      toast.error("Las contraseñas deben de coincidir", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <AppBar />
      <ToastContainer />
      <div className="container">
        <div className="column">
          <Titulo>Crea tu Cuenta</Titulo>
          <Input
            id="nombre"
            name="nombre"
            required
            placeholder="Nombre"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            id="lastname"
            name="lastmane"
            required
            placeholder="Apellido"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Correo electrónico"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            id="password2"
            name="password2"
            type="password"
            required
            placeholder="Confirma tu contraseña"
            onChange={(e) => setPassword2(e.target.value)}
          />

          <InputDiv className={"inputWithIcon"}>
            {/* <InputDate placeholder="Fecha de Nacimiento"/> */}
            <Fecha
              type="date"
              id="start"
              name="trip-start"
              min="1923-01-01"
              max="2023-12-31"
              onChange={(e) => setFechaNacimiento(e.target.valueAsDate)}
            ></Fecha>
            {/* <img className="right-icon" src={Calendar} alt="heb-logo" /> */}
          </InputDiv>
          {/* <Input placeholder="Fecha de Nacimiento"/> */}
          <Button onClick={onCreateAccount} className="CrearCuenta">
            Crear Cuenta
          </Button>
        </div>
      </div>
      <NavBarAccess />
    </>
  );
}

export default CrearCuenta;
