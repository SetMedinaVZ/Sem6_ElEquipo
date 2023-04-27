import React from "react";
// import AppBar from "../../common/AppBar/AppBar";
// import NavBar from "../../common/NavBar/NavBar";
import Arrow from "../../assets/icons/arrow.svg"
import {Titulo, Texto, Codigo, InputDiv, Input, Fecha, Button, Back} from "./PerfilStyled"
import AppBar from "../../common/AppBar/AppBar";

function Perfil() {
  return (
    <>
      {/* <AppBar /> */}
      <div className="container">
        <a href="/">
          <Back src={Arrow} alt="Regresar"/>
        </a>
        <Titulo>Mi Perfil</Titulo>
        
        <InputDiv className="CodigoUsuario">
          <Texto>Código de usuario</Texto>
          <Codigo placeholder="93840283"></Codigo>
        </InputDiv>

        <InputDiv className="NombreUsuario">
          <Texto>Nombre</Texto>
          <Input placeholder="Marcelo Marquez"></Input>
        </InputDiv>

        <InputDiv className="CorreoUsuario">
          <Texto>Correo</Texto>
          <Input placeholder="marcelomarquez@gmail.com"></Input>
        </InputDiv>

        <InputDiv className="ContraseñaUsuario">
          <Texto>Contraseña</Texto>
          <Input placeholder="............."></Input>
        </InputDiv>

        <InputDiv className="TelefonoUsuario">
          <Texto>Número de teléfono</Texto>
          <Input placeholder="81-12345678"></Input>
        </InputDiv>

        <InputDiv className="NacimientoUsuario">
          <Texto>Fecha de nacimiento</Texto>
          <Fecha type="date" id="start" name="trip-start" value="2000-01-12" min="1923-01-01" max="2023-12-31"></Fecha>
        </InputDiv>

        <Button>
          <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.394 0C19.233 0 23.157 3.849 23.157 8.598C23.1558 9.84631 22.8802 11.0791 22.3495 12.209C21.8189 13.339 21.0463 14.3384 20.0865 15.1365C20.4975 15.336 20.871 15.537 21.2085 15.7395C21.936 16.1745 22.6905 16.7145 23.4735 17.358C23.5791 17.4437 23.6666 17.5497 23.7306 17.6697C23.7946 17.7898 23.8339 17.9214 23.8462 18.0569C23.8585 18.1924 23.8436 18.329 23.8022 18.4586C23.7609 18.5882 23.694 18.7082 23.6055 18.8115C23.4241 19.0221 23.1676 19.1535 22.8907 19.1776C22.6138 19.2017 22.3385 19.1166 22.1235 18.9405C21.4898 18.4118 20.818 17.9305 20.1135 17.5005C19.4264 17.1007 18.7127 16.7484 17.9775 16.446C16.8477 16.9428 15.6267 17.1983 14.3925 17.196C13.0327 17.1983 11.6906 16.8878 10.47 16.2885L10.407 16.3185C7.44149 17.4525 5.27699 19.1295 3.88199 21.3555C2.47949 23.589 1.90649 26.085 2.16299 28.8765C2.17406 29.0127 2.15815 29.1497 2.11616 29.2797C2.07417 29.4097 2.00694 29.5301 1.91831 29.6341C1.82968 29.738 1.7214 29.8235 1.59968 29.8855C1.47796 29.9475 1.34519 29.9849 1.20899 29.9955C0.933825 30.0223 0.659241 29.939 0.445315 29.7639C0.23139 29.5888 0.0955408 29.336 0.0674915 29.061C-0.228009 25.833 0.446991 22.8915 2.08949 20.274C3.53549 17.97 5.65949 16.179 8.43449 14.9025C7.55195 14.1063 6.84629 13.1338 6.36312 12.0478C5.87995 10.9619 5.63002 9.78661 5.62949 8.598C5.62949 3.849 9.55499 0 14.394 0ZM25.2285 21.36C25.4237 21.1672 25.6867 21.0587 25.9611 21.0579C26.2354 21.057 26.4991 21.1639 26.6955 21.3555C27.1005 21.7545 27.1005 22.4025 26.6985 22.803L24.9105 24.5715L26.6985 26.3415C26.7944 26.436 26.8706 26.5486 26.9225 26.6729C26.9744 26.7971 27.001 26.9305 27.0007 27.0651C27.0004 27.1998 26.9733 27.333 26.9209 27.4571C26.8685 27.5811 26.7918 27.6934 26.6955 27.7875C26.4995 27.9795 26.236 28.0869 25.9617 28.0866C25.6873 28.0864 25.4241 27.9784 25.2285 27.786L23.448 26.0205L21.6675 27.786C21.4927 27.9578 21.2633 28.0628 21.0191 28.0828C20.7749 28.1028 20.5314 28.0365 20.331 27.8955L20.202 27.7875C20.1056 27.6934 20.029 27.5811 19.9766 27.4571C19.9242 27.333 19.8971 27.1998 19.8968 27.0651C19.8965 26.9305 19.9231 26.7971 19.975 26.6729C20.0269 26.5486 20.103 26.436 20.199 26.3415L21.984 24.5715L20.199 22.8015C20.103 22.707 20.0269 22.5944 19.975 22.4701C19.9231 22.3459 19.8965 22.2125 19.8968 22.0779C19.8971 21.9432 19.9242 21.81 19.9766 21.6859C20.029 21.5619 20.1056 21.4496 20.202 21.3555C20.3981 21.1642 20.6614 21.0573 20.9354 21.0579C21.2093 21.0584 21.4722 21.1664 21.6675 21.3585L23.448 23.1225L25.2285 21.36ZM14.394 2.0625C10.7145 2.0625 7.73399 4.9875 7.73399 8.5965C7.73399 12.2055 10.7145 15.132 14.394 15.132C18.072 15.132 21.054 12.207 21.054 8.5965C21.054 4.9875 18.072 2.0625 14.394 2.0625Z" fill="#DE2B27"/>
          </svg>
          Borrar mi cuenta
        </Button>
      </div>
    </>
  );
}

export default Perfil;
