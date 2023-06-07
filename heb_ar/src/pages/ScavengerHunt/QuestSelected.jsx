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
  const [ actActs, setActActs ] = useState([]);

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

  const getQuestsInfo = async () =>{
    const genQuestInfoRef = collection(firestore, 'quests');
    const genQuestInfoQuery = query(genQuestInfoRef);
    const genQuestInfoSnapShot = await getDocs(genQuestInfoQuery);
    let dataAux = [];
    genQuestInfoSnapShot.docs.map((doc) => dataAux.push({ id:doc.id, ...doc.data()}));
    

    let data = [];
    let newActdesc = "";
    
    for(const row of dataAux ){
      if(row.id === actName){
        newActdesc = row.actDesc;
        for(let i = 1; i <= row.actCount; i++){
          data.push(row['act'+i]);
        }
        break;
      }
    }

    setActDesc(newActdesc);
    setActActs(data);
  }

  const getUserQuests = async () =>{
    if(actActs.length === 0) return;
    const getUserQuestsRef = collection(firestore, 'users', currentUser.uid, 'quests');
    const getUserQuestsQuery = query(getUserQuestsRef);
    const getUserQuestsSnapShot = await getDocs(getUserQuestsQuery);
    let dataAux = [];
    getUserQuestsSnapShot.docs.map((doc) => dataAux.push({ id:doc.id, ...doc.data()}));

    let det = [];
    let data = [];
    
    dataAux.forEach(row => {
      if(row.id === actName){
        
        data = [];
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

    for(let i = 0; i < data.length; i++){
      
      if(data[i].idAct === actActs[i].idAct && data[i].completed == true){

        newArray[i] = true;
        
        totAct = totAct+1;
      }else{
        newArray[i] = false;
      }
    }
    
    setShowDetail(newArray);
    setToMake(actActs.length);
    setDoneAct(totAct);
  }
  
  useEffect(()=>{
    getQuestsInfo();
  },[]);

  useEffect(() => {
    getUserQuests();
  }, [actActs])

    return (
      <>
        <div className="container">
          <div onClick={() => navigate(-1)}>
            <Back src={Arrow} alt="Regresar"/>
          </div>
          <Titulo>{actNameTo}</Titulo>
          <Progress>
            <ProgressTxt>{Done}/{toMake} completado</ProgressTxt>
          </Progress>
          <Txt>{actDesc}</Txt>
          
          <AccordionWrapper>
            {actActs.map((row,idx)=>(
              <Accordion key={idx}>
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
            ))
            }
          </AccordionWrapper>
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