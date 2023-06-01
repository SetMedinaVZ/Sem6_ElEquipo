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

  const [PercLacto, setPercLacto] = useState(0);
  const [PercConge, setPercConge] = useState(0);
  const [PercBebida, setPercBebida] = useState(0);
  const [PercPan, setPercPan] = useState(0);
  const [PercFrutas, setPercFrutas] = useState(0);
  const [PercCarne, setPercCarne] = useState(0);
  const [PercVino, setPercVino] = useState(0);
  const [PercJamon, setPercJamon] = useState(0);

  useEffect(() => {
    getUserPurchaseHistory();

  }, [mesIdx]);

  useEffect(() =>{
    setPercLacto((PLacto/total*100).toFixed(1));
    setPercConge((PConge/total*100).toFixed(1));
    setPercBebida((PBebida/total*100).toFixed(1));
    setPercPan((PPan/total*100).toFixed(1));
    setPercFrutas((PFrutas/total*100).toFixed(1));
    setPercCarne((PCarne/total*100).toFixed(1));
    setPercVino((PVino/total*100).toFixed(1));
    setPercJamon((PJamon/total*100).toFixed(1));
  },[PLacto,PConge, PBebida, PPan, PFrutas, PCarne, PVino, PJamon])

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
            if(prod.Pasillo == "Bebidas Y Snacks"){
              setPBebida(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1)));
            } else if(prod.Pasillo == "Alimentos Congelados"){
              setPConge(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            } else if(prod.Pasillo == "Carnes Y Pescados"){
              setPCarne(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            } else if(prod.Pasillo == "Frutas Y Verduras"){
              setPFrutas(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            } else if(prod.Pasillo == "Pan Y Tortillas"){
              setPPan(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            } else if(prod.Pasillo == "Lácteos Y Huevo"){
              setPLacto(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            } else if(prod.Pasillo == "Vinos, Licores Y Cervezas"){
              setPVino(prevState => prevState+Number((prod.Costo*prod.Cantidad).toFixed(1))) 
            } else if(prod.Pasillo == "Jamones, Quesos Y Deli"){
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
    labels:[
      'Lácteos y Huevos',
      'Alimentos Congelados',
      'Bebidas y Snacks',
      'Pan y Tortillas',
      'Frutas y Verduras',
      'Carnes y Pescados',
      'Vinos, Licores y Cervezas',
      'Jamones, Quesos y Deli'
    ],
      datasets: [
          {
              data: [PLacto, PConge, PBebida, PPan, PFrutas, PCarne, PVino, PJamon], 
              backgroundColor: ['#F85A46', '#FFFCB1', '#FFD7B1', '#FFB1B1', '#CAFFB1', '#FFC0B1', 'purple', 'yellow'],
          }
      ],
  };

  const option = {
    plugins: {
      legend: {
        display: false,
      },
    },
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

    setPercBebida(0);
    setPercCarne(0);
    setPercConge(0);
    setPercFrutas(0);
    setPercJamon(0);
    setPercLacto(0);
    setPercPan(0);
    setPercVino(0);

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

    setPercBebida(0);
    setPercCarne(0);
    setPercConge(0);
    setPercFrutas(0);
    setPercJamon(0);
    setPercLacto(0);
    setPercPan(0);
    setPercVino(0);
    
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
              options = {option}
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
              <Cat>Lácteos y Huevos</Cat>
              <PorDesc>{PercLacto === 'NaN' ?  '0': PercLacto}% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PLacto}</Spent>
          </FyVLegendDiv>

          <LegendDiv>
            <PColorDiv></PColorDiv>
            <TextDiv>
              <Cat>Alimentos Congelados</Cat>
              <PorDesc>{PercConge === 'NaN' ?  '0': PercConge}% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PConge}</Spent>
          </LegendDiv>

          <LegendDiv>
            <CyPColorDiv></CyPColorDiv>
            <TextDiv>
              <Cat>Bebidas y Snacks</Cat>
              <PorDesc>{PercBebida === 'NaN' ?  '0': PercBebida}% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PBebida}</Spent>
          </LegendDiv>

          <LegendDiv>
            <PyTColorDiv></PyTColorDiv>
            <TextDiv>
              <Cat>Pan y Tortillas</Cat>
              <PorDesc>{PercPan === 'NaN' ?  '0': PercPan}% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PPan}</Spent>
          </LegendDiv>

          <LegendDiv>
            <LColorDiv></LColorDiv>
            <TextDiv>
              <Cat>Frutas y Verduras</Cat>
              <PorDesc>{PercFrutas === 'NaN' ?  '0': PercFrutas}% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PFrutas}</Spent>
          </LegendDiv>

          <LegendDiv>
            <DColorDiv></DColorDiv>
            <TextDiv>
              <Cat>Carnes y Pescados</Cat>
              <PorDesc>{PercCarne === 'NaN' ?  '0': PercCarne}% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PCarne}</Spent>
          </LegendDiv>

          <LegendDiv>
            <VColorDiv></VColorDiv>
            <TextDiv>
              <Cat>Vinos, Licores y Cervezas</Cat>
              <PorDesc>{PercVino === 'NaN' ?  '0': PercVino}% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PVino}</Spent>
          </LegendDiv>

          <LegendDiv>
            <YColorDiv></YColorDiv>
            <TextDiv>
              <Cat>Jamones, Quesos y Deli</Cat>
              <PorDesc>{PercJamon === 'NaN' ?  '0': PercJamon}% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>${PJamon}</Spent>
          </LegendDiv>
        </div>
      </>
    );
  }
  
  export default GastosMensuales;
  