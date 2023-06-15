import React, { useState, useEffect } from "react";
// import "./CrearCuenta.css";
import AppBar from "../../common/AppBar/AppBar";
import styled from "styled-components";
import Calendar from "../../assets/icons/calendar.svg";
import { Titulo, Input, InputDiv, Fecha } from "./CrearCuentaStyled";
import NavBarAccess from "../../common/NavBar/NavBarAccess";
import { useAuth } from "../../context/AuthContext";
import { Back } from "../Perfil/PerfilStyled";
import Arrow from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

const SignUpButton = styled.button`
  background-color: ${(props) => (props.isValid ? "#009FCE" : "none")};
  width: 290px;
  height: 38px;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
`;

function CrearCuenta() {
  const [errorMsg, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [lastname, setLastName] = useState("");
  // const [password2, setPassword2] = useState("");
  // const [password, setPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(null);

  const [inputValues, setInputValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  const [isValid, setIsValid] = useState(false);

  // const quests = {
  //   buy_products: {
  //     act1: {
  //       completed: false,
  //       idAct: "BUCsVYshTln7LYLr1u6H",
  //     },
  //     act2: {
  //       completed: false,
  //       idAct: "pkBVmLqetdroYFSyhAOS",
  //     },
  //     act3: {
  //       completed: false,
  //       idAct: "WUja63Jmd057rXd5Mo7A",
  //     },
  //     act4: {
  //       completed: false,
  //       idAct: "VbSw410E7M50ti7UzvAF",
  //     },
  //     actCount: 4,
  //     actKey: true,
  //   },
  //   qr_scan: {
  //     act1: {
  //       completed: false,
  //       idAct: "Lbw0SwnfcdAxp1IaZzY7",
  //     },
  //     act2: {
  //       completed: false,
  //       idAct: "VGs6FZm7vK8acehG8VN7",
  //     },
  //     act3: {
  //       completed: false,
  //       idAct: "tZ2il8jxK6ejUygznjni",
  //     },
  //     act4: {
  //       completed: false,
  //       idAct: "hkC1pduZqP9XQw79Vhhh",
  //     },
  //     actCount: 4,
  //   },
  //   quick_buy: {
  //     act1: {
  //       completed: false,
  //       idAct: "GVb31FuIAgftqkYBDhpY",
  //     },
  //     act2: {
  //       completed: false,
  //       idAct: "xvCMWBVcWTHzDN2WH8av",
  //     },
  //     actCount: 2,
  //   },
  //   scavenger_quest: {
  //     act1: {
  //       completed: false,
  //       idAct: "aGXsgPy84KY7AoiG9TUJ",
  //     },
  //     act2: {
  //       completed: false,
  //       idAct: "5DYCzoZBcnUuzoDnQvIA",
  //     },
  //     act3: {
  //       completed: false,
  //       idAct: "bg33ix289IO5zn0IAhAI",
  //     },
  //     act4: {
  //       completed: false,
  //       idAct: "brqxBoiaDR7FgMIBgw1C",
  //     },
  //     act5: {
  //       completed: false,
  //       idAct: "e2MMvjVx5NdqogLVuj8Z",
  //     },
  //     actCount: 5,
  //   },
  // };

  const buy_products_quest = {
      act1: {
        completed: false,
        idAct: "BUCsVYshTln7LYLr1u6H",
      },
      act2: {
        completed: false,
        idAct: "pkBVmLqetdroYFSyhAOS",
      },
      act3: {
        completed: false,
        idAct: "WUja63Jmd057rXd5Mo7A",
      },
      act4: {
        completed: false,
        idAct: "VbSw410E7M50ti7UzvAF",
      },
      actCount: 4,
      actKey: true,
  };

  const qr_scan_quest = {
    act1: {
      completed: false,
      idAct: "Lbw0SwnfcdAxp1IaZzY7",
    },
    act2: {
      completed: false,
      idAct: "VGs6FZm7vK8acehG8VN7",
    },
    act3: {
      completed: false,
      idAct: "tZ2il8jxK6ejUygznjni",
    },
    act4: {
      completed: false,
      idAct: "hkC1pduZqP9XQw79Vhhh",
    },
    actCount: 4,
  };

  const scavenger_hunt_quest = {
    act1: {
      completed: false,
      idAct: "GVb31FuIAgftqkYBDhpY",
    },
    act2: {
      completed: false,
      idAct: "xvCMWBVcWTHzDN2WH8av",
    },
    actCount: 2,
  };

  const quick_buy_quest = {
    act1: {
      completed: false,
      idAct: "aGXsgPy84KY7AoiG9TUJ",
    },
    act2: {
      completed: false,
      idAct: "5DYCzoZBcnUuzoDnQvIA",
    },
    act3: {
      completed: false,
      idAct: "bg33ix289IO5zn0IAhAI",
    },
    act4: {
      completed: false,
      idAct: "brqxBoiaDR7FgMIBgw1C",
    },
    act5: {
      completed: false,
      idAct: "e2MMvjVx5NdqogLVuj8Z",
    },
    actCount: 5,
  };

  useEffect(() => {
    // const allValuesValid = Object.values(inputValues).every(value => value > 0);
    // setIsValid(allValuesValid);
    if (
      inputValues.name.trim().length > 0 &&
      inputValues.lastname.trim().length > 0 &&
      inputValues.email.trim().length > 0 &&
      inputValues.password.trim().length > 0 &&
      inputValues.password2.trim().length > 0 &&
      fechaNacimiento !== null
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [inputValues, fechaNacimiento]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onCreateAccount = async (e) => {
    e.preventDefault();
    if (inputValues.password === inputValues.password2) {
      try {
        await signup(inputValues.email, inputValues.password).then(
          (userCredential) => {
            const user = userCredential.user;
            // User info
            setDoc(doc(firestore, "users", userCredential.user.uid), {
              nombre: inputValues.name,
              apellido: inputValues.lastname,
              email: inputValues.email,
              fechaNacimiento: fechaNacimiento,
              puntos: 0,
              telefono: "00-00000000"
            });
            // Quests
            const userRefQuests = collection(
              firestore,
              "users",
              userCredential.user.uid,
              "quests"
            );
            setDoc(doc(userRefQuests, "buy_products"), buy_products_quest);
            setDoc(doc(userRefQuests, "qr_scan"), qr_scan_quest);
            setDoc(doc(userRefQuests, "scavenger_quest"), scavenger_hunt_quest);
            setDoc(doc(userRefQuests, "quick_buy"), quick_buy_quest);
            // // Purchase History
            // const userRefPurchaseHistory = collection(
            //   firestore,
            //   "users",
            //   userCredential.user.uid,
            //   "purchase_history"
            // );
            // addDoc(userRefPurchaseHistory, {});
            // // Payment Methods
            // const userRefPaymentMethods = collection(
            //   firestore,
            //   "users",
            //   userCredential.user.uid,
            //   "payment_methods"
            // );
            // addDoc(userRefPaymentMethods, {});
            // // Used Coupons
            // const userRefUsedCoupons = collection(
            //   firestore,
            //   "users",
            //   userCredential.user.uid,
            //   "used_coupons"
            // );
            // addDoc(userRefUsedCoupons, {});
          }
        );
        navigate("/perfil");
      } catch (error) {
        setError(error.code);
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("Correo ingresado ya existe");
            setInputValues((prevValues) => ({
              ...prevValues,
              email: "",
            }));
            break;
          case "auth/invalid-email":
            toast.error("Correo ingresado es inválido");
            setInputValues((prevValues) => ({
              ...prevValues,
              email: "",
            }));
            break;
          case "auth/weak-password":
            toast.error("Contraseña debe ser más de 6 caracteres");
            setInputValues((prevValues) => ({
              ...prevValues,
              password: "",
              password2: "",
            }));
            break;
          default:
            toast.error("Hubo un error inesperado, intenta más tarde");
            break;
        }
      }
    } else {
      setError("Las contraseñas deben de coincidir");
      toast.error("Las contraseñas deben de coincidir");
    }
  };

  // Viejo código de toast.error, no parece ver cambio cuando se quita.
  //   , {
  //   position: "top-center",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  // }

  return (
    <>
      <AppBar />
      <ToastContainer />
      <div onClick={() => navigate(-1)}>
        <Back src={Arrow} alt="Regresar" style={{ top: "80px" }} />
      </div>
      <div id="errorMessage">{errorMsg}</div>
      <div className="container">
        <div className="column">
          <Titulo>Crea tu Cuenta</Titulo>
          <Input
            id="nombre"
            name="name"
            required
            placeholder="Nombre"
            value={inputValues.name}
            // onChange={event => {setName(event.target.value); buttonDisableHandler(); console.log(name);}}
            onChange={handleInputChange}
          />
          <Input
            id="lastname"
            name="lastname"
            required
            placeholder="Apellido"
            value={inputValues.lastname}
            // onChange={event => {setLastName(event.target.value); buttonDisableHandler();}}
            onChange={handleInputChange}
          />
          <Input
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Correo electrónico"
            value={inputValues.email}
            // onChange={event => {setEmail(event.target.value); buttonDisableHandler();}}
            onChange={handleInputChange}
          />

          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Contraseña"
            value={inputValues.password}
            // onChange={event => {setPassword(event.target.value); buttonDisableHandler();}}
            onChange={handleInputChange}
          />

          <Input
            id="password2"
            name="password2"
            type="password"
            required
            placeholder="Confirma tu contraseña"
            value={inputValues.password2}
            // onChange={event => {setPassword2(event.target.value); buttonDisableHandler();}}
            onChange={handleInputChange}
          />

          <InputDiv className={"inputWithIcon"}>
            {/* <InputDate placeholder="Fecha de Nacimiento"/> */}
            <Fecha
              type="date"
              id="start"
              name="fechaNacimiento"
              min="1923-01-01"
              max="2023-12-31"
              onChange={(event) => {
                setFechaNacimiento(event.target.valueAsDate);
              }}
            ></Fecha>
            {/* <img className="right-icon" src={Calendar} alt="heb-logo" /> */}
          </InputDiv>
          {/* <Input placeholder="Fecha de Nacimiento"/> */}
          <SignUpButton
            onClick={onCreateAccount}
            className="CrearCuenta"
            isValid={isValid}
            disabled={!isValid}
          >
            Crear Cuenta
          </SignUpButton>
        </div>
      </div>
      <NavBarAccess />
    </>
  );
}

export default CrearCuenta;
