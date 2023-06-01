import React, { useState, useEffect } from "react";
import AppBar from "../../common/AppBar/AppBar";
import { Back, Titulo, Input, Button } from "./OlvidasteContraStyled";
import NavBarAccess from "../../common/NavBar/NavBarAccess";
import { useAuth } from "../../context/AuthContext";
import Arrow from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";

function OlvidasteContra() {

    const navigate = useNavigate();

    return (
        <>
            <AppBar />

            <div onClick={() => navigate(-1)}>
                <Back src={Arrow} alt="Regresar" style={{top: "80px"}}/>
            </div>

            <div className="container">
        
            <div className="column">
                <Titulo>Olvidaste tu contraseña</Titulo>

                <Input placeholder="Correo electrónico"></Input>

                <Button>Enviar</Button>
                
            </div>
        </div>
        </>
    );
}

export default OlvidasteContra;