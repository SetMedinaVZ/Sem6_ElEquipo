import React from "react";
import styled from "styled-components";

const RadioCardButton = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s ease;
  width: 160px;

  &:hover {
    background-color: #f0f0f0;
  }

  input[type="radio"] {
    display: none;
  }

  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

const RadioCardButtonComponent = () => {
  return (
      <RadioCardButton>
        <input type="radio" name="paymentMethod" value="card" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="#000"
            d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V10h16v8zm0-12H4V6h16v4z"
          />
        </svg>
        Card
      </RadioCardButton>
  );
};

export default RadioCardButtonComponent;
