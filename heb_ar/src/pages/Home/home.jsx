import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import CategoryList from "../../components/CategoryList/CategoryList";

const Home = () => {
  return (
    <>
      <AppBar />
      <div className="container">
        <CategoryList />
      </div>
      <NavBar pagina={"home"} />
    </>
  );
};

export default Home;
