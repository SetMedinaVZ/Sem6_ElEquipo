import React, { useEffect, useState } from "react";
// import AppBar from "../../common/AppBar/AppBar";
import Arrow from "../../assets/icons/arrow.svg"
import { Back, Titulo } from "./HistorialStyled"
import styled from "styled-components";
import QRImage from "../../assets/imgs/qr.svg";
import HelpIcon from "../../assets/icons/help.svg";
import "./Historial.css";
import { collection, getDocs, query, where, getDoc } from "firebase/firestore";

import { firestore } from '../../firebase';
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import SpecData from "../../components/PurhcaseHistorySpec/SpecData";

const Container = styled.div`
  width: 88%;
  height: 80vh;// Review for root makeing 50% possible and dynamic

  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: scroll;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const RowCont = styled.div`
  width: 100%;
  height: 115px;
  display: flex;
  overflow: hidden;
`;

const QRDiv = styled.div`
  width: 30%;
  height: 100%;
  background: #F5F5F5;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const InfoDiv = styled.div`
  width: 50%;
  height: 100%;

  /* align-items: start; */
  padding-left: 10px;
  /* justify-content: space-between; */
  display: flex;
  flex-direction: column;
  padding-top:10px;
`;

const MoneyDiv = styled.div`
  width: 20%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const Button = styled.button`
  display: flex;
  justify-content:center;;

  background: #FFFFFF;
  border: 0.5px solid rgba(0, 0, 0, 0.7);
  border-radius: 41px;

  @media screen and (max-width: 768px) {
    width: 65px;
    height: 18px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;

    .help-icon{
        width: 10.66px;
        height: 10.53px;
    }
  }
`;

function Historial() {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const [userData, setUserData] = useState([{}]);
  const [userSpecData, setUserSpecData] = useState([{}]);
  const [showDetail, setShowDetail] = useState([false]);

  useEffect(() => {
    getUserPurchaseHistory();
  }, []);

  const getUserPurchaseHistory = async () =>{
    const userPurchaseHistoryRef = collection(firestore, 'users', currentUser.uid, 'purchase_history');
    const userPurchaseHistoryQuery = query(userPurchaseHistoryRef);
    const userPurchaseHistorySnapshot = await getDocs(userPurchaseHistoryQuery);
    let dataAux = [];
    userPurchaseHistorySnapshot.docs.map((doc) => dataAux.push({ id:doc.id, ...doc.data()}));

    let data = [];
    let det = [];
    
    dataAux.forEach(row => {
      let date = new Date(row.date.seconds * 1000);
      let day = date.getDate();
      let month = nombresMes[date.getMonth()-1];
      let year = date.getFullYear();
      let date2 = day + " de " + month + ", " + year;
      
      det.push(false);
      setShowDetail(det);

      let rowToPush = {id:row.id, qr: row.qr, cost: row.cost, date: date2, store: row.store, productos: row.productos};
      
      data.push(rowToPush);
    })

    setUserData(data);
  }

  const getPurchaseSingle = (history, idx) => {
    let aux = showDetail;
    aux.forEach((bol,idx2)=>{
      bol = false
      if(idx2 == idx){
        aux[idx2] = aux[idx];
      }else{
        aux[idx2] = bol
      }
    }
    );
    aux[idx] = !aux[idx];
    setShowDetail(aux);

    userData.forEach((row)=>{
      if(row.id === history){
        let data = [];
        Object.values(row.productos).forEach(prod => {
          data.push(prod);
        });
        // console.log(data);
        setUserSpecData(data);
      }
    })
  }

  // useEffect(()=>{
  //   console.log(userSpecData)
  //   // console.log(showDetail);
  // },[userSpecData])

  const nombresMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio" ,"Agosto" ,"Septiembre" ,"Octubre" ,"Noviembre" ,"Diciembre"];
  
  return (
    <>
        <div className="container">
          <div onClick={() => navigate(-1)}>
            <Back src={Arrow} alt="Regresar"/>
          </div>
          <Titulo>Historial</Titulo>
          <Container>
            {
              userData.map((row, idx) => (
              <><RowCont>
                  <QRDiv>
                    {/* <img className="qr-image" src={QRImage} /> */}
                    <h1>{row.qr}</h1>
                  </QRDiv>
                  <InfoDiv className={showDetail[idx] ? "InfoSelected":"InfoN"}>
                    <div>
                      <h1 className={showDetail[idx] ? "FechaSelected":"Fecha"}>{row.date}</h1>
                      <h1 className={showDetail[idx] ? "LocationSelected":"Location"}>{row.store}</h1>
                    </div>
                    {!showDetail[idx] && <div className="ButtonDivH">
                      <Button onClick={()=>getPurchaseSingle(row.id, idx)}>
                        Detalles
                      </Button>
                      <Link to="/ayuda">
                        <Button>
                          Ayuda
                          <img className="help-icon" src={HelpIcon} />
                        </Button>
                      </Link>
                    </div>}
                  </InfoDiv>
                  {!showDetail[idx] && <div className="rectMoney"></div>}
                  <MoneyDiv className={showDetail[idx] ? "MoneySelected":"MoneyN"}>
                    <h1>${row.cost}</h1>
                    <h1>Mxn</h1>
                  </MoneyDiv>
                </RowCont><div className="rectRow"></div>
                {showDetail[idx] && <SpecData data={userSpecData}></SpecData>}
                </>
              ))
            }
          </Container>
        </div>
    </>
  );
}

export default Historial;
