import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { StateModel } from "../models/state-model";
import { useSpring, animated, Spring } from "react-spring";
import { setTheme } from "../actions";
import { DarkColors, LightColors } from "../utils/Colors";

const buttonTypes=["login","theme"]


const ButtonTheme=styled.div`
    position: absolute;
    width: 62px;
    height: 63px;
    right: 21px;
    top: 22px;
    justify-content: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 2rem;
    background: ${props => (props.theme ? props.theme["Background2"]: DarkColors["Background2"])};
    border-radius: 18px;
  `;
  const ButtonLogin = styled.div`
    background-image: linear-gradient(99deg, ${props => (props.theme ? props.theme["GradentLeft"]: DarkColors["GradentLeft"])} 6.69%, ${props => (props.theme ? props.theme["GradentRight"]: DarkColors["GradentRight"])} 88.95%)}
    border-radius: 25px;
    margin: 4vh 5vw;
    padding: 22px 38px;
    width: 5vh;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    font-weight: bold;
    color: ${props => (props.theme ? props.theme["SecondaryText"]: DarkColors["SecondaryText"])};
    font-size: 1.1rem;
    box-shadow: 0px 4px 30px rgba(34, 105, 251, 0.8);
    position: absolute;
    bottom: 0vh;
    z-index: 20;
    `;

interface ButtonProps extends StateModel {
  theme?: any,
  text?: string,
  iconPath?: string,
  type: number,
  setTheme?: any,
  setIntro?: any,
  loginCallback?: Function,
  isLogin?:boolean
}


const Buttons : React.FC<ButtonProps> = ({ theme,  text,  type, setTheme,  isLogin, loginCallback=()=>{} }) => {

    const [styles, api] = useSpring(() => ({
        scale: 1,
        y:0,
        opacity: 1,
        width: "5vh"
      }))

    const [flipped, setFlipped] = useState(false)
    const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
    })
      

    
  switch (type) {
      case 0:
        return (
            <animated.div
                onMouseDown={()=> {
                      if(isLogin){
                        setTimeout(loginCallback, 0)
                      }
                      
                      if(!isLogin){
                        api.start({ y: -78})
                      }else{
                        api.start({ scale: 1.1, y: -78, opacity: 0.4})
                      }
                       
                }}
                onMouseLeave={()=> api.start({ scale: 1, y:-78, opacity: 1})}
                style={styles}
            >
                <ButtonLogin theme={theme}>{text}</ButtonLogin>
            </animated.div>
        )
      case 1:
        return (
            <div onClick={() => {
                setTheme(theme===DarkColors?LightColors:DarkColors)
                setFlipped(flipped => !flipped)
                }}>
                <animated.div
                    style={{ opacity: opacity.to(o => 1 - o), transform }}
                >
                    <ButtonTheme theme={theme}>{text}</ButtonTheme>
                </animated.div>
                <animated.div
                    style={{
                    opacity,
                    transform,
                    rotateX: '180deg',
                    }}
                >
                    <ButtonTheme theme={theme}>{text}</ButtonTheme>
                </animated.div>
            </div>
        )
  
      default:
          return null;
  }
}

const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
    }
    
  }

  const mapDispatchToProps = {
    setTheme
  }

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);