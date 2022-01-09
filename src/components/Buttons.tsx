import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { StateModel } from "../models/state-model";
import { useSpring, animated, Spring } from "react-spring";
import { setTheme } from "../actions";
import { DarkColors, LightColors } from "../utils/Colors";
import { svgIconProps } from "../models/svg-model";

const buttonTypes=["login","theme", "like", "dislike"]


const ButtonTheme=styled.div`
    position: absolute;
    width: 62px;
    height: 63px;
    ${props => (props.itemScope ? "right": "left")}: 40px;
    top: 15px;
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
    z-index: 20;
    `;

    const ButtonLike = styled.div`
    background-image: linear-gradient(99deg, ${props => (props.theme ? props.theme["GradentLeft"]: DarkColors["GradentLeft"])} 6.69%, ${props => (props.theme ? props.theme["GradentRight"]: DarkColors["GradentRight"])} 88.95%)}
    border-radius: 10vh;
    margin: 4vh 5vw;
    position: absolute;
    left: 45vw;
    top: 60vh;
    height: 10vh;
    width: 10vh;
    box-shadow: 0px 10px 25px rgba(35, 107, 254, 0.2);
    z-index: 20;
    `;

    const ButtonBackLike = styled.div`
    background: ${props => props.theme ? props.theme["Background1"]: DarkColors["Background1"]};
    border-radius: 10vh;
    margin: 4vh 5vw;
    position: absolute;
    left: 36vw;
    top: 55vh;
    height: 15vh;
    width: 15vh;
    border: 15px solid ${props => props.theme ? props.theme["Background2"]: DarkColors["Background2"]};
    box-shadow: 0px 10px 25px rgba(35, 107, 254, 0.2);
    z-index: 20;
    `;

    const ButtonDislike = styled.div`
    background: ${props => (props.theme ? props.theme["DislikeButton"]: DarkColors["DislikeButton"])};
    border-radius: 10vh;
    margin: 4vh 5vw;
    position: absolute;
    left: 26vw;
    top: 62vh;
    height: 7vh;
    width: 7vh;
    z-index: 20;
    0px 10px 25px rgba(0, 0, 0, 0.08)
    `;
    const LogoLike = styled.img`
    height: 4vh;
    width: auto;
    left: 3vh;
    top: 3vh;
    object-fit: contain;
    position: relative;
    z-index: 30;
    `;

    const NotIcon = (props:svgIconProps) => {
      return (
        <div className="notlike-icon">
         <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.998921 0.998837C1.59792 0.399837 2.56909 0.399837 3.16809 0.998837L7.86796 5.6987L12.5678 0.998837C13.1668 0.399838 14.138 0.399837 14.737 0.998837C15.336 1.59784 15.336 2.56901 14.737 3.16801L10.0371 7.86787L14.737 12.5677C15.336 13.1667 15.336 14.1379 14.737 14.7369C14.138 15.3359 13.1668 15.3359 12.5678 14.7369L7.86796 10.037L3.16809 14.7369C2.56909 15.3359 1.59792 15.3359 0.998921 14.7369C0.399921 14.1379 0.399921 13.1667 0.998921 12.5677L5.69879 7.86787L0.998921 3.16801C0.399921 2.56901 0.399921 1.59784 0.998921 0.998837Z" fill={props.fill}/>
        </svg>

        </div>
      );
    }

interface ButtonProps extends StateModel {
  theme?: any,
  text?: string,
  iconPath?: string,
  type: number,
  setTheme?: any,
  setIntro?: any,
  loginCallback?: Function,
  isLogin?:boolean,
  isLeft?:boolean,
  notLoginCallback?: Function,
  isLiked?:boolean,
}


const Buttons : React.FC<ButtonProps> = ({ theme,  text,  type, setTheme,  isLogin, isLeft=true, isLiked=false, loginCallback=()=>{}, notLoginCallback=()=>{} }) => {

    const [stylesLogin, apiLogin] = useSpring(() => ({
        scale: 1,
        y: 550,
        opacity: 1,
        width: "5vh",
      }))

    

    const [flipped, setFlipped] = useState(false)
    const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
    })

    const multiAnimation= useSpring({
      from: { scale: isLiked?1: 1, x:0, y:0 },
      to: [
          { scale:isLiked?1.2: 1.2, x:-40, y:-110},
          { scale: isLiked?1:1, x:0, y:0},
      ],
      duration: 2000
    });
    
      
    
  switch (type) {
      case 0:
        return (
            <animated.div
                onMouseUp={()=> {
                      if(isLogin){
                        setTimeout(loginCallback, 0)
                      }else{
                        setTimeout(notLoginCallback, 0)
                        
                      }
                      
                      if(!isLogin){
                        apiLogin.start({ y: 450,})
                      }else{
                        apiLogin.start({ scale: 1.1, y: 450, opacity: 0.4})
                      }
                       
                }}
                onMouseLeave={()=> apiLogin.start({ scale: 1, y: 450, opacity: 1})}
                style={stylesLogin}
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
                    <ButtonTheme theme={theme} itemScope={isLeft}>{text}</ButtonTheme>
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
  
      case 2:
        return (
          <div>
            {isLiked? <animated.div
              
              style={multiAnimation}
          ><ButtonBackLike theme={theme} ></ButtonBackLike> </animated.div>: <div ></div>}
              <ButtonLike theme={theme}><LogoLike src="/assets/heart.png"/></ButtonLike>

          </div>
            
        )

      case 3:
        return (
          <ButtonDislike theme={theme}><NotIcon fill={theme["NotIcon"]}/></ButtonDislike>

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