import React, { useEffect } from "react";
import { connect} from "react-redux";
import styled from "styled-components";
import { StateModel } from "../models/state-model";
import Buttons from "./Buttons";
import '../utils/styles.css';
import { useAlert } from "react-alert";
import { setRegister } from "../actions";
import { LoginModel } from "../models/login-model";

interface FormProps extends StateModel {
  theme?: any,
  user?: any,
  title: string,
  subtitle: string,
  setRegister?: any,
}

const Form : React.FC<FormProps> = ({ theme, title, subtitle, setRegister, user }) => {

  const alert = useAlert()

  useEffect(() => {
    console.log("estado cambiado: ", user)
  },[user]);
  
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
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${theme["PrimaryText"]};
  font-size: 1.0rem;
  padding-top: 10px;
  padding-bottom: 10px;
  `;
  const FormText = styled.header`
  padding-left: 5vw;
  padding-right: 5vw;
  color: ${theme["PrimaryText"]};
  font-size: 1.0rem;
  padding-top: 10px;
  padding-bottom: 10px;
  `;

  const InputForm = styled.input`
    font-size: 1.0rem;
    width: 100%;
    height: 67px;
    margin-top:1vh;
    margin-bottom:1vh;
    border: ${theme["BorderFieldStyle"]};
    box-sizing: border-box;
    padding-top:30px;
    padding-left:15px;
    color:${theme["PrimaryText"]};
    border-radius: 18px;
    background: ${theme["Background2"]};
  `;

  const FieldTitle = styled.p`
    font-size: 0.7rem;
    position: absolute;
    top: 10px;
    left: 15px;
    margin-bottom:4vh;
    color: ${theme["TitleField"]};
  `;


  return (
              
              <div style={{
                  background: theme["Background1"],
                  height: "100vh"
              }}>
                <div style={{
                  height:"15vh"
              }}></div>
                <FormHeader>{title}</FormHeader>
                <FormTitle>{subtitle}</FormTitle>
                <div className="center">       
                  <div className="form-field">
                    <FieldTitle>User</FieldTitle><InputForm/>
                  </div>           
                  <div className="form-field">
                    <FieldTitle>Password</FieldTitle><InputForm/>
                  </div> 

                </div>
                <FormText>Forgot your password? {user}</FormText>
                <Buttons type={0} text="login" loginCallback={()=>{
                  const loginModel: LoginModel={
                    email: "el_loquillo100@yopmail.com",
                    password: "123456789"
                  }
                  setRegister(loginModel)
                  console.log("turno..",user)
                  if(user===null) {
                    alert.error("Error in the request");
                  }else if(typeof(user)==="string"){
                    alert.error("Error: "+user);
                  }
                  else{
                    alert.success("Register completed!");                    
                  }
                }}/>
              </div>
  )
}

const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
      user: state.user
    }
    
  }

const mapDispatchToProps = {
  setRegister,
}
export default connect(mapStateToProps, mapDispatchToProps)(Form);