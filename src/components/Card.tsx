import { animated, useSpring } from "@react-spring/web";
import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { StateModel } from "../models/state-model";
import Buttons from "./Buttons";
import Form from "./Form";

interface CardProps extends StateModel {
  theme?: any,
  intro?:boolean,
  title: string,
  subtitle: string
}

const Card : React.FC<CardProps> = ({ theme, intro, title, subtitle }) => {

  const [styles, api] = useSpring(() => ({ opacity: 0 }))
  const [isLogin,setisLogin]= useState(false)
  
    const CardWrapper=styled.div`
    overflow: hidden;
    position: absolute;
    padding: 0 0 32px;
    margin: 48px auto 0;
    background: ${theme["Background2"]};
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
    color: ${theme["PrimaryText"]};
    font-size: 1.5rem;
    padding-top: 32px;
    padding-bottom: 10px;
    `;
  const CardBody = styled.header`
  padding-left: 5vw;
  padding-right: 5vw;
  font-weight: bold;
  color: ${theme["PrimaryText"]};
  font-size: 1.1rem;
  padding-top: 10px;
  padding-bottom: 10px;
  `;
  return (
    !isLogin?
      <CardWrapper>
              <CardHeader>{title}</CardHeader>
              <CardBody>{subtitle}</CardBody>
              <div onClick={()=>{
                setisLogin(!isLogin)
                api.start({opacity: 1, delay: 500})
              }}>
                <Buttons type={0} text="login"/>
              </div>
          </CardWrapper>
      :
      <animated.div
      style={
          styles
      }>
      <Form title="Welcome!" subtitle="If you not are Register, you'll be registered, else you'll do login"/>
      </animated.div>
  )
}

const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
    }
    
  }

export default connect(mapStateToProps, null)(Card);