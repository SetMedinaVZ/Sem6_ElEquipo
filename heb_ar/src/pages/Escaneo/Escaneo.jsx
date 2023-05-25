import React, { useState } from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import Escaner from "../../components/Escaner/escaner";
import ScannerProductInfo from "../../components/ScannerProductInfo/ScannerProductInfo";
// import Barcode

import "./Escaneo.css";
import styled from "styled-components";

const ScannerModule = styled.div`
  display: ${props => props.scanned ? "block" : "none"};
`;

const dummyData = {
  id: 123456789,
  fats: "0g por 100g",
  brand: "Coca Cola",
  calories: "30cal por 100g",
  category: "Refrescos",
  description:
    "Coca-Cola Original en botella de plástico de 600ml es la mejor manera de disfrutar cualquier platillo en casa o con tus amigos. Por su delicioso sabor, es ideal para acompañar tus comidas a toda hora. ¡Disfrútala bien fría! Haz más ricas tus comidas con el único, delicioso y refrescante sabor de Coca-Cola.",
  name: "Coca Cola Original",
  net_cont: "600ml",
  pop_index: 0,
  carbs: "7.5g por 100g",
  price: 18,
  protein: "0g por 100g",
  sodium: "10mg por 100g",
  subcategory: "refrescos",
  sugars: "7.5g por 100g",
  unit: "pz",
  upc: "75007614",
  url_img:
    "https://hebmx.vtexassets.com/arquivos/ids/213742-1600-1600?v=638144948194600000&width=1600&height=1600&aspect=true",
};

function Escaneo() {
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText);
    console.log(decodedResult);
  };
  const [scannedCode, setScannedCode] = useState(true);

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
      <ScannerModule scanned={scannedCode} className="center">
        <ScannerProductInfo data={dummyData} onButtonClose={closeModal} />
      </ScannerModule>
      <NavBar pagina={"escaneo"} />
    </>
  );
}

export default Escaneo;
