import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import SearchBar from "../../components/SearchProductBar/SearchBar";
import CategoryList from "../../components/CategoryList/CategoryList";
import ProductList from "../../components/ProductList/ProductList";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTO } from "../../graphql/queries/getProducto";

const HomeText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: #787878;
  margin: 15px;
`;

const WrapText = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTO);

  return (
    <>
      <AppBar />
      {loading && <p>Loading...</p>}
      {error && <>Error! ${error.message}</>}
      {data && (
        <div className="container">
          {console.log(data.producto)}
          <SearchBar />
          <WrapText>
            <HomeText>Pasillos</HomeText>
          </WrapText>
          <CategoryList />
          <WrapText>
            <HomeText>Los más populares de hoy</HomeText>
          </WrapText>
          <ProductList />
        </div>
      )}
      <NavBar pagina={"home"} />
    </>
  );
};

export default Home;
