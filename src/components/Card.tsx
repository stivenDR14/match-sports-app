import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { StateModel } from "../models/state-model";
import { DarkColors } from "../utils/Colors";

const CardWrapper=styled.div`
overflow: hidden;
position: absolute;
padding: 0 0 32px;
margin: 48px auto 0;
background: ${props => (props.theme ? props.theme["Background2"]: DarkColors["Background2"])};
z-index:10;
width: 100%;
height:35vh;
bottom: 0vh; 
font-family: Quicksand, arial, sans-serif;
border-radius: 35px 35px 0px 0px;
`;
const CardHeader = styled.header`
padding-left: 5vw;
padding-right: 5vw;
font-weight: bold;
color: ${props => (props.theme ? props.theme["PrimaryText"] : DarkColors["PrimaryText"])};
font-size: 1.5rem;
padding-top: 32px;
padding-bottom: 10px;
`;
const CardBody = styled.header`
padding-left: 5vw;
padding-right: 5vw;
font-weight: bold;
color: ${props => (props.theme ? props.theme["PrimaryText"] : DarkColors["PrimaryText"])};
font-size: 1.1rem;
padding-top: 10px;
padding-bottom: 10px;
`;
interface CardProps extends StateModel {
  title: string,
  subtitle: string
}

export const Card : React.FC<CardProps> = ({ theme, title, subtitle }) => {
  
   
  return (
      <CardWrapper theme={theme}>
              <CardHeader theme={theme}>{title}</CardHeader>
              <CardBody theme={theme}>{subtitle}</CardBody>
              
        </CardWrapper>
      
  )
}
