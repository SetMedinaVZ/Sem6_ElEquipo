import React from 'react'
import SearchGlass from '../../assets/icons/search_glass.svg';
import styled from 'styled-components';


const Bar = styled.input`
	background: #FFFFFF;
	border: 0.3px solid #BFBFBF;
	border-radius: 20px;
`;

const SearchBar = () => {
  return (
    <>
			<Bar placeholder='Buscar productos' type='text'/>
		</>
  )
}

export default SearchBar