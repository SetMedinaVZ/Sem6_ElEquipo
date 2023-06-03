import {React, useEffect, useState} from "react";
// import AppBar from "../../common/AppBar/AppBar";
// import NavBar from "../../common/NavBar/NavBar";
import Arrow from "../../assets/icons/arrow.svg"
import Scan from "../../assets/icons/scan_filled.svg"
import {Titulo, Back, Progress, ProgressTxt, Txt, AccordionWrapper, Camara, Label, Actividad, ActividadDesc, Completo} from "./ScavengerHuntStyled"
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { collection, getDocs, query, where, getDoc } from "firebase/firestore";

import { firestore } from '../../firebase';
import { useAuth } from "../../context/AuthContext";

const QuestTemplate = (props) => {
  let { actName } = useParams();
  const { currentUser } = useAuth();
  const [ toMake, setToMake ] = useState(0);
  const [ Done, setDoneAct ] = useState(0);

  const [ actDesc, setActDesc ] = useState('');
  const [ actActs, setActActs ] = useState([{}]);

  const [ actUser, setActUser ] = useState([{}]);
  const [ showDetail, setShowDetail ] = useState([false]);

  let actNameTo = '';

  if(actName === 'qr_scan'){
    actNameTo = 'Qr Scan';
  } else if(actName === 'scavenger_quest'){
    actNameTo = 'Scavenger Hunt';
  } else if(actName === 'buy_products'){
    actNameTo = 'Buy Products';
  } else if(actName === 'quick_buy'){
    actNameTo = 'Quick Buy';
  }

  const navigate = useNavigate();

  const getUserQuests = async () =>{
    const getUserQuestsRef = collection(firestore, 'users', currentUser.uid, 'quests');
    const getUserQuestsQuery = query(getUserQuestsRef);
    const getUserQuestsSnapShot = await getDocs(getUserQuestsQuery);
    let dataAux = [];
    getUserQuestsSnapShot.docs.map((doc) => dataAux.push({ id:doc.id, ...doc.data()}));

    let det = [];
    
    dataAux.forEach(row => {
      if(row.id === actName){
        // console.log(row);
        
        let data = [];
        for(let i = 1; i <= row.actCount; i++){
          data.push(row['act'+i]);
          det.push(false);
        }
        
        setActUser(data);
        setShowDetail(det);
      }
    })

    let totAct = 0;

    const newArray = [...showDetail];

    for(let i = 0; i < actUser.length; i++){
      if(actUser[i].idAct === actActs[i].idAct && actUser[i].completed == true){

        newArray[i] = true;
        
        totAct = totAct+1;
      }
    }
    
    setShowDetail(newArray);
    setToMake(actActs.length);
    setDoneAct(totAct);
  }

  const getQuestsInfo = async () =>{
    const genQuestInfoRef = collection(firestore, 'quests');
    const genQuestInfoQuery = query(genQuestInfoRef);
    const genQuestInfoSnapShot = await getDocs(genQuestInfoQuery);
    let dataAux = [];
    genQuestInfoSnapShot.docs.map((doc) => dataAux.push({ id:doc.id, ...doc.data()}));

    dataAux.forEach(row => {
      if(row.id === actName){
        setActDesc(row.actDesc);

        let data = [];
        for(let i = 1; i <= row.actCount; i++){
          data.push(row['act'+i]);
        }

        setActActs(data);
      }
    })
  }

  useEffect(()=>{
    getQuestsInfo();
    getUserQuests();
  },[]);
  
    return (
    <>
        <div className="container">
          <div onClick={() => navigate(-1)}>
            <Back src={Arrow} alt="Regresar"/>
          </div>
          <Titulo>{actNameTo}</Titulo>
          <Progress>
            <ProgressTxt>{Done}/{toMake} completad</ProgressTxt>
          </Progress>
          <Txt>{actDesc}</Txt>
          
          <AccordionWrapper>
            { actActs.map((row,idx)=>(
            <>
            <Accordion>
              <AccordionSummary
                  expandIcon={ 
                    showDetail[idx] ? <Completo><ExpandMoreIcon /></Completo> : <ExpandMoreIcon />
                  } 
                  aria-controls="panel1a-content" id="panel1a-header">
                <Actividad>{actNameTo} # {idx+1}</Actividad>
              </AccordionSummary>
              <AccordionDetails>
                <ActividadDesc>
                  <Label>Pista</Label>
                  <ul>
                    <li>{row.pista}</li>
                  </ul>
                  
                  <br></br>

                  <Label>Premio</Label>
                  <ul>
                    <li>{row.premioPuntos} punts</li>
                  </ul>
                </ActividadDesc>
              </AccordionDetails>
            </Accordion>
            </>
            ))
            }
          </AccordionWrapper>
          {/* <AccordionWrapper>
            <Accordion>
              <AccordionSummary
                expandIcon={
                  <Completo>
                    <ExpandMoreIcon />
                  </Completo>
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                
                <Actividad>Objeto Escondido # 1</Actividad>
              </AccordionSummary>
              <AccordionDetails>
                <ActividadDesc>
                  <Label>Pistas</Label>
                  <ul>
                    <li>Color de objeto: naranja</li>
                    <li>Forma de objeto: trofeo</li>
                  </ul>
                  
                  <br></br>

                  <Label>Premio - escoger entre...</Label>
                  <ul>
                    <li>300 puntos</li>
                    <li>Un producto marca HEB gratis</li>
                    <li>Un cupón de descuento</li>
                  </ul>
                </ActividadDesc>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Actividad>Objeto Escondido # 2</Actividad>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Marcelo MLP</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Actividad>Objeto Escondido # 3</Actividad>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Marcelo MLP</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Actividad>Objeto Escondido # 4</Actividad>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Marcelo MLP</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Actividad>Objeto Escondido # 5</Actividad>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Marcelo MLP</Typography>
              </AccordionDetails>
            </Accordion>
          </AccordionWrapper> */}
          
          <Camara>
            <img src={Scan} alt="Camara"/>
            Ir a la cámara
          </Camara>
          {/* </Link> */}
        </div>
    </>
    );
}
    
export default QuestTemplate;  