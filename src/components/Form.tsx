import React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { StateModel } from "../models/stateModel";
import Buttons from "./Buttons";

interface FormProps extends StateModel {
  theme?: any,
  title: string,
  subtitle: string,
}

const Form : React.FC<FormProps> = ({ theme, title, subtitle }) => {
  const FormHeader = styled.header`
    padding-left: 5vw;
    padding-right: 5vw;
    font-weight: bold;
    color: ${theme["PrimaryText"]};
    font-size: 1.5rem;
    padding-top: 32px;
    justify-content: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 10px;
    `;
  const FormTitle = styled.header`
  padding-left: 5vw;
  padding-right: 5vw;
  font-weight: bold;
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${theme["PrimaryText"]};
  font-size: 1.1rem;
  padding-top: 10px;
  padding-bottom: 10px;
  `;
  return (
              
              <div style={{
                  background: theme["Background1"],
                  height: "100vh"
              }}>
                <FormHeader>{title}</FormHeader>
                <FormTitle>{subtitle}</FormTitle>
                <Buttons type={0} text="login"/>
              </div>
  )
}

const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
    }
    
  }

export default connect(mapStateToProps, null)(Form);