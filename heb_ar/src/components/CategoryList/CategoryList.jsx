import React from "react";
import CategoryButton from "../CategoryButton/CategoryButton";
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
  { name: "Alimentos Congelados", svg: AlimentosCongelados },
  { name: "Bebidas y Snacks", svg: BebidasSnacks },
  { name: "Canres y Pescados", svg: CarnesPescados },
  { name: "Frutas y Verduras", svg: FrutasVerduras },
  { name: "Jamones, Quesos y Deli", svg: JamonesQuesosDeli },
  { name: "Lácteos y Huevo", svg: LacteosHuevo },
  { name: "Pan y Tortillas", svg: PanTortillas },
  { name: "Vinos, Licores y Cervezas", svg: VinosLicoresCervezas },
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

const CategoryList = () => {
  return (
    <>
      <Row>
        {allButtons.map((data) => (
          <CategoryButton
            key={data.name}
            buttonSVG={data.svg}
            categoryName={data.name}
          />
        ))}
      </Row>
    </>
  );
};

export default CategoryList;
