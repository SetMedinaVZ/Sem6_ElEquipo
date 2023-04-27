import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
	width: 70px;
	height: 70px;
	background: #FDDB8A;
	border-radius: 15px;
	padding: 10px;
	box-shadow: none;
	margin: 0 10px 0 10px;
`;

const CategoryName = styled.p`
	font-family: 'Inter';
	font-style: normal;
	font-weight: 700;
	font-size: 11px;
	line-height: 13px;
	text-align: center;
	margin-top: 1px;
	inline-size: 80px;

	color: var(--gray1);
`;

const SVGIcon = styled.img`
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const CategoryButton = (props) => {
	return (
		<div style={{display: 'flex', flexDirection: 'column'}}>
			<Button>
				<SVGIcon src={props.buttonSVG}/>
			</Button>
			<CategoryName>{props.categoryName}</CategoryName>
		</div>
	)
}

export default CategoryButton