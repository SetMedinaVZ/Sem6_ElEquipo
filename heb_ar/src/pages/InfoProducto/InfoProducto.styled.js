import styled from "styled-components";
import EscaneoIMG from "../../assets/icons/scan.svg";


export const Text = styled.p`
    width: 90%; 
    font-size: ${(props) => props.textSize || "1rem"};
    font-weight: ${(props) => props.textWeight || "500"};
    color: ${(props) => props.textColor || "#787878"};
`;

export const TextSpan = styled.span`
    font-size: 1rem;
    color: #787878;
`;

export const NutritionContainer = styled.div`
    width: 90%;
    margin: 1rem 0 8rem 0;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    background-color: rgba(197, 197, 197, 0.3);
    border-radius: 10px;
`;

export const PriceFooter = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    position: fixed;
    bottom: 0;
    align-items: center;
    border-top: 1px solid #C4C4C4;
    background-color: #FFFFFF;
    justify-content: space-between;
`;

export const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    margin: 0 1rem;
    margin-top: 5px;
`;

export const ScanButton = styled.button`
    width: 60px;
    height: 60px;
    display: inline-block;
    border: 2px solid #FFFFFF;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 100px;
    margin-bottom: 10%;
    background-color: #DE2B27;
    background-repeat: no-repeat;
    background-size: 65%;
    background-position: center;
    background-image: url(${EscaneoIMG});
    margin: 0 1rem;
`;
