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
  where,
  getDocs,
  addDoc,
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
  const [questData, setQuestData] = useState(null);

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
    return auxBuyQuest;
  };

  const updateQuests = async () => {};

  const checkIfCompletedQuest = (totalQta, questsLists) => {
    // console.log(totalQta);
    questsLists.then((result) => {
      let valorMasCercano = result[0].criterio;
      let diferenciaMasCercana = Math.abs(totalQta - valorMasCercano);
      result.forEach((data) => {
        const diferencia = Math.abs(totalQta - data.criterio);
        if (diferencia < diferenciaMasCercana) {
          valorMasCercano = data.criterio;
          diferenciaMasCercana = diferencia;
        }
      });
      if (totalQta > valorMasCercano || totalQta === valorMasCercano) {
        const completedObj = result.filter(
          (obj) => obj.criterio === valorMasCercano
        );
        // console.log(completedObj);
        setCompletedBuyQuest(true);
        setQuestData(completedObj);
      }
      // console.log(completed);

      // Get the act completed
      // console.log(result);
    });
  };

  useEffect(() => {
    if (voucher === 0 || voucher === null || voucher === undefined) {
      navigate("/carrito");
    } else {
      //Transform to string the voucher
      setVoucherString(JSON.stringify(voucher));
    }
    // Check if we completed a buy quest
    const questsLists = getBuyQuests();

    let total = 0;
    voucher.forEach((obj) => {
      total += obj.Cantidad;
    });

    checkIfCompletedQuest(total, questsLists);
  }, []);

  const closeModal = () => {
    setCompletedBuyQuest(false);
  };

  console.log(questData);

  return (
    <div className="container mx-auto">
      <div onClick={() => navigate(-1)}>
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
        (<QuestCompleted
          onCloseButton={closeModal}
          message="¡Felicidades, completaste un Quest de comprar productos"
          criteria={`Compra minima de ${questData[0].criterio} puntos`}
          points={questData[0].premioPuntos}
        />)
      )}
    </div>
  );
};

export default CompraExitosa;
