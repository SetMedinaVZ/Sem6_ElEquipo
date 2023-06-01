import React, { useEffect, useState } from "react";
// import AppBar from "../../common/AppBar/AppBar";
import Arrow from "../../assets/icons/arrow.svg"
import { Back, Titulo, Center, Container, RowCont, QRDiv, InfoDiv, Fecha, Location, MoneyDiv, Button } from "./AyudaStyled"
import QRImage from "../../assets/imgs/qr.svg";
import HelpIcon from "../../assets/icons/help.svg";
import { collection, getDocs, query } from "firebase/firestore";

import { firestore } from '../../firebase';
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


function Ayuda() {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const [userData, setUserData] = useState([{}]);
  useEffect(() => {
    getUserPurchaseHistory();
  }, []);

  const getUserPurchaseHistory = async () =>{
    const userPurchaseHistoryRef = collection(firestore, 'users', currentUser.uid, 'purchase_history');
    const userPurchaseHistoryQuery = query(userPurchaseHistoryRef);
    const userPurchaseHistorySnapshot = await getDocs(userPurchaseHistoryQuery);
    const userPurchaseHistoryData = userPurchaseHistorySnapshot.docs.map(doc => doc.data());

    let data = [];
    userPurchaseHistoryData.forEach(row => {
      let date = new Date(row.date.seconds * 1000);
      let day = date.getDate();
      let month = nombresMes[date.getMonth()-1];
      let year = date.getFullYear();
      let date2 = day + " de " + month + ", " + year;

      // Object.values(row.productos).forEach(prod => {
      //   if(typeof prod == "object"){
      //     console.log(prod);
      //   }
      // })

      let rowToPush = {qr: row.qr, cost: row.cost, date: date2, store: row.store, productos: row.productos};
      data.push(rowToPush);
    })
    
    // console.log("Data: ");
    console.log(data);
    setUserData(data);
  }

  const getPurchaseSingle = async (history) => {
    // const ref = firebase.firestore().collection("purchase_history").doc(_id); 
    console.log(history);
  }

  const nombresMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio" ,"Agosto" ,"Septiembre" ,"Octubre" ,"Noviembre" ,"Diciembre"];

  return (
    <>
        {/* <AppBar/> */}
        <div className="containerAyuda">
            {/* <Link to={"/"}> */}
          <div onClick={() => navigate(-1)}>
            <Back src={Arrow} alt="Regresar"/>
          </div>
          {/* </Link> */}
          <Titulo>Ayuda</Titulo>
          <Center>
            <Container>
              {
                userData.map(row => (
                <>
                  <RowCont>
                    <QRDiv>
                      {/* <img className="qr-image" src={QRImage} /> */}
                      <h1>{row.qr}</h1>
                    </QRDiv>
                    <InfoDiv>
                      <div>
                        <Fecha>{row.date}</Fecha>
                        <Location>{row.store}</Location>
                      </div>
                      <div className="ButtonDivH">
                        <Button>
                          Ayuda
                          <img className="help-icon" src={HelpIcon} />
                        </Button>
                      </div>
                    </InfoDiv>
                    <div className="rectMoney"></div>
                    <MoneyDiv>
                      <h1>{row.cost}</h1>
                      <h1>Mxn</h1>
                    </MoneyDiv>
                  </RowCont>
                  <div className="rectRow">
                  </div>
                </>
                ))
              }
            </Container>
          </Center>
        </div>
    </>
  );
}

export default Ayuda;