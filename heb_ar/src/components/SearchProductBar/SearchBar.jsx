import React from "react";
import styled from "styled-components";

const Bar = styled.input`
  background: #ffffff;
  border: 0.3px solid #bfbfbf;
  border-radius: 20px;
`;

const SearchBar = () => {
  return (
    <>
      <Bar placeholder="Buscar productos" type="text" />
    </>
  );
};

export default SearchBar;
