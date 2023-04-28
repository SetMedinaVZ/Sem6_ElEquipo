import React from "react";
import styled from "styled-components";
import SearchGlass from '../../assets/icons/search_glass.svg';
import { connectSearchBox } from "react-instantsearch-dom";

const Bar = styled.input`
  background: #ffffff;
  border: 0.3px solid #bfbfbf;
  border-radius: 20px;
  height: 40px;
  width: 90vw;
  padding-left: 40px;
`;

const Wrapper = styled.form`
  position: relative;
  margin: 0;
`;

const Icon = styled.img`
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <Wrapper role="search" noValidate action="">
    <Bar
      type="search"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
      placeholder="Buscar productos..."
    />
	<Icon src={SearchGlass} alt="Search" />
  </Wrapper>
);

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
