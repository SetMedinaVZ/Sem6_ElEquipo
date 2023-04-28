import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import CategoryList from "../../components/CategoryList/CategoryList";
import SearchBar from "../../components/SearchProductBar/SearchBar";

const Home = () => {
  return (
    <>
      <AppBar />
      <div className="container">
        {/* Only decoment this line to neccecary testing */}
        {/* <SearchBar /> */}
        <CategoryList />
      </div>
      <NavBar pagina={"home"} />
    </>
  );
};

export default Home;
