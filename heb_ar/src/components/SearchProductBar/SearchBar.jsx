import React from 'react'
import SearchGlass from '../../assets/icons/search_glass.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
	position: relative;
	margin: 20px;
`;

const Bar = styled.input`
	background: #FFFFFF;
	border: 0.3px solid #BFBFBF;
	border-radius: 20px;
	height: 40px;
	width: 90vw;
	padding-left: 40px;
`;

const Icon = styled.img`
	position: absolute;
	box-sizing: border-box;
	top: 50%;
	left: 10px;
	transform: translateY(-50%);
`;

const SearchBar = () => {
	return (
		<>
			<Wrapper>
				<Icon src={SearchGlass} alt='Magnifying glass' />
				<Bar placeholder='Buscar productos' type='text' />
			</Wrapper>
		</>
	)
}

export default SearchBar