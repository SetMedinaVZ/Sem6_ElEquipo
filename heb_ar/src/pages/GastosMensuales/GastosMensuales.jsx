import React, { useEffect, useState } from "react";
// import AppBar from "../../common/AppBar/AppBar";
// import NavBar from "../../common/NavBar/NavBar";
import Arrow from "../../assets/icons/arrow.svg"
import {
  Titulo, 
  Back, 
  Total, 
  PieDiv, 
  FyVLegendDiv,  
  LegendDiv, 
  FyVColorDiv,
  PColorDiv, 
  CyPColorDiv,
  PyTColorDiv,
  LColorDiv,
  DColorDiv,
  TextDiv, 
  Cat, 
  PorDesc, 
  Spent,
  VColorDiv,
  YColorDiv,
  DivMesEscoger,
  FrontMes,
  BackMes} from "./GastosMensualesStyled"
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

import { Link, useNavigate} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../../firebase";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function GastosMensuales() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState([{}]);
  const [mesIdx, setMesIdx] = useState(0);
  const [total, setTotal] = useState(0);

  const [PLacto, setPLacto] = useState(0);
  const [PConge, setPConge] = useState(0);
  const [PBebida, setPBebida] = useState(0);
  const [PPan, setPPan] = useState(0);
  const [PFrutas, setPFrutas] = useState(0);
  const [PCarne, setPCarne] = useState(0);
  const [PVino, setPVino] = useState(0);
  const [PJamon, setPJamon] = useState(0);

  useEffect(() => {
    getUserPurchaseHistory();
  }, [mesIdx]);

  const getUserPurchaseHistory = async () =>{
    const userPurchaseHistoryRef = collection(firestore, 'users', currentUser.uid, 'purchase_history');
    const userPurchaseHistoryQuery = query(userPurchaseHistoryRef);
    const userPurchaseHistorySnapshot = await getDocs(userPurchaseHistoryQuery);
    const userPurchaseHistoryData = userPurchaseHistorySnapshot.docs.map(doc => doc.data());

    let data = [];
    userPurchaseHistoryData.forEach(row => {
      let date = new Date(row.date.seconds * 1000);
      // console.log(date.getMonth()+1);
      let month = nombresMes[date.getMonth()];
      // console.log(month);
      
      if(month === nombresMes[mesIdx]){
        // console.log("TOTAL: "+total+" Mes: "+nombresMes[mesIdx] + " PROD: "+row.qr + " COSTs: "+row.cost);
        // console.log(ro);
        setTotal(prevState => prevState+row.cost);
        Object.values(row.productos).forEach(prod => {
          if(typeof prod == "object"){
            if(prod.Pasillo == "Bebidas y Snacks"){
              setPBebida(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1)));
            } else if(prod.Pasillo == "Productos Congelados"){
              setPConge(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            } else if(prod.Pasillo == "Carnes Y Pescados"){
              setPCarne(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            } else if(prod.Pasillo == "Frutas Y Verduras"){
              setPFrutas(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            } else if(prod.Pasillo == "Pan y Tortillas"){
              setPPan(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            } else if(prod.Pasillo == "Lacteos y Huevo"){
              setPLacto(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            } else if(prod.Pasillo == "Vinos, Licores Y Cervezas"){
              setPVino(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            } else if(prod.Pasillo == "Jamones, Quesos y Deli"){
              setPJamon(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            }
            // console.log(prod);
          }
        })
      }

      let rowToPush = {cost: row.cost, mes: month, productos: row.productos};
      data.push(rowToPush);
    })
    console.log(data);
    setUserData(data);
  }
  
  const nombresMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio" ,"Agosto" ,"Septiembre" ,"Octubre" ,"Noviembre" ,"Diciembre"];

  const navigate = useNavigate();

    const data = {
        // labels: ['Frutas Y Verduras', 'Panadería', 'Carnes Y Pescados', 'Licores Y Cervezas', 'Lácteos', 'Dulcería'],
        datasets: [
            {
                data: [PLacto, PConge, PBebida, PPan, PFrutas, PCarne, PVino, PJamon], 
                backgroundColor: ['#F85A46', '#FFFCB1', '#FFD7B1', '#FFB1B1', '#CAFFB1', '#FFC0B1', 'purple', 'yellow']
            }
        ],
    };

    const options = {

    };

  const backMes = () =>{
    setTotal(0);
    setPBebida(0);
    setPCarne(0);
    setPConge(0);
    setPFrutas(0);
    setPJamon(0);
    setPLacto(0);
    setPPan(0);
    setPVino(0);
    if(mesIdx == 0){
      setMesIdx(11);
    }else{
      setMesIdx(mesIdx-1);
    }
  }

  const frontMes = () =>{
    setTotal(0);
    setPBebida(0);
    setPCarne(0);
    setPConge(0);
    setPFrutas(0);
    setPJamon(0);
    setPLacto(0);
    setPPan(0);
    setPVino(0);
    if(mesIdx == 11){
      setMesIdx(0);
    }else{
      setMesIdx(mesIdx + 1);
    }
  }

    return (
      <>
        {/* <AppBar /> */}
        <div className="container">
          {/* <Link to="/"> */}
          <div onClick={() => navigate(-1)}>
            <Back src={Arrow} alt="Regresar"/>
          </div>
          {/* </Link> */}
          <Titulo>Gastos Mensuales</Titulo>
          <Total>${total}</Total>
          <PieDiv>
            <Pie
              data = {data}
              options = {options}
            />
          </PieDiv>
          <DivMesEscoger>
            <BackMes src={Arrow} onClick={backMes}/>
            <h1>{nombresMes[mesIdx]} 2023</h1>
            <FrontMes src={Arrow} onClick={frontMes}></FrontMes>
          </DivMesEscoger>
          <FyVLegendDiv>
            <FyVColorDiv></FyVColorDiv>
            <TextDiv>
              <Cat>Lácteos y Huevo</Cat>
              <PorDesc>40% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PLacto}</Spent>
          </FyVLegendDiv>

          <LegendDiv>
            <PColorDiv></PColorDiv>
            <TextDiv>
              <Cat>Alimentos Congelados</Cat>
              <PorDesc>20% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PConge}</Spent>
          </LegendDiv>

          <LegendDiv>
            <CyPColorDiv></CyPColorDiv>
            <TextDiv>
              <Cat>Bebidas y Snacks</Cat>
              <PorDesc>15% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PBebida}</Spent>
          </LegendDiv>

          <LegendDiv>
            <PyTColorDiv></PyTColorDiv>
            <TextDiv>
              <Cat>Pan y Tortillas</Cat>
              <PorDesc>10% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PPan}</Spent>
          </LegendDiv>

          <LegendDiv>
            <LColorDiv></LColorDiv>
            <TextDiv>
              <Cat>Frutas y Verduras</Cat>
              <PorDesc>10% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PFrutas}</Spent>
          </LegendDiv>

          <LegendDiv>
            <DColorDiv></DColorDiv>
            <TextDiv>
              <Cat>Carnes y Pescados</Cat>
              <PorDesc>5% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PCarne}</Spent>
          </LegendDiv>

          <LegendDiv>
            <VColorDiv></VColorDiv>
            <TextDiv>
              <Cat>Vinos, Licores y Cervezas</Cat>
              <PorDesc>2% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PVino}</Spent>
          </LegendDiv>

          <LegendDiv>
            <YColorDiv></YColorDiv>
            <TextDiv>
              <Cat>Jamones, Quesos y Deli</Cat>
              <PorDesc>1% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PJamon}</Spent>
          </LegendDiv>
        </div>
      </>
    );
  }
  
  export default GastosMensuales;
  