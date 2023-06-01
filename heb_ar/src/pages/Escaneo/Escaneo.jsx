import React, { useState, useEffect } from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import Escaner from "../../components/Escaner/escaner";
import ScannerProductInfo from "../../components/ScannerProductInfo/ScannerProductInfo";
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCTO } from "../../graphql/queries/getProducto";

import "./Escaneo.css";
import styled from "styled-components";

const ScannerModule = styled.div`
  display: ${props => props.scanned ? "block" : "none"};
`;

function Escaneo() {
  const [scannedCode, setScannedCode] = useState(false);
  const [getProduct, { loading, data }] = useLazyQuery(GET_PRODUCTO);
  
  const onNewScanResult = (decodedText) => {
    if (!scannedCode) {
      getProduct({ variables: { upc: decodedText } });
    }
  };

  useEffect(() => {
    try {
      if(data.producto[0]){
        setScannedCode(true);
      }
    } catch {
      console.log("Not aviable");
    }
  }, [data]);

  const closeModal = () => {
    setScannedCode(false);
  }

  return (
    <>
      <AppBar />
      <Escaner
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
      {scannedCode && (
        <ScannerModule scanned={scannedCode} className="center">
          <ScannerProductInfo data={data.producto[0]} onButtonClose={closeModal} onClose={closeModal}/>
        </ScannerModule>
      )}
      <NavBar pagina={"escaneo"} />
    </>
  );
}

export default Escaneo;
