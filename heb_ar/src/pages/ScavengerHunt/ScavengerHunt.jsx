import React from "react";
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

function QuestTemplate() {

    const navigate = useNavigate();
  
    return (
    <>
        {/* <AppBar /> */}
        <div className="container">
          {/* <Link to="/"> */}
          <div onClick={() => navigate(-1)}>
            <Back src={Arrow} alt="Regresar"/>
          </div>
          <Titulo>Scavenger Hunt</Titulo>
          <Progress>
            <ProgressTxt>1/5 completados</ProgressTxt>
          </Progress>
          <Txt>En una zona de la sucursal se encuentran 5 objetos escondidos, es tu misión encontrarlos utilizando la camara de tu celular con realidad aumentada.</Txt>

          <AccordionWrapper>
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