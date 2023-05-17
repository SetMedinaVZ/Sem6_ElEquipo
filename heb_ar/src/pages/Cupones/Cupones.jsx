import React, { useState, useEffect } from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import { Titulo } from "./CuponesStyled";
import './Cupones.css';
import Info from "../../assets/icons/info.svg";
import CloseImg from "../../assets/icons/close3.svg";
import CuponImg from "../../assets/imgs/coupon.svg";
import HebIMG from "../../assets/imgs/logo.svg";
import BlurPage from "../../common/BlurPage";

function Cupones() {
  // const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeSeconds, setTimeSec] = useState(localStorage.getItem('clockSeconds'));
  const [timeMinutes, setTimeMin] = useState(localStorage.getItem('clockMinutes'));
  const [loginDate, setLoginDate] = useState(Date.now());
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);
  const [isActive3, setActive3] = useState(false);

  const [Popup, setPopUp] = useState(false);
  const [PopupText, setPopUpText] = useState("");

  // REVIEW AND CHANGE POPUPTEXT TO BE DYNAMIC / LINKED TO BD RN ONLY BASIC TASK
  const CuponSelected = (textoCupon) => {
    setPopUp(true);
    setPopUpText(textoCupon)
  }

  const CuponDeselected = () => {
    setPopUp(false);
  }

  const getTime = () => {
    const time = Date.now() - loginDate;

    // setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    setLoginDate(Date.now());
    const interval = setInterval(() => getTime(loginDate), 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() =>{
    setTimeSec(localStorage.getItem("clockSeconds"));
    setTimeMin(localStorage.getItem("clockMinutes"));
    // console.log("UseContextSecs: "+timeSeconds);
    // console.log(seconds);
    if(seconds >= 10){
      setActive1(true);
    }
    if(minutes >= 1 && seconds >= 10){
      setActive2(true);
    }
    if(minutes >= 2 && seconds >= 30){
      setActive3(true);
    }
    return;
  },[seconds]);

  return (
    <>
      <AppBar />
      <div className="container">
        <Titulo>Cupones por tiempo</Titulo>
        <div className="Tiempo" id="tiempo">
          <img src={Info} className="InfoSvg" alt="info"/>
          <h1 className="TimeVar">{timeMinutes   + ":" + timeSeconds}</h1>
        </div>
        <div className="CuponesLayout">
          <div className="cupon">
            <div className="NivelCupon">
              <h1>Nivel 1</h1>
            </div>
            {!isActive1 &&
            <div className="TimeText">
                <h1>Desbloquea:</h1>
                <h1>25:00</h1>
            </div>
            }
            <div className="cupon-info" style={{filter: isActive1 ? '' : 'blur(10px)', pointerEvents: isActive1 ? '':'none'}} onClick={() => CuponSelected('5% de descuento en la compra de un paquete de tortillas de maiz de marca HEB.')}>
              <img src={CuponImg} alt="Cupon" className="cupon-img" />
              <img src={HebIMG} alt="HEB" className="heb-img" />
              <p className="cupon-text">5% de descuento en la compra de un paquete de tortillas de maiz de marca HEB.</p>
            </div>
          </div>
        </div>
        <div className="CuponesLayout">
          <div className="cupon">
            <div className="NivelCupon">
              <h1>Nivel 2</h1>
            </div>
            {!isActive2 &&
            <div className="TimeText">
                <h1>Desbloquea:</h1>
                <h1>45:00</h1>
            </div>
            }
            <div className="cupon-info" style={{filter: isActive2 ? '' : 'blur(10px)', pointerEvents: isActive2 ? '':'none'}} onClick={() => CuponSelected('8% de descuento en la compra de un paquete de Tortillas de HARINA marca HEB.')}>
              <img src={CuponImg} alt="Cupon" className="cupon-img" />
              <img src={HebIMG} alt="HEB" className="heb-img" />
              <p className="cupon-text">8% de descuento en la compra de un paquete de Tortillas de HARINA, marca HEB.</p>
            </div>
          </div>
        </div>
        <div className="CuponesLayout">
          <div className="cupon">
            <div className="NivelCupon">
              <h1>Nivel 3</h1>
            </div>
            {!isActive3 &&
            <div className="TimeText">
                <h1>Desbloquea:</h1>
                <h1>60:00</h1>
            </div>
            }
            <div className="cupon-info" style={{filter: isActive3 ? '' : 'blur(10px)', pointerEvents: isActive3 ? '':'none'}} onClick={() => CuponSelected('12% de descuento en la compra de productos higienicos marca HEB.')}>
              <img src={CuponImg} alt="Cupon" className="cupon-img" />
              <img src={HebIMG} alt="HEB" className="heb-img" />
              <p className="cupon-text">12% de descuento en la compra de productos higienicos, marca HEB.</p>
            </div>
          </div>
        </div>
      </div>
      <NavBar pagina={'cupones'} />
      {Popup && <div className="CuponPopup" id="CuponPopup">
        <div className="cupon-infoPopup">
          <img src={CuponImg} alt="Cupon" className="cupon-imgPopup" />
          <img src={CloseImg} alt="Cupon" className="close-imgPopup" onClick={CuponDeselected}/>
          <p className="cupon-textPopup">{PopupText}</p>
          <button className="PopUpButton" onClick={CuponDeselected}>Utilizar</button>
        </div>
      </div>}
      {Popup && <BlurPage></BlurPage>}
    </>
  );
}

export default Cupones;
