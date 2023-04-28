import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import CategoryList from "../../components/CategoryList/CategoryList";
import SearchBar from "../../components/SearchProductBar/SearchBar";
import styled from "styled-components";
import Card from "../../components/ProductCard/ProductCard";
import test from '../../assets/coca.png';

const HomeText = styled.p`
	font-family: 'Inter';
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
  return (
    <>
      <AppBar />
      <div className="container">
        {/* Only decoment this line to neccecary testing */}
        {/* <SearchBar /> */}
        <Card cardImg={test} cardName='Coca Cola'/>
        <WrapText>
          <HomeText>Categorías</HomeText>
        </WrapText>
        <CategoryList />
        <WrapText>
          <HomeText>Los más populares de hoy</HomeText>
        </WrapText>
      </div>
      <NavBar pagina={"home"} />
    </>
  );
};

export default Home;
