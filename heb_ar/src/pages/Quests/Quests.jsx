import { React, useState, useEffect } from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import { Link } from "react-router-dom";
import SP from "../../assets/imgs/quest_img_4.svg";
import SH from "../../assets/imgs/quest_img_3.svg";
import BP from "../../assets/imgs/quest_img_2.svg";
import QB from "../../assets/imgs/quest_img_1.svg";
import Light from "../../assets/imgs/quest_img_5.svg";
import {
  Titulo,
  ProgressDiv,
  Percentage,
  Progress,
  Column,
  Row,
  ScanProducts,
  ScavengerHunt,
  BuyProducts,
  QuickBuy,
  Counter,
  SPimg,
  SHimg,
  BPimg,
  QBimg,
  Line,
  ConsejoDiv,
  ConsejoTxt,
  ConsejoImgDiv,
  ConsejoImg,
  ConsejoDesc,
} from "./QuestsStyled";
import { collection, getDocs, query, where, getDoc } from "firebase/firestore";

import { firestore } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

function Quests() {
  const [countMade, setCountMade] = useState(0);
  const [countToMake, setCountToMake] = useState(0);

  const [actBuy, setActBuy] = useState(0);
  const [actQR, setActQR] = useState(0);
  const [actQuick, setActQuick] = useState(0);
  const [actScav, setActScav] = useState(0);

  const [userActBuy, setUserActBuy] = useState(0);
  const [userActQR, setUserActQR] = useState(0);
  const [userActQuick, setUserActQuick] = useState(0);
  const [usertActScav, setUserActScav] = useState(0);

  const { currentUser } = useAuth();

  const [count, setCount] = useState(
    ((countMade / countToMake) * 100).toFixed()
  );

  const navigation = useNavigate();

  useEffect(() => {
    setCount(((countMade / countToMake) * 100).toFixed());
  }, [countMade, countToMake]);

  const getUserQuests = async () => {
    const userPurchaseHistoryRef = collection(
      firestore,
      "users",
      currentUser.uid,
      "quests"
    );
    const userPurchaseHistoryQuery = query(userPurchaseHistoryRef);
    const userPurchaseHistorySnapshot = await getDocs(userPurchaseHistoryQuery);
    let dataAux = [];
    userPurchaseHistorySnapshot.docs.map((doc) =>
      dataAux.push({ id: doc.id, ...doc.data() })
    );

    dataAux.forEach((row) => {
      let trueCount = 0;
      for (let i = 1; i <= row.actCount; i++) {
        let acts = "act";
        let str = acts + i;
        if (row[str].completed === true) {
          trueCount = trueCount + 1;
        }
      }
      console.log(trueCount);
      if (row.id === "buy_products") {
        setUserActBuy(trueCount);
        setCountMade((prevState) => prevState + trueCount);
      } else if (row.id === "qr_scan") {
        setUserActQR(trueCount);
        setCountMade((prevState) => prevState + trueCount);
      } else if (row.id === "quick_buy") {
        setUserActQuick(trueCount);
        setCountMade((prevState) => prevState + trueCount);
      } else if (row.id === "scavenger_hunt") {
        setUserActScav(trueCount);
        setCountMade((prevState) => prevState + trueCount);
      }
    });

  };

  const getQuestsInfo = async () => {
    const userPurchaseHistoryRef = collection(firestore, "quests");
    const userPurchaseHistoryQuery = query(userPurchaseHistoryRef);
    const userPurchaseHistorySnapshot = await getDocs(userPurchaseHistoryQuery);
    let dataAux = [];
    userPurchaseHistorySnapshot.docs.map((doc) =>
      dataAux.push({ id: doc.id, ...doc.data() })
    );

    let totActCount = 0;
    dataAux.forEach((row) => {
      totActCount = totActCount + row.actCount;
      if (row.id === "buy_products") {
        setActBuy(row.actCount);
      } else if (row.id === "qr_scan") {
        setActQR(row.actCount);
      } else if (row.id === "quick_buy") {
        setActQuick(row.actCount);
      } else if (row.id === "scavenger_quest") {
        setActScav(row.actCount);
      }
      // console.log(row);
    });
    setCountToMake(totActCount);
  };

  useEffect(() => {
    getUserQuests();
    getQuestsInfo();
  }, []);

  return (
    <>
      <AppBar />
      <div className="container">
        <Titulo>Tus Quests</Titulo>

        <ProgressDiv>
          <Percentage>{count}%</Percentage>
          <Progress color="inherit" variant="determinate" value={count} />
        </ProgressDiv>

        <Column>
          <Row>
            <Link to="/quests/qr_scan">
              <ScanProducts>
                <Counter>
                  {userActQR}/{actQR}
                </Counter>
                <SPimg src={SP} />
              </ScanProducts>
            </Link>
            
            <Link to="/quests/scavenger_quest">
              <ScavengerHunt>
                <Counter>
                  {usertActScav}/{actScav}
                </Counter>
                <SHimg src={SH} />
              </ScavengerHunt>
            </Link>
          </Row>

          <Row>
            <Link to="/quests/buy_products">
              <BuyProducts>
                <Counter>
                  {userActBuy}/{actBuy}
                </Counter>
                <BPimg src={BP} />
              </BuyProducts>
            </Link>

            <Link to="/quests/quick_buy">
              <QuickBuy>
                <Counter>
                  {userActQuick}/{actQuick}
                </Counter>
                <QBimg src={QB} />
              </QuickBuy>
            </Link>
          </Row>
        </Column>

        <Line></Line>

        <ConsejoDiv>
          <ConsejoTxt>Consejos para las misiones</ConsejoTxt>

          <ConsejoImgDiv>
            <ConsejoImg>
              <img src={Light} alt="Consejo" />
            </ConsejoImg>

            <ConsejoDesc>
              Para completar las misiones de escaneo puedes usar el croquis
              incluido en la app
            </ConsejoDesc>
          </ConsejoImgDiv>
        </ConsejoDiv>
      </div>
      <NavBar pagina={"quests"} />
    </>
  );
}

export default Quests;
