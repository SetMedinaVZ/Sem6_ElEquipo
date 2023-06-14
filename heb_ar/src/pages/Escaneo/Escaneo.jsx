import React, { useState, useEffect, useCallback } from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import Escaner from "../../components/Escaner/escaner";
import ScannerProductInfo from "../../components/ScannerProductInfo/ScannerProductInfo";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTO } from "../../graphql/queries/getProducto";
import { useAuth } from "../../context/AuthContext";
import { firestore } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [didScan, setDidscan] = useState(false);
  const [getProduct, { loading, data }] = useLazyQuery(GET_PRODUCTO);
  const [qrData, setQrData] = useState([{}]);
  const [toastDispl, setToastDisp] = useState(false);
  // const [pause, setPause] = useState(false);

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
              name: key,
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

  const getQrCompleted = async () => {
    const userRefQuests = collection(
      firestore,
      "users",
      currentUser.uid,
      "quests"
    );
    const userRefQuestsQuery = query(userRefQuests);
    const userRefQuestsSnapshot = await getDocs(userRefQuestsQuery);
    const auxQRQuestComp = [];
    userRefQuestsSnapshot.docs.forEach((doc) => {
      if (doc.id === "qr_scan") {
        Object.entries(doc.data()).forEach(([key, value]) => {
          if (value.completed === true) {
            auxQRQuestComp.push({
              name: key,
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
          for (let i = 0; i < auxQRQuestComp.length; i++) {
            if (auxQRQuestComp[i].idAct === value.idAct) {
              auxQRQuestComp[i].criterio = value.criterio;
            }
          }
        });
      }
    });

    return auxQRQuestComp;
  };

  const onNewScanResult = async (decodedText) => {
    if (!scannedCode && !completedQrQuest) {
      setDidscan(true);
      if (isNaN(parseInt(decodedText[0]))) {
        const det = [];
        const detComp = [];
        await getQRQuests().then((respo) => {
          respo.map((d) => det.push(d));
        });
        await getQrCompleted().then((respo) => {
          respo.map((d) => detComp.push(d));
        });
        
        for(let i = 0; i < det.length; i++){
          if (det[i].criterio === decodedText) {
            updateQuests(det[i]);
            setCompletedQrQuest(true);
            console.log(i);
            return;
          }
        }
        
        for(let i = 0; i < detComp.length; i++){
          if (detComp[i].criterio === decodedText) {
            if(!toast.isActive("errorQR")){
              toast.error("Código invalido o Ya Acreditado",{toastId:"errorQR"});
            }
            return;
          }else{
            if(i < detComp.length){
              if(!toast.isActive("noExiste")){
                toast.error("Código invalido o inexistente",{toastId:"noExiste"});
              }
            }
          }
        }
      } else {
        getProduct({ variables: { upc: decodedText } });
      }
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
    updateData[`${questData.name}.completed`] = true;
    // console.log(updateData);
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
      } else {
        if (didScan) {
          toast.error("Código inválido");
          setDidscan(false);
        }
      }
    } catch {}
  }, [data]);

  const closeModal = () => {
    setScannedCode(false);
    setCompletedQrQuest(false);
  };

  return (
    <>
      <AppBar />
      <ToastContainer />
      {!scannedCode && !completedQrQuest && (
        <Escaner
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
          // canPause={pause}
        />
      )}
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
          points={"100"}
        />
      )}
      <NavBar pagina={"escaneo"} />
    </>
  );
}

export default Escaneo;
