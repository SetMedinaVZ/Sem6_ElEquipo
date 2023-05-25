import React, { useEffect, useRef } from 'react';
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import Escaner from "../../components/Escaner/escaner";
// import Barcode

import "./Escaneo.css";

function Escaneo() {

  const videoRef = useRef(null);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    enableCamera();
  }, []);

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText);
    console.log(decodedResult);
  };

  return (
    <>
      <AppBar />
      <div className="container">
        <Escaner
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
      </div>
      <NavBar pagina={'escaneo'}/>
    </>
  );
}

export default Escaneo;
