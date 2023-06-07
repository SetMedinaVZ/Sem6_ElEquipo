import React, { useState, useEffect, useCallback } from "react";
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
import QuestCompleted from "../../components/QuestCompleted/QuestCompleted";

const ScannerModule = styled.div`
  display: ${(props) => (props.scanned ? "block" : "none")};
`;

function Escaneo() {
  const { currentUser } = useAuth();
  const [scannedCode, setScannedCode] = useState(false);
  const [getProduct, { loading, data }] = useLazyQuery(GET_PRODUCTO);
  const [ qrData, setQrData] = useState([{}]);

  const [completedQrQuest, setCompletedQrQuest] = useState(false);


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
    
    setQrData(auxBuyQuest);
    return auxBuyQuest;
  };

  const onNewScanResult = async(decodedText) => {
    try {
      if (isNaN(parseInt(decodedText[0]))) {
        const det = [];
        await getQRQuests()
          .then((respo) => {
            respo.map(d => det.push(d));
          });

        det.forEach((dat) => {
          if(dat.criterio === decodedText){
            // console.log(dat);
            // console.log(decodedText);
            updateQuests(dat);
            setCompletedQrQuest(true);
          }
        });
      }
      else if (!scannedCode) {
        getProduct({ variables: { upc: decodedText } });
      }
    } catch {
      console.log("ERROR");
    }
  };

  const updateQuests = async (questData) => {
    const userRef = doc(firestore, "users", currentUser.uid);
    const qrScanRef = doc(userRef, "quests/qr_scan");
    
    const pointsSnap = await getDoc(userRef);
    const newPoints = pointsSnap.data().puntos + questData.premioPuntos;
    // console.log(newPoints);
    const updateData = {};
    // console.log(questData);
    updateData[`act2.completed`] = true;
    console.log(updateData);
    try {
      await updateDoc(qrScanRef, updateData);
      await updateDoc(userRef, {
        puntos: newPoints,
      });
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

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
    setCompletedQrQuest(false);
  };

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
          <ScannerProductInfo
            data={data.producto[0]}
            onButtonClose={closeModal}
            onClose={closeModal}
          />
        </ScannerModule>
      )}
      {completedQrQuest && (
        <QuestCompleted
          onCloseButton={closeModal}
          message="¡Felicidades, completaste un Quest de scanear QR"
          criteria={`Scan de QR`}
          points={'200'}
        />
      )}
      <NavBar pagina={"escaneo"} />
    </>
  );
}

export default Escaneo;
