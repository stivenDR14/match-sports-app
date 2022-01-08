import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { StateModel } from "../models/state-model";
import { useSpring, animated, Spring } from "react-spring";
import { setTheme } from "../actions";
import { DarkColors, LightColors } from "../utils/Colors";
import { svgIconProps } from "../models/svg-model";


const Container=styled.div`
overflow: hidden;
position: absolute;
padding: 0 0 32px;
margin: 48px auto 0;
background-image: url(${props => (props.title ? props.title: "")});
background-position: center;
background-size: cover;
background-repeat: no-repeat;
z-index:0;
width: 100%;
height:55vh;
top:-7vh;
font-family: Quicksand, arial, sans-serif;
border-radius: 0px 0px 35px 35px;
`;

const MiniContainer=styled.div`
    position: absolute;
    width: 62px;
    height: 63px;
    right: 40px;
    top: 15px;
    justify-content: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 2rem;
    z-index: 30;
    background: ${DarkColors["BackgroundMini"]};
    border-radius: 18px;
  `;

const MiniImage = styled.img`
height: 4vh;
width: auto;
position: absolute;
top: 1%;
left: 1%;
object-fit: contain;
position: relative;
z-index: 30;
`;

interface SwiperProps extends StateModel {
  theme?: any,
  imageBig: string,
  imageShort: string,
}


export const Swiper : React.FC<SwiperProps> = ({ theme, imageBig, imageShort}) => {

    const [styles, setStyles] = useSpring(() => ({
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
      

    return (
        <animated.div
        >
            <MiniContainer><MiniImage src={imageShort} /></MiniContainer>
            
            <Container theme={theme} title={imageBig}></Container>
        </animated.div>
    )
  
}

const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
    }
    
  }

  const mapDispatchToProps = {
    setTheme
  }

export default connect(mapStateToProps, mapDispatchToProps)(Swiper);