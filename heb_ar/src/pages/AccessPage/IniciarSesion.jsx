import React, { useEffect, useState } from "react";
import "./IniciarSesion.css";
import AppBar from "../../common/AppBar/AppBar";
import styled from "styled-components";
import NavBarAccess from "../../common/NavBar/NavBarAccess";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";
import withSplashScreen from "../../components/withSplashScreen";

const InputMail = styled.input.attrs({
  placeholder: "Correo electrónico",
})`
  box-sizing: border-box;

  width: 290px;
  height: 40px;

  border: 1px solid #d5d5d5;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2));
  border-radius: 10px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  padding-left: 18px;
  margin-bottom: 16px;
  ::placeholder {
    color: #c5c5c5;
  }
`;

const PasswordInput = styled(InputMail).attrs({
  type: "password",
  placeholder: "Contraseña",
})``;

const Button = styled.button`
  background-color: ${props => (props.isValid ? '#DE2B27' : 'none')};
  width: 290px;
  height: 38px;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
`;

function IniciarSesion() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, currentUser } = useAuth();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [errorMsg, setError] = useState("");
  const [user, setUser] = useState(null);

  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  });
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (inputValues.email.trim().length > 0 &&
      inputValues.password.trim().length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [inputValues]);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputValues.email, inputValues.password);
    } catch (error) {
      setError(error.code)
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("El correo ingresado no existe");
          setInputValues(prevValues => ({
            ...prevValues,
            email: '',
          }))
          break;
        case "auth/wrong-password":
          toast.error("Contraseña incorrecta");
          setInputValues(prevValues => ({
            ...prevValues,
            password: '',
          }))
          break;
        // case "auth/missing-password":
        //   toast.error("Ingresa tu contraseña");
        //   break;
        case "auth/invalid-email":
          toast.error("Correo no valido");
          setInputValues(prevValues => ({
            ...prevValues,
            email: '',
          }))
          break;
        case "auth/too-many-requests":
          toast.error("Demasiados intentos seguidos, porfavor espera unos segundos");
          break;
        default:
          toast.error("Hubo un error inesperado, intenta más tarde");
      }
    }

  };

  const onLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.log("Error")
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <AppBar />
      <ToastContainer />
      <div id="errorMessage">{errorMsg}</div>
      <div className="container">
        <div className="column">
          <h1 className="Title">Iniciar Sesión</h1>
          {/* <input placeholder="Correo electrónico"></input>
          <input placeholder="Contraseña"></input> */}
          <InputMail
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Email address"
            // onChange={(e) => setEmail(e.target.value)}
            value={inputValues.email}
            onChange={handleInputChange}
          ></InputMail>
          <PasswordInput
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            // onChange={(e) => setPassword(e.target.value)}
            value={inputValues.password}
            onChange={handleInputChange}
          ></PasswordInput>

          <a href="/OlvidasteContra" className="OlvidasteContra">
            ¿Olvidaste tu contraseña?
          </a>

          {/* <button className="IniciarButton">Iniciar sesión</button>
          <button className="CrearCuenta">Crear cuenta</button> */}
          <Button
            onClick={onLogin}
            className="IniciarButton"
            isValid={isValid}
            disabled={!isValid}
          >
            Iniciar sesión
          </Button>
          <a href="/crear-cuenta">
            <Button
              style={{
                backgroundColor:
                  '#009FCE'
              }}
              className="CrearCuenta">Crear
              Cuenta
            </Button>
          </a>

          <div className="RectangleRow">
            <span className="rectangle"></span>
            <p className="contConText">O </p>
            <span className="rectangle"></span>
          </div>

          <Button className="buttonGoogle" onClick={onLoginWithGoogle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 262"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
            Continuar con Google
          </Button>
        </div>
      </div>
      <NavBarAccess />
    </>
  );
}

export default withSplashScreen(IniciarSesion);
