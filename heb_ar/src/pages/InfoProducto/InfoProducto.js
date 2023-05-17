import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";
import catalogoJSON from "./productos_eq5.json";
import { Back, Titulo, Button } from "../Perfil/PerfilStyled";
import Arrow from "../../assets/icons/arrow.svg";
import { collection, addDoc } from "firebase/firestore";

const InfoProducto = (props) => {
//   function uploadProducts() {
//     const products = catalogoJSON;
//     const collectionRef = collection(firestore, "catalogo");
//     try {
//       products.forEach(async (product) => {
//         console.log(product);
//         await addDoc(collectionRef, product);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

  return (
    <div className="container">
      <Link to="/">
        <Back src={Arrow} alt="Regresar" />
      </Link>
      <Titulo>PRODUCTO</Titulo>
      {/* <Button onClick={uploadProducts}>Subir productos</Button> */}
    </div>
  );
};

export default InfoProducto;
