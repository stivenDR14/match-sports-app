import { ChangeEvent, Component, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { fetchRegister } from "../actions";
import Buttons from "../components/Buttons";
import {Card} from "../components/Card";
import {Form} from "../components/Form";
import { LoginModel } from "../models/login-model";
import { StateModel } from "../models/state-model";
import { DarkColors } from "../utils/Colors";
import '../utils/styles.css';

const MainPhoto = styled.img`
        height: 100%;
        width:100%;
        object-fit: contain;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: -10;
        background: ${props => (props.theme ? props.theme["Background1"]: DarkColors["Background1"])};
        `;




function Login(props:any) {

  const [styles, api] = useSpring(() => ({ opacity: 0}))
  const [isLogin,setisLogin]= useState(false)

  const alert = useAlert()

  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  useEffect(() => {
    if(props.error!=''){
      alert.error(props.error)
    }
    if(props.user!=null){
      alert.success("Welcome!")
    }
    if(props.loading){
      alert.info("Loading...")
    }
    if(props.user){
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 1000);
    }

  },[props.loading, props.error, props.user]);

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prevState) => {
      return {
        ...prevState,
        ...{email: e.target.value}
      };
    });
  };

  const onPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prevState) => {
      return {
        ...prevState,
        ...{password: e.target.value}
      };
    });
  };

    
    return (
        <div>
            <div >
                <Buttons type={1} text={props.theme==DarkColors?"🌤️":"🌙"}/>
            </div>
            {!isLogin?<MainPhoto theme={props.theme} src="/assets/main_image.png"/>: <div >
            </div>}

            {!isLogin?
            <Card title="Welcome to your favorite sports" subtitle="Discover diferent sports and save it!" theme={props.theme}/>
              
              :
              <animated.div
              style={
                  styles
              }>
              <Form title="Welcome!" subtitle="If you are not registered, you'll be registered, else you'll login" onEmailChange={onEmailChange} email={values.email} theme={props.theme}
              onPassChange={onPassChange} password={values.password}/>
              </animated.div>}

                <Buttons type={0} text="login" isLogin={isLogin} 
                notLoginCallback={()=>{
                  console.log(isLogin)
                  if(!isLogin){
                    setisLogin(!isLogin)
                  }                
                  api.start({opacity: 1, delay: 500})
                }}
                loginCallback={()=>{
                  const loginModel: LoginModel={
                    email: values.email,
                    password: values.password
                  }
                  props.fetchRegister(loginModel)}}/>   
        </div>);
  }
  

  const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
      loading: state.loading,
      user: state.user,
      error:state.error,
    }
    
  }
  const mapDispatchToProps = {
    fetchRegister
  }
export default connect(mapStateToProps, mapDispatchToProps)(Login);