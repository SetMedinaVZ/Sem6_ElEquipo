import React from "react";
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
  Spent} from "./GastosMensualesStyled"
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

import { Link, useNavigate} from "react-router-dom";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function GastosMensuales() {

  const navigate = useNavigate();

    const data = {
        // labels: ['Frutas Y Verduras', 'Panadería', 'Carnes Y Pescados', 'Licores Y Cervezas', 'Lácteos', 'Dulcería'],
        datasets: [
            {
                data: [540, 270, 202.5, 135, 135, 67.5], 
                backgroundColor: ['#F85A46', '#FFFCB1', '#FFD7B1', '#FFB1B1', '#CAFFB1', '#FFC0B1']
            }
        ],
    };

    const options = {

    };

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
          <Total>$1350</Total>
          <PieDiv>
            <Pie
              data = {data}
              options = {options}
            />
          </PieDiv>
          
          <FyVLegendDiv>
            <FyVColorDiv></FyVColorDiv>
            <TextDiv>
              <Cat>Frutas y verduras</Cat>
              <PorDesc>40% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>$540</Spent>
          </FyVLegendDiv>

          <LegendDiv>
            <PColorDiv></PColorDiv>
            <TextDiv>
              <Cat>Panadería</Cat>
              <PorDesc>20% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>$270</Spent>
          </LegendDiv>

          <LegendDiv>
            <CyPColorDiv></CyPColorDiv>
            <TextDiv>
              <Cat>Carnes y pescados</Cat>
              <PorDesc>15% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>$202.5</Spent>
          </LegendDiv>

          <LegendDiv>
            <PyTColorDiv></PyTColorDiv>
            <TextDiv>
              <Cat>Licores Y Cervezas</Cat>
              <PorDesc>10% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>$135</Spent>
          </LegendDiv>

          <LegendDiv>
            <LColorDiv></LColorDiv>
            <TextDiv>
              <Cat>Lácteos</Cat>
              <PorDesc>10% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>$135</Spent>
          </LegendDiv>

          <LegendDiv>
            <DColorDiv></DColorDiv>
            <TextDiv>
              <Cat>Dulcería</Cat>
              <PorDesc>5% de tu total del mes</PorDesc>
            </TextDiv>
            <Spent>$67.5</Spent>
          </LegendDiv>
          
          
        </div>
      </>
    );
  }
  
  export default GastosMensuales;
  