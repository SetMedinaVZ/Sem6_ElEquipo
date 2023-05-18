import React from "react";
// import AppBar from "../../common/AppBar/AppBar";
// import NavBar from "../../common/NavBar/NavBar";
import Arrow from "../../assets/icons/arrow.svg"
import {Titulo, Back} from "./GastosMensualesStyled"
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

import { Link } from "react-router-dom";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function GastosMensuales() {

    const data = {
        labels: ['Frutas Y Verduras', 'Carnes Y Pescados', 'Jamones, Quesos Y Deli', 'Pan Y Tortillas', 'Lácteos Y Huevo', 'Vinos, Licores Y Cervezas', 'Alimentos Congelados', 'Bebidas Y Snacks'],
        datasets: [
            {
                data: [5, 5, 5, 5, 5, 5, 5, 5],
                backgroundColor: ['#F85A46', '#CAFFB1', '#FFB1B1', '#FFC0B1', '#FFD7B1', '#FFFCB1', '#F85A16', '#CAFFE1']
            }
        ]
    };

    const options = {

    }

    return (
      <>
        {/* <AppBar /> */}
        <div className="container">
          <Link to="/">
            <Back src={Arrow} alt="Regresar"/>
          </Link>
          <Titulo>Gastos Mensuales</Titulo>

          <Pie
            data = {data}
            options = {options}
          />
          
          
        </div>
      </>
    );
  }
  
  export default GastosMensuales;
  