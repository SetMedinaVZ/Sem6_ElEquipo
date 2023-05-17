import React from "react";
import AisleButton from "../AisleButton/AisleButton";
import styled from "styled-components";

// Icons
import AlimentosCongelados from "../../assets/imgs/alimentos-congelados.svg";
import BebidasSnacks from "../../assets/imgs/bebidas-snacks.svg";
import CarnesPescados from "../../assets/imgs/carnes-pescados.svg";
import FrutasVerduras from "../../assets/imgs/frutas-verduras.svg";
import JamonesQuesosDeli from "../../assets/imgs/jamones-quesos-deli.svg";
import LacteosHuevo from "../../assets/imgs/lacteos-huevo.svg";
import PanTortillas from "../../assets/imgs/pan-tortillas.svg";
import VinosLicoresCervezas from "../../assets/imgs/vinos-licores-cervezas.svg";

const allButtons = [
  { name: "Alimentos Congelados", svg: AlimentosCongelados, redirect: "/pasillo/alimentos-congelados" },
  { name: "Bebidas y Snacks", svg: BebidasSnacks, redirect: "/pasillo/bebidas-y-snacks" },
  { name: "Carnes y Pescados", svg: CarnesPescados, redirect: "/pasillo/carnes-y-pescados" },
  { name: "Frutas y Verduras", svg: FrutasVerduras, redirect: "/pasillo/frutas-y-verduras" },
  { name: "Jamones, Quesos y Deli", svg: JamonesQuesosDeli, redirect: "/pasillo/jamones-quesos-y-deli" },
  { name: "Lácteos y Huevo", svg: LacteosHuevo, redirect: "/pasillo/lacteos-y-huevo" },
  { name: "Pan y Tortillas", svg: PanTortillas, redirect: "/pasillo/pan-y-tortillas" },
  { name: "Vinos, Licores y Cervezas", svg: VinosLicoresCervezas, redirect: "/pasillo/vinos-licores-y-cervezas" },
];

const Row = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const AisleList = () => {
  return (
    <>
      <Row>
        {allButtons.map((data) => (
          <AisleButton
            key={data.name}
            buttonSVG={data.svg}
            categoryName={data.name}
            redirect={data.redirect}
          />
        ))}
      </Row>
    </>
  );
};

export default AisleList;
