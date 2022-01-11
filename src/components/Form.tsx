import React from "react";
import styled from "styled-components";
import { StateModel } from "../models/state-model";
import '../utils/styles.css';
import { DarkColors } from "../utils/Colors";

interface FormProps extends StateModel {
  theme?: any,
  title: string,
  subtitle: string,
  onEmailChange: any,
  email:string,
  password: string,
  onPassChange: any,
}

const InputForm = styled.input`
    font-size: 1.0rem;
    width: 100%;
    height: 67px;
    margin-top:1vh;
    margin-bottom:1vh;
    border: ${props => (props.theme ? props.theme["BorderFieldStyle"] : DarkColors["BorderFieldStyle"])};
    box-sizing: border-box;
    padding-top:30px;
    padding-left:15px;
    color: ${props => (props.theme ? props.theme["PrimaryText"] : DarkColors["PrimaryText"])};
    border-radius: 18px;
    background: ${props => (props.theme ? props.theme["Background2"]: DarkColors["Background2"])};
  `;


export  const FormHeader = styled.header`
  padding-left: 5vw;
  padding-right: 5vw;
  font-weight: bold;
  color: ${props => (props.theme ? props.theme["PrimaryText"] : DarkColors["PrimaryText"])};
  font-size: 1.5rem;
  padding-top: 32px;
  justify-content: ${props => (props.typeof? "left" : "center")};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
  `;
export const FormTitle = styled.header`
padding-left: 5vw;
padding-right: 5vw;
justify-content: center;
display: flex;
flex-direction: row;
align-items: center;
color: ${props => (props.theme ? props.theme["PrimaryText"] : DarkColors["PrimaryText"])};
font-size: 1.0rem;
padding-top: 10px;
padding-bottom: 10px;
`;
const FormText = styled.header`
color: ${props => (props.theme ? props.theme["PrimaryText"] : DarkColors["PrimaryText"])};
font-size: 1.0rem;
padding-top: 10px;
padding-bottom: 10px;
`;



export const FieldTitle = styled.p`
  font-size: 0.7rem;
  position: absolute;
  top: 10px;
  left: 15px;
  margin-bottom:4vh;
  color: ${props => (props.theme ? props.theme["TitleField"] : DarkColors["TitleField"])};
`;

export const Form : React.FC<FormProps> = ({ theme, title, subtitle, email, onEmailChange, onPassChange, password}) => {

  return (
              
              <div style={{
                  background: theme["Background1"],
                  height: "100vh",
                  width: "100%",
                  position: "absolute",
                  zIndex: -1,
                  top: 0
              }}>
                <div className="spacer"></div>
                <FormHeader theme={theme}>{title}</FormHeader>
                <FormTitle theme={theme}>{subtitle}</FormTitle>
                <div className="center">       
                  <div className="form-field">
                    <FieldTitle theme={theme}>User</FieldTitle><InputForm theme={theme} id="email" value={email} type="text" onChange={onEmailChange}/>
                  </div>           
                  <div className="form-field">
                    <FieldTitle theme={theme}>Password</FieldTitle><InputForm theme={theme} id="password" type="password" value={password} onChange={onPassChange}/>
                  </div> 
                  <FormText theme={theme}>Forgot your password?</FormText>
                </div>
                
              </div>
  )
}


