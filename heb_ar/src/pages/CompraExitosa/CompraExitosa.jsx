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
    // console.log(auxBuyQuest);
    // setQuestData(auxBuyQuest);
    return auxBuyQuest;
  };

  const checkIfCompletedQuest = (totalQta, questsLists) => {
    console.log(totalQta);
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
      // if (valorMasCercano > totalQta) {
      //   console.log(
      //     `El número más cercano a 1 es ${valorMasCercano} y es mayor.`
      //   );
      // } else if (valorMasCercano < totalQta) {
      //   console.log(
      //     `El número más cercano a 1 es ${valorMasCercano} y es menor.`
      //   );
      // } else {
      //   console.log(
      //     `El número más cercano a 1 es ${valorMasCercano} y es igual.`
      //   );
      // }
      let completed = false;
      if (totalQta < valorMasCercano) {
        completed = false;
      } else if (totalQta > valorMasCercano || totalQta === valorMasCercano) {
        completed = true;
      }
      console.log(completed);
    });
  };

  //   / Valor más cercano a 6
  // let valorMasCercano = valores[0]; // Asignamos el primer valor como el más cercano inicialmente
  // let diferenciaMasCercana = Math.abs(6 - valorMasCercano); // Diferencia inicial

  // // Recorremos la lista de valores
  // valores.forEach(valor => {
  //   const diferencia = Math.abs(6 - valor); // Diferencia actual

  //   // Verificamos si encontramos un valor más cercano
  //   if (diferencia < diferenciaMasCercana) {
  //     valorMasCercano = valor; // Actualizamos el valor más cercano
  //     diferenciaMasCercana = diferencia; // Actualizamos la diferencia más cercana
  //   }
  // });

  // // Verificamos si el número más cercano es mayor o menor a 6
  // if (valorMasCercano > 6) {
  //   console.log(`El número más cercano a 6 es ${valorMasCercano} y es mayor.`);
  // } else if (valorMasCercano < 6) {
  //   console.log(`El número más cercano a 6 es ${valorMasCercano} y es menor.`);
  // } else {
  //   console.log(`El número más cercano a 6 es ${valorMasCercano} y es igual.`);
  // }

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
    </div>
  );
};

export default CompraExitosa;
