import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledToggle = styled.div`
  --accent: #de2b27;
  --border-width: 5px;
  --border-radius: 20px;
  --font-size: 30px;

  position: relative;
  border: solid var(--border-width) var(--accent);
  border-radius: var(--border-radius);
  transition: transform cubic-bezier(0, 0, 0.3, 2) 0.4s;
  transform-style: preserve-3d;
  perspective: 800px;
  height: 5vh;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  > input[type="radio"] {
    display: none;
  }

  > #choice1:checked ~ #flap {
    transform: rotateY(-180deg);
  }

  > #choice1:checked ~ #flap > .content {
    transform: rotateY(-180deg);
  }

  > #choice2:checked ~ #flap {
    transform: rotateY(0deg);
  }

  > label {
    display: inline-block;
    min-width: 170px;
    padding: 30px;
    font-size: var(--font-size);
    text-align: center;
    color: var(--accent);
    cursor: pointer;
  }

  > label,
  > #flap {
    font-weight: bold;
    text-transform: capitalize;
  }

  > #flap {
    position: absolute;
    top: calc(0px - var(--border-width));
    left: 50%;
    height: calc(100% + var(--border-width) * 2);
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--font-size);
    background-color: var(--accent);
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    transform-style: preserve-3d;
    transform-origin: left;
    transition: transform cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
  }

  > #flap > .content {
    color: white;
    transition: transform 0s linear 0.25s;
    transform-style: preserve-3d;
  }
`;

const Toggle = ({ handler }) => {
  const [flapText, setFlapText] = useState("No");
  const [choice1Checked, setChoice1Checked] = useState(false);

  const handleClick = (e) => {
    if (e.target.tagName === "LABEL") {
      setTimeout(() => {
        setFlapText(e.target.textContent);
      }, 250);
    }
  };

  useEffect(() => {
    setFlapText(
      document.getElementById("choice2")?.nextElementSibling?.textContent || ""
    );
  }, []);

  useEffect(() => {
    const toggle = document.querySelector("#toggle");
    if (toggle) {
      if (choice1Checked) {
        toggle.style.transform = "rotateY(-15deg)";
        setTimeout(() => (toggle.style.transform = ""), 400);
      } else {
        toggle.style.transform = "rotateY(15deg)";
        setTimeout(() => (toggle.style.transform = ""), 400);
      }
    }
  }, [choice1Checked]);

  useEffect(() => {
    handler(choice1Checked);
  }, [choice1Checked]);

  return (
    <StyledToggle id="toggle" onClick={handleClick}>
      <input
        type="radio"
        id="choice1"
        checked={choice1Checked}
        onChange={() => setChoice1Checked(true)}
      />
      <input
        type="radio"
        id="choice2"
        checked={!choice1Checked}
        onChange={() => setChoice1Checked(false)}
      />
      <div id="flap">
        <div className="content">{flapText}</div>
      </div>
      <label htmlFor="choice1">Si</label>
      <label htmlFor="choice2">No</label>
    </StyledToggle>
  );
};

export default Toggle;
