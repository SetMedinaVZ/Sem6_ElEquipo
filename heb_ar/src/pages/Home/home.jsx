import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";

const Home = () => {
  return (
    <>
      <AppBar />
      <div className="container">
        <h1>Home</h1>
      </div>
      <NavBar pagina={'home'}/>
    </>
  );
};

export default Home;
