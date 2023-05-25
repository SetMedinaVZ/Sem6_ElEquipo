import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import { Link } from "react-router-dom";
import SP from "../../assets/imgs/quest_img_4.svg"
import SH from "../../assets/imgs/quest_img_3.svg"
import BP from "../../assets/imgs/quest_img_2.svg"
import QB from "../../assets/imgs/quest_img_1.svg"
import Light from "../../assets/imgs/quest_img_5.svg"
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
  ConsejoDesc
} from "./QuestsStyled"

function Quests() {

  const count = "50";

  return (
    <>
      <AppBar />
      <div className="container">
        <Titulo>Tus Quests</Titulo>

        <ProgressDiv>
          <Percentage>{count}%</Percentage>
          <Progress color='inherit' variant='determinate' value={count} />
        </ProgressDiv>

        <Column>
          <Row>
            <ScanProducts>
              <Counter>1/4</Counter>
              <SPimg src={SP} />
            </ScanProducts>
            
            <Link to="/scavenger-hunt">
              <ScavengerHunt>
                <Counter>1/5</Counter>
                <SHimg src={SH} />
              </ScavengerHunt>
            </Link>
          </Row>

          <Row>
            <BuyProducts>
              <Counter>3/4</Counter>
              <BPimg src={BP} />
            </BuyProducts>
            
            <QuickBuy>
              <Counter>5/7</Counter>
              <QBimg src={QB} />
            </QuickBuy>
          </Row>
        </Column>

        <Line></Line>
        
        <ConsejoDiv>
          <ConsejoTxt>Consejos para las misiones</ConsejoTxt>
          
          <ConsejoImgDiv>
            
            <ConsejoImg>
              <img src={Light} alt="Consejo"/>
            </ConsejoImg>
            
            <ConsejoDesc>Para completar las misiones de escaneo puedes usar el croquis incluido en la app</ConsejoDesc>
          
          </ConsejoImgDiv>
        </ConsejoDiv>

      </div>
      <NavBar pagina={'quests'}/>
    </>
  );
}

export default Quests;
