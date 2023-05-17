import React, { useState, useEffect } from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import { CuponInfo, TimeText, Titulo } from "./CuponesStyled";
import './Cupones.css';
import Info from "../../assets/icons/info.svg";
import CloseImg from "../../assets/icons/close3.svg";
import CuponImg from "../../assets/imgs/coupon.svg";
import HebIMG from "../../assets/imgs/logo.svg";
import BlurPage from "../../common/BlurPage";
import { CuponesLayout, Cupon, NivelCupon } from "./CuponesStyled";

function Cupones() {
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeSeconds, setTimeSec] = useState(localStorage.getItem('clockSeconds'));
  const [timeMinutes, setTimeMin] = useState(localStorage.getItem('clockMinutes'));
  const [loginDate, setLoginDate] = useState(Date.now());

  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);
  const [isActive3, setActive3] = useState(false);

  const [Popup, setPopUp] = useState(false);
  const [PopupText, setPopUpText] = useState("");

  const CuponSelected = (textoCupon) => {
    setPopUp(true);
    setPopUpText(textoCupon);
  }

  const CuponDeselected = () => {
    setPopUp(false);
  }

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

  useEffect(() =>{
    setTimeSec(localStorage.getItem("clockSeconds"));
    setTimeMin(localStorage.getItem("clockMinutes"));

    if(timeSeconds >= 10){
      setActive1(true);
    }
    if(timeMinutes >= 1 && timeSeconds >= 10){
      setActive2(true);
    }
    if(timeMinutes >= 2 && timeSeconds >= 30){
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
        <CuponesLayout>
          <Cupon>
            <NivelCupon>
              <h1>Nivel 1</h1>
            </NivelCupon>
            {!isActive1 &&
            <TimeText>
                <h1>Desbloquea:</h1>
                <h1>25:00</h1>
            </TimeText>
            }
            <CuponInfo style={{filter: isActive1 ? '' : 'blur(10px)', pointerEvents: isActive1 ? '':'none'}} onClick={() => CuponSelected('5% de descuento en la compra de un paquete de tortillas de maiz de marca HEB.')}>
              <img src={CuponImg} alt="Cupon" className="cupon-img" />
              <img src={HebIMG} alt="HEB" className="heb-img" />
              <p className="cupon-text">5% de descuento en la compra de un paquete de tortillas de maiz de marca HEB.</p>
            </CuponInfo>
          </Cupon>
        </CuponesLayout>
        <CuponesLayout>
          <Cupon>
            <NivelCupon>
              <h1>Nivel 2</h1>
            </NivelCupon>
            {!isActive2 &&
            <TimeText>
                <h1>Desbloquea:</h1>
                <h1>45:00</h1>
            </TimeText>
            }
            <CuponInfo style={{filter: isActive2 ? '' : 'blur(10px)', pointerEvents: isActive2 ? '':'none'}} onClick={() => CuponSelected('8% de descuento en la compra de un paquete de Tortillas de HARINA marca HEB.')}>
              <img src={CuponImg} alt="Cupon" className="cupon-img" />
              <img src={HebIMG} alt="HEB" className="heb-img" />
              <p className="cupon-text">8% de descuento en la compra de un paquete de Tortillas de HARINA, marca HEB.</p>
            </CuponInfo>
          </Cupon>
        </CuponesLayout>
        <CuponesLayout>
          <Cupon>
            <NivelCupon>
              <h1>Nivel 3</h1>
            </NivelCupon>
            {!isActive3 &&
            <TimeText>
                <h1>Desbloquea:</h1>
                <h1>60:00</h1>
            </TimeText>
            }
            <CuponInfo style={{filter: isActive3 ? '' : 'blur(10px)', pointerEvents: isActive3 ? '':'none'}} onClick={() => CuponSelected('12% de descuento en la compra de productos higienicos marca HEB.')}>
              <img src={CuponImg} alt="Cupon" className="cupon-img" />
              <img src={HebIMG} alt="HEB" className="heb-img" />
              <p className="cupon-text">12% de descuento en la compra de productos higienicos, marca HEB.</p>
            </CuponInfo>
          </Cupon>
        </CuponesLayout>
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
