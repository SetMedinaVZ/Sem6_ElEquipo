import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Back, Titulo } from "../Perfil/PerfilStyled";
import Arrow from "../../assets/icons/arrow.svg";
import {
  NutritionContainer,
  PriceContainer,
  PriceFooter,
  Text,
  TextSpan,
  ScanButton,
} from "./InfoProducto.styled";

const InfoProducto = ({ productInfo }) => {
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

  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  //Extract the state from the router location
  const location = useLocation();
  const { hit } = location.state;

  //Function to add .00 to the price if it doesnt is float
  function addZero(price) {
    if (price % 1 === 0) {
      return price + ".00";
    } else {
      return price;
    }
  }

  useEffect(() => {
    if (hit) {
      setProduct(hit);
      setLoading(false);
      console.log("hay hit");
    }
    if (productInfo) {
      setProduct(productInfo);
      setLoading(false);
      console.log("hay productInfo");
    }
  }, []);

  console.log(product);

  return (
    <div className="container">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {/* <Link to="/"> */}
          <div onClick={() => navigate(-1)}>
            <Back src={Arrow} alt="Regresar" />
          </div>
          {/* </Link> */}
          <Titulo>{product.name}</Titulo>
          <img src={product.url_img} alt={product.name} />
          <Text>Marca: {product.brand}</Text>
          <Text>Contenido Neto: {product.net_cont}</Text>
          <Text>{product.description}</Text>
          <NutritionContainer>
            <Text>Calorias: {product.calories}</Text>
            <Text>Proteinas: {product.protein}</Text>
            <Text>Carbohidratos: {product.carbs}</Text>
            <Text>Azucares: {product.sugars}</Text>
            <Text>Grasas: {product.fats}</Text>
            <Text>Sodio: {product.sodium}</Text>
          </NutritionContainer>
          <PriceFooter>
            <PriceContainer>
              <TextSpan>Precio</TextSpan>
              <Text textColor="black" textSize="2rem" textWeight="800">
                ${addZero(product.price)}
              </Text>
            </PriceContainer>
            <Link to="/escaneo">
              <ScanButton />
            </Link>
          </PriceFooter>
        </>
      )}
    </div>
  );
};

export default InfoProducto;
