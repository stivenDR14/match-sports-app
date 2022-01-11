import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { StateModel } from "../models/state-model";
import { useSpring, animated, Spring } from "react-spring";
import { setTheme } from "../actions";
import { DarkColors, LightColors } from "../utils/Colors";
import { svgIconProps } from "../models/svg-model";
import { useNavigate } from "react-router";

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

    const BackIcon = (props:svgIconProps) => {
      return (
        <div className="navbar-icon">
         <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.3125 15H4.6875" stroke={props.fill} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.125 6.5625L4.6875 15L13.125 23.4375" stroke={props.fill} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      );
    }

    export const NotIcon = (props:svgIconProps) => {
      return (
        <div className="notlike-icon">
         <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.998921 0.998837C1.59792 0.399837 2.56909 0.399837 3.16809 0.998837L7.86796 5.6987L12.5678 0.998837C13.1668 0.399838 14.138 0.399837 14.737 0.998837C15.336 1.59784 15.336 2.56901 14.737 3.16801L10.0371 7.86787L14.737 12.5677C15.336 13.1667 15.336 14.1379 14.737 14.7369C14.138 15.3359 13.1668 15.3359 12.5678 14.7369L7.86796 10.037L3.16809 14.7369C2.56909 15.3359 1.59792 15.3359 0.998921 14.7369C0.399921 14.1379 0.399921 13.1667 0.998921 12.5677L5.69879 7.86787L0.998921 3.16801C0.399921 2.56901 0.399921 1.59784 0.998921 0.998837Z" fill={props.fill}/>
        </svg>

        </div>
      );
    }

    export const FavIcon = (props:svgIconProps) => {
      return (
        <div className="notlike-icon">
         <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4941 0.000190155C17.2455 0.000190155 17.9958 0.106181 18.7092 0.345553C23.1048 1.77464 24.6887 6.59782 23.3656 10.8136C22.6153 12.968 21.3887 14.9342 19.7822 16.5407C17.4825 18.7677 14.959 20.7446 12.2425 22.4476L11.9448 22.6274L11.6352 22.4357C8.9092 20.7446 6.37137 18.7677 4.05029 16.5288C2.45448 14.9223 1.22665 12.968 0.464473 10.8136C-0.881252 6.59782 0.702655 1.77464 5.14593 0.320544C5.49129 0.201454 5.84737 0.11809 6.20465 0.0716446H6.34755C6.6822 0.0228174 7.01446 0.000190155 7.34792 0.000190155H7.47892C8.22919 0.0228174 8.95564 0.153817 9.65947 0.39319H9.72973C9.77737 0.415817 9.81309 0.440826 9.83691 0.463453C10.1001 0.548008 10.349 0.64328 10.5872 0.77428L11.0397 0.976734C11.1491 1.03506 11.2718 1.12417 11.3779 1.20119C11.4451 1.24998 11.5056 1.29392 11.5518 1.3221C11.5713 1.33356 11.591 1.34509 11.6109 1.35672C11.713 1.41632 11.8194 1.47842 11.9091 1.54718C13.2322 0.536098 14.8387 -0.0117189 16.4941 0.000190155ZM19.6619 8.57505C20.1501 8.56195 20.5669 8.17014 20.6027 7.66877V7.52705C20.6384 5.85859 19.6273 4.34733 18.0899 3.76379C17.6016 3.59587 17.0657 3.85906 16.887 4.35924C16.7203 4.85942 16.9823 5.40724 17.4825 5.58468C18.2459 5.8705 18.7568 6.62196 18.7568 7.45441V7.49133C18.7341 7.76404 18.8163 8.02724 18.983 8.22969C19.1498 8.43214 19.3999 8.55004 19.6619 8.57505Z" fill={props.fill}/>
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
  isMobile?:boolean,
}


const Buttons : React.FC<ButtonProps> = ({ theme,  text,  type, setTheme,  isLogin, isMobile, isLeft=true, isLiked=false, loginCallback=()=>{}, notLoginCallback=()=>{} }) => {

    const [stylesLogin, apiLogin] = useSpring(() => ({
        scale: 1,
        y: 600,
        opacity: 1,
        width: "5vh",
      }))

    const navigate = useNavigate();
    

    const [flipped, setFlipped] = useState(false)
    const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
    })

    const multiAnimation= useSpring({
      from: { scale: isLiked?1: 1, x:isMobile?0:100, y:isMobile?0:0 },
      to: [
          { scale:isLiked?1.2: 1.2, x:isMobile?-40:-20, y:-110},
          { scale: isLiked?1:1, x:isMobile?0:100, y:isMobile?0:0},
      ],
      duration: 2000
    });
    

    const [backButtonAnimation, setBackButtonAnimation] = useSpring(() => ({
      scale: 1,
      opacity: 1,
    }))
      
    
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
                    <ButtonTheme theme={theme} itemScope={isLeft}>{text}</ButtonTheme>
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

      case 4:
        return (
          <div style={{
            position: "absolute",
            top:"2vh",
            left:"5vw"
          }}
          onClick={()=>{
            
            setTimeout(() => {
              navigate(-1)
            }, 200);
            setBackButtonAnimation(
              {
                scale: 0.7,
                opacity: 0.5,
              }
            )
          }}
          >
            <animated.div style={backButtonAnimation}>
               <BackIcon  fill={theme["PrimaryText"]}></BackIcon>
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