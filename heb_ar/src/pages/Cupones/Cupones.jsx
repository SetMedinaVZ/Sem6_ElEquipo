import React, { useState, useEffect } from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import { CuponInfo, TimeText, Titulo } from "./CuponesStyled";
import "./Cupones.css";
import Info from "../../assets/icons/info.svg";
import CloseImg from "../../assets/icons/close3.svg";
import CuponImg from "../../assets/imgs/coupon.svg";
import HebIMG from "../../assets/imgs/logo.svg";
import BlurPage from "../../common/BlurPage";
import { CuponesLayout, Cupon, NivelCupon } from "./CuponesStyled";
import { useAuth } from "../../context/AuthContext";
import {
  collection,
  getDocs,
  query,
  doc,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "@mui/material/Tooltip";

function Cupones() {
  const { currentUser } = useAuth();
  const [seconds, setSeconds] = useState(0);
  const [timeSeconds, setTimeSec] = useState(
    localStorage.getItem("clockSeconds")
  );
  const [timeMinutes, setTimeMin] = useState(
    localStorage.getItem("clockMinutes")
  );
  const [loginDate, setLoginDate] = useState(Date.now());
  const [showTooltip, setShowTooltip] = useState(false);

  const [cuponToUse, setCuponData] = useState([]);

  const [cuponesEnCanje, setCuponesEnCanje] = useState([]);
  const [cuponSeleccionado, setCuponSeleccionado] = useState(null);

  const [Popup, setPopUp] = useState(false);
  const [PopupText, setPopUpText] = useState("");

  const CuponSelected = (row) => {
    setPopUp(true);
    setPopUpText(row.textoCupon);
    setCuponSeleccionado(row);
  };

  const verifyCouponsInUse = () => {
    let inUse = false;
    cuponesEnCanje.forEach((row) => {
      console.log("row", row);
      if (
        row.enCheckout == true ||
        (row.canjeado == true && row.id == cuponSeleccionado.id)
      ) {
        inUse = true;
      }
    });
    return inUse;
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  //Function to handle the cupon deselected event
  const CuponDeselected = async () => {
    //If cupon is in use, then we can't use it
    if (verifyCouponsInUse()) {
      toast.error("Ya has usado este cupón");
      //Set popup to false to close it
      setPopUp(false);
    }
    //If cupon is not in use, then we can use it so we update the data in the database
    else {
      const usedCouponsRef = collection(
        firestore,
        "users",
        currentUser.uid,
        "used_coupons"
      );
      //Add cuponSeleccionado in used_coupons collection inside the user document with enCheckout = true
      await setDoc(doc(usedCouponsRef, cuponSeleccionado.id), {
        id: cuponSeleccionado.id,
        porcValor: cuponSeleccionado.porcValor,
        canjeado: false,
        enCheckout: true,
      });
      toast.success("Cupón canjeado con éxito");
      setPopUp(false);
    }
  };

  const getTime = () => {
    const time = Date.now() - loginDate;

    // setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    setLoginDate(Date.now());
    const interval = setInterval(() => getTime(loginDate), 1000);

    return () => clearInterval(interval);
  }, []);

  //Obtener cupones disponibles para el usuario
  const getCuponesDisp = async () => {
    const userCuponAvailableRef = collection(firestore, "cupones");
    const userCuponAvailableQuery = query(userCuponAvailableRef);
    const userCuponAvailableSnapShot = await getDocs(userCuponAvailableQuery);
    const cuponData = userCuponAvailableSnapShot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    let nivel1 = [];
    let nivel2 = [];
    let nivel3 = [];
    cuponData.forEach((row) => {
      if (row.nivel == 1) {
        let rowToPush = {
          nivel: row.nivel,
          porcValor: row.porcValor,
          textoCupon: row.textoCupon,
          isactive: false,
          tiempoDesb: "25:00",
          id: row.id,
        };
        nivel1.push(rowToPush);
      } else if (row.nivel == 2) {
        let rowToPush = {
          nivel: row.nivel,
          porcValor: row.porcValor,
          textoCupon: row.textoCupon,
          isactive: false,
          tiempoDesb: "40:00",
          id: row.id,
        };
        nivel2.push(rowToPush);
      } else {
        let rowToPush = {
          nivel: row.nivel,
          porcValor: row.porcValor,
          textoCupon: row.textoCupon,
          isactive: false,
          tiempoDesb: "60:00",
          id: row.id,
        };
        nivel3.push(rowToPush);
      }
    });

    let length1 = Math.floor(Math.random() * nivel1.length);
    let length2 = Math.floor(Math.random() * nivel2.length);
    let length3 = Math.floor(Math.random() * nivel3.length);

    let finalCupones = [];
    finalCupones.push(nivel1[length1]);
    finalCupones.push(nivel2[length2]);
    finalCupones.push(nivel3[length3]);

    // console.log(finalCupones);
    setCuponData(finalCupones);
  };

  //Obtener cupones canjeados en proceso de canje para que no permita canjear mas
  //de uno del mismo nivel
  const getCuponesCanjeados = async () => {
    const userCouponsUsedRef = collection(
      firestore,
      "users",
      currentUser.uid,
      "used_coupons"
    );
    const userCouponsUsedSnapShot = await getDocs(userCouponsUsedRef);
    const cuponesEnCanje = userCouponsUsedSnapShot.docs.map(
      (doc) => doc.data(),
      doc.id
    );
    setCuponesEnCanje(cuponesEnCanje);
  };

  useEffect(() => {
    getCuponesDisp();
    getCuponesCanjeados();
  }, []);

  useEffect(() => {
    console.log("cupones en uso o canjeados", cuponesEnCanje);
    console.log("cupones disponibles", cuponToUse);
  }, [cuponesEnCanje]);

  useEffect(() => {
    setTimeSec(localStorage.getItem("clockSeconds"));
    setTimeMin(localStorage.getItem("clockMinutes"));

    // console.log(cuponToUse);

    if (timeMinutes > 0 || timeSeconds >= 30) {
      cuponToUse.forEach((row) => {
        if (row.nivel == 1) {
          row.isactive = true;
        }
      });
    }
    if (timeMinutes >= 1) {
      // setActive2(true);
      // cuponToUse[1].isactive = true;
      cuponToUse.forEach((row) => {
        if (row.nivel == 2) {
          row.isactive = true;
        }
      });
    }
    if (timeMinutes >= 2) {
      // setActive3(true);
      // cuponToUse[2].isactive = true;
      cuponToUse.forEach((row) => {
        if (row.nivel == 3) {
          row.isactive = true;
        }
      });
    }
    return;
  }, [seconds]);

  return (
    <>
      <AppBar />
      <ToastContainer />
      <div className="container">
        <Titulo>Cupones por tiempo</Titulo>
        <div className="Tiempo" id="tiempo">
          <Tooltip
            title={
              <p>
                Descubre los tres niveles de cupones especiales. El temporizador
                desbloquea el siguiente nivel cuando se agota el tiempo.
                ¡Mejores cupones en niveles superiores! Aprovecha las
                recompensas ahora.
              </p>
            }
            arrow
            open={showTooltip}
          >
            <img
              src={Info}
              className="InfoSvg"
              alt="info"
              onClick={() => setShowTooltip((prev) => !prev)}
            />
          </Tooltip>
          <h1 className="TimeVar">{timeMinutes + ":" + timeSeconds}</h1>
        </div>
        {cuponToUse.map((row, index) => (
          <div key={index}>
            <CuponesLayout>
              <Cupon>
                <NivelCupon>
                  <h1>Nivel {row.nivel}</h1>
                </NivelCupon>
                {!row.isactive && (
                  <TimeText>
                    <h1>Desbloquea:</h1>
                    <h1>{row.tiempoDesb}</h1>
                  </TimeText>
                )}
                <CuponInfo
                  style={{
                    filter: row.isactive ? "" : "blur(10px)",
                    pointerEvents: row.isactive ? "" : "none",
                  }}
                  onClick={() => {
                    setShowTooltip(false);
                    CuponSelected(row);
                  }}
                >
                  <img src={CuponImg} alt="Cupon" className="cupon-img" />
                  <img src={HebIMG} alt="HEB" className="heb-img" />
                  <p className="cupon-text">{row.textoCupon}</p>
                </CuponInfo>
              </Cupon>
            </CuponesLayout>
          </div>
        ))}
      </div>
      <NavBar pagina={"cupones"} />
      {Popup && (
        <div className="CuponPopup" id="CuponPopup">
          <div className="cupon-infoPopup">
            <img src={CuponImg} alt="Cupon" className="cupon-imgPopup" />
            <img
              src={CloseImg}
              alt="Cupon"
              className="close-imgPopup"
              onClick={closePopUp}
            />
            <p className="cupon-textPopup">{PopupText}</p>
            <button className="PopUpButton" onClick={CuponDeselected}>
              Utilizar
            </button>
          </div>
        </div>
      )}
      {Popup && <BlurPage></BlurPage>}
    </>
  );
}

export default Cupones;
