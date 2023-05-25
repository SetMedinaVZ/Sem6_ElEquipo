import React, { useEffect, useState } from "react";
import Arrow from "../../assets/icons/arrow.svg";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import ProductsList from "../../components/ProductsList/ProductsList";
import { firestore } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Back = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 14px;
  top: 23px;
  transform: scaleX(-1);
`;

const Titulo = styled.text`
  /* position: absolute; */
  padding-top: 44px;
  padding-bottom: 2px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 28px;

  color: #722017;
`;

const Aisle = (props) => {
  const { aisleName } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  let aisle;
  if (aisleName === "alimentos-congelados") {
    aisle = "Alimentos Congelados";
  } else if (aisleName === "bebidas-y-snacks") {
    aisle = "Bebidas Y Snacks";
  } else if (aisleName === "carnes-y-pescados") {
    aisle = "Carnes Y Pescados";
  } else if (aisleName === "frutas-y-verduras") {
    aisle = "Frutas Y Verduras";
  } else if (aisleName === "jamones-quesos-y-deli") {
    aisle = "Jamones, Quesos Y Deli";
  } else if (aisleName === "lacteos-y-huevo") {
    aisle = "Lácteos Y Huevo";
  } else if (aisleName === "pan-y-tortillas") {
    aisle = "Pan Y Tortillas";
  } else if (aisleName === "vinos-licores-y-cervezas") {
    aisle = "Vinos, Licores Y Cervezas";
  }

  const callDB = async () => {
    let dataAux = [];
    const products = collection(firestore, "catalogo");
    const aisleQuery = query(products, where("aisle", "==", aisle));
    const aisleSnapShot = await getDocs(aisleQuery);
    aisleSnapShot.forEach((doc) => {
      dataAux.push({ id: doc.id, ...doc.data() });
    });
    setData(dataAux);
    // console.log(data)
  };

  useEffect(() => {
    callDB().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="container">
          <Link to="/">
            <Back src={Arrow} />
          </Link>
          <Titulo>{aisle}</Titulo>
          <ProductsList data={data} />
        </div>
      )}
    </>
  );
};

export default Aisle;
