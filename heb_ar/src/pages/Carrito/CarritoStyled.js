import styled from "styled-components";

export const Titulo = styled.text`
    padding-bottom: 2px;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 28px;

    color: #722017;
`;

export const CarritoList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    height: 50vh;
    width: 100%;
`;

export const Price = styled.div`
    position: fixed;
    top: 70vh;

    display: flex;
    flex-direction: row;
    width: 85vw;

    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 10px;
    justify-content: space-between;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
`;

export const Next = styled.button`
    position: fixed;
    top: 78vh;
    width: 85vw;
    padding: 10px;

    background: #FFC0B1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 40px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
`;

export const Space = styled.div`
    height: 30vh;
`;