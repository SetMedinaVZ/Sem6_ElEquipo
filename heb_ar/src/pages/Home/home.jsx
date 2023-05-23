import React, { useState } from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import SearchBar from "../../components/SearchProductBar/SearchBar";
import PopProductsList from "../../components/PopProductsList.jsx/PopProductsList";
import AisleList from "../../components/AisleList/AisleList";
import styled from "styled-components";
import { useEffect } from "react";
import { firestore } from "../../firebase";
import { collection, limit, orderBy, query, getDocs } from "firebase/firestore";

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
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [popularData, setPopularData] = useState(null);

  const callDB = async () => {
    let dataAux = [];
    const products = collection(firestore, "catalogo");
    const popularQuery = query(
      products,
      orderBy("pop_index", "desc"),
      limit(6)
    );
    const popularSnapshot = await getDocs(popularQuery);
    popularSnapshot.forEach((doc) => {
      // dataAux.push({id: doc.id, ...doc.data()});
      let auxObj = { id: doc.id, ...doc.data() };
      if (auxObj.pop_index !== 0) {
        dataAux.push(auxObj);
      }
    });
    setPopularData(dataAux);
    // console.log(dataAux);
  };

  useEffect(() => {
    callDB().then(() => {
      setLoadingPopular(false);
    });
  }, []);

  return (
    <>
      <AppBar />
      <div className="container">
        <SearchBar />
        <WrapText>
          <HomeText>Pasillos</HomeText>
        </WrapText>
        <AisleList />
        <WrapText>
          <HomeText>Los más populares de hoy</HomeText>
        </WrapText>
        {loadingPopular ? (
          <p>Cargando productos populares</p>
        ) : // <PopProductsList data={popularData} />
        popularData.length === 0 ? (
          <p>No hay productos populares</p>
        ) : (
          <PopProductsList data={popularData} />
        )}
      </div>
      <NavBar pagina={"home"} />
    </>
  );
};

export default Home;
