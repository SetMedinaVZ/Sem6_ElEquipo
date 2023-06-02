import React, { useState, useEffect } from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import Escaner from "../../components/Escaner/escaner";
import ScannerProductInfo from "../../components/ScannerProductInfo/ScannerProductInfo";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTO } from "../../graphql/queries/getProducto";
import { useAuth } from "../../context/AuthContext";
import { firestore } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import "./Escaneo.css";
import styled from "styled-components";

const ScannerModule = styled.div`
  display: ${(props) => (props.scanned ? "block" : "none")};
`;

function Escaneo() {
  const { currentUser } = useAuth();
  const [scannedCode, setScannedCode] = useState(false);
  const [getProduct, { loading, data }] = useLazyQuery(GET_PRODUCTO);
  const [qrData, setqrData] = useState(null);

  const getQRQuests = async () => {
    const userRefQuests = collection(
      firestore,
      "users",
      currentUser.uid,
      "quests"
    );
    const userRefQuestsQuery = query(userRefQuests);
    const userRefQuestsSnapshot = await getDocs(userRefQuestsQuery);
    const auxBuyQuest = [];
    userRefQuestsSnapshot.docs.forEach((doc) => {
      if (doc.id === "qr_scan") {
        Object.entries(doc.data()).forEach(([key, value]) => {
          if (value.completed === false) {
            auxBuyQuest.push({
              idAct: value.idAct,
            });
          }
        });
      }
    });

    const questsRef = query(collection(firestore, "quests"));
    const questsSnapshot = await getDocs(questsRef);
    questsSnapshot.docs.forEach((doc) => {
      if (doc.id === "qr_scan") {
        Object.entries(doc.data()).forEach(([key, value]) => {
          for (let i = 0; i < auxBuyQuest.length; i++) {
            if (auxBuyQuest[i].idAct === value.idAct) {
              auxBuyQuest[i].criterio = value.criterio;
              auxBuyQuest[i].premioPuntos = value.premioPuntos;
            }
          }
        });
      }
    });
    // console.log(auxBuyQuest);
    // setQuestData(auxBuyQuest);
    setqrData(auxBuyQuest);
  };

  // const checkQuestQR = async () => {};

  const onNewScanResult = (decodedText) => {
    if (isNaN(parseInt(decodedText[0]))) {
      qrData.forEach((data) => {
        // console.log("Criterio ", data.criterio);
        // console.log("QR ", decodedText);
        // console.log(data.criterio === decodedText);
        if (data.criterio === decodedText) {
          console.log("yay")
        }
      });
      console.log(decodedText);
    }
    // try {
    else if (!scannedCode) {
      getProduct({ variables: { upc: decodedText } });
    }
    // } catch {
    //   console.log("ERROR");
    // }
  };

  /*
  [
    {
      criterio: "szdxcfgvhjbklmhvgcfx",
      idAct: "fgjhkljvghcf"
    }
  ]
   */

  useEffect(() => {
    getQRQuests();

    try {
      if (data.producto[0]) {
        setScannedCode(true);
      }
    } catch {
      console.log("Not aviable");
    }
  }, [data]);

  const closeModal = () => {
    setScannedCode(false);
  };

  // console.log(qrData);

  return (
    <>
      <AppBar />
      <Escaner
        fps={20}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
      {scannedCode && (
        <ScannerModule scanned={scannedCode} className="center">
          <ScannerProductInfo
            data={data.producto[0]}
            onButtonClose={closeModal}
            onClose={closeModal}
          />
        </ScannerModule>
      )}
      <NavBar pagina={"escaneo"} />
    </>
  );
}

export default Escaneo;
