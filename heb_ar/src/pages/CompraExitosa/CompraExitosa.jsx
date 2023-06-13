/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Back, Titulo } from "../Perfil/PerfilStyled";
import { TextG } from "../Pago/Pago.styled";
import Arrow from "../../assets/icons/arrow.svg";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Check from "../../assets/icons/check.svg";
import QRCode from "react-qr-code";
import { useAuth } from "../../context/AuthContext";
import { firestore } from "../../firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import QuestCompleted from "../../components/QuestCompleted/QuestCompleted";

const Titulo2 = styled(Titulo)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 40px;
  text-align: center;
  color: black;
`;

const Texto = styled(TextG)`
  font-size: 24px;
  text-align: center;
`;

const CompraExitosa = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { voucher, puntos } = location.state;
  const [voucherString, setVoucherString] = useState("");
  const { currentUser } = useAuth();
  const [completedBuyQuest, setCompletedBuyQuest] = useState(false);
  const [questData, setQuestData] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState({});

  const getBuyQuests = async () => {
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
      if (doc.id === "buy_products") {
        Object.entries(doc.data()).forEach(([key, value]) => {
          if (typeof value === "object" && value.completed === false) {
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
      if (doc.id === "buy_products") {
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

    console.log("Quest Data recieved: ", auxBuyQuest);
    setQuestData(auxBuyQuest);
  };

  function nearestLargerEqual(num) {
    // Filtrar la lista para contener solo números menores o iguales a num
    let validNums = questData.filter((n) => n.criterio <= num);

    // Si no hay números válidos, devolver 0
    if (validNums.length === 0) return;

    // Ordenar la lista de números válidos
    validNums.sort((a, b) => a.criterio - b.criterio);

    // Devolver el último elemento de la lista de números válidos, que será el más cercano a num
    return validNums[validNums.length - 1];
  }

  const checkIfCompletedQuest = () => {
    // Get the total quantity of products
    let totalQta = 0;
    voucher.forEach((obj) => {
      totalQta += obj.Cantidad;
    });

    const selectedQuest = nearestLargerEqual(totalQta);
    // if (selectedQuest && sessionStorage.getItem("buyQuestCompleted") === "false") {
    if (selectedQuest) {
      setCompletedBuyQuest(true);
      setSelectedQuest(selectedQuest);
      sessionStorage.setItem("buyQuestCompleted", "true");
      // console.log(sessionStorage.getItem("buyQuestCompleted"));
    }
  };

  const updateQuests = async () => {
    console.log("Selected Quest: ", selectedQuest);
    const userRef = doc(firestore, "users", currentUser.uid);
    const buyProductRef = doc(userRef, "quests/buy_products");
    const pointsSnap = await getDoc(userRef);
    const newPoints = pointsSnap.data().puntos + selectedQuest.premioPuntos;
    const updateData = {};
    updateData[`${selectedQuest.name}.completed`] = true;
    try {
      await updateDoc(buyProductRef, updateData);
      await updateDoc(userRef, {
        puntos: newPoints,
      });
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  useEffect(() => {
    if (voucher === 0 || voucher === null || voucher === undefined) {
      navigate("/carrito");
    } else {
      //Transform to string the voucher
      setVoucherString(JSON.stringify(voucher));
    }
    // console.log(sessionStorage.getItem("buyQuestCompleted"));

    if (!sessionStorage.getItem("buyQuestCompleted")) {
      sessionStorage.setItem("buyQuestCompleted", "false");
    }

    if (sessionStorage.getItem("buyQuestCompleted") === "false") {
      // Get quest data
      getBuyQuests();
    }
  }, []);

  useEffect(() => {
    if (questData.length !== 0) {
      console.log(questData);
      checkIfCompletedQuest();
    }
  }, [questData]);

  useEffect(() => {
    if (Object.keys(selectedQuest).length !== 0) {
      // console.log(questData);
      updateQuests();
    }
  }, [selectedQuest]);

  const closeModal = () => {
    setCompletedBuyQuest(false);
  };

  const handleReturn = () => {
    sessionStorage.removeItem("buyQuestCompleted");
    navigate(-1);
  };

  return (
    <div className="container mx-auto">
      <div onClick={handleReturn}>
        <Back src={Arrow} alt="Regresar" />
      </div>
      <Titulo2>¡Tu compra ha sido {<br />} exitosa!</Titulo2>
      <img src={Check} style={{ marginTop: "1rem" }} alt="Compra exitosa" />
      <Texto>Puntos generados en tu {<br />} compra:</Texto>
      <Titulo2 style={{ fontSize: "48px", padding: "0", margin: "1rem" }}>
        {puntos + " puntos"}
      </Titulo2>
      <Texto>Favor de presentar este {<br />} código QR en tu salida</Texto>
      <QRCode value={voucherString} />
      {completedBuyQuest && (
        <QuestCompleted
          onCloseButton={closeModal}
          message="¡Felicidades, completaste un Quest de comprar productos"
          criteria={`Compra minima de ${selectedQuest.criterio} puntos`}
          points={selectedQuest.premioPuntos}
        />
      )}
    </div>
  );
};

export default CompraExitosa;
