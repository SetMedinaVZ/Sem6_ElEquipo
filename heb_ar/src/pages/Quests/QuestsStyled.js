import { LinearProgress } from "@mui/material";
import styled from "styled-components";
import {styled as StyledMUI} from "@mui/system"

export const Titulo = styled.text`
    /* position: absolute; */
    padding-bottom: 2px;
   
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 28px;

    color: #722017;
`;

export const ProgressDiv = styled.div`
    color: #FCB716;
`;

export const Percentage = styled.text`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;

    color: #3F3838;
`;

export const Progress = StyledMUI(LinearProgress)`
    width: 353px;
    height: 25px;
    border-radius: 15px;
    margin-bottom: 21px;
`;


export const Column = styled.div`
    //
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 13px;
`;

export const ScanProducts = styled.div`
    display: flex;
    position: relative;
    margin-right: 11px;
    width: 165px;
    height: 165px;

    background: #FFF48F;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
`;

export const ScavengerHunt = styled.div`
    display: flex;
    position: relative;
    margin-left: 12px;
    width: 165px;
    height: 165px;

    background: #B3E8EF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
`;

export const BuyProducts = styled.div`
    display: flex;
    position: relative;
    margin-right: 11px;
    width: 165px;
    height: 165px;

    background: #C4F29D;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
`;

export const QuickBuy = styled.div`
    display: flex;
    position: relative;
    margin-left: 12px;
    width: 165px;
    height: 165px;

    background: #FFB1B1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
`;

export const Counter = styled.text`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    margin-top: 9px;
    margin-left: 12px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
`;

export const SPimg = styled.img`
    width: 104px;
    height: 125px;

    z-index: 9;

    margin-top: 40px;
    margin-left: 61px;
`;

export const SHimg = styled.img`
    width: 130px;
    height: 137px;

    z-index: 9;

    margin-top: 28px;
    margin-left: 35px;
`;

export const BPimg = styled.img`
    width: 135px;
    height: 128px;

    z-index: 9;

    margin-top: 37px;
    margin-left: 26px;
`;

export const QBimg = styled.img`
    width: 123px;
    height: 126px;

    z-index: 9;

    margin-top: 42px;
    margin-left: 42px;
`;

export const Line = styled.hr`
    margin-top: 17px;
    margin-bottom: 10px;
    
    width: 350px;
    height: 0px;
    
    border: 1px solid #BFBFBF;
`;

export const ConsejoDiv = styled.div`
    /* margin-left: 18px; */
`;

export const ConsejoTxt = styled.text`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    display: flex;
    margin-bottom: 13px;

    color: #787878;
`;

export const ConsejoImgDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ConsejoImg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
    
    width: 165px;
    height: 165px;

    background: #E8D8EC;
    border-radius: 15px;
`;

export const ConsejoDesc = styled.text`
    width: 174px;
    height: 118px;
    align-self: center;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;

    color: #3F3838;
`;