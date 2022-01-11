import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { StateModel } from "../models/state-model";
import { useSpring, animated } from "react-spring";
import { setTheme } from "../actions";
import { DarkColors } from "../utils/Colors";

const Container=styled.div`
overflow: hidden;
position: absolute;
padding: 0 0 32px;
margin: 48px auto 0;
background: ${props => (props.theme ? props.theme["Background2"]: DarkColors["Background2"])};
background-image: url(${props => (props.title ? props.title: "")});
background-position: center;
background-size: cover;
background-repeat: no-repeat;
width: 100%;
height:${props => (props.vocab==="true" ? "55vh": "75vh")};
top:${props => (props.vocab==="true" ? "-8vh": "11vh")};
font-family: Quicksand, arial, sans-serif;
border-radius: 0px 0px 35px 35px;
`;

const MiniContainer=styled.div`
    position: absolute;
    width: 62px;
    height: 63px;
    right: 40px;
    top: ${props => (props.vocab==="true" ? "15px": "135px")};
    justify-content: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 2rem;
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
`;


export  const TitleHeader = styled.header`
  padding-left: 5vw;
  padding-bottom: 5vh;
  width: 100%;
  font-weight: bold;
  color: ${props => (props.theme ? props.theme["PrimaryText"] : DarkColors["PrimaryText"])};
  font-size: 1.5rem;
  padding-top: 32px;
  justify-content: center;
  background: linear-gradient(360deg, #000000 0%, #000000 58.85%, rgba(0, 0, 0, 0) 100%);
  border-radius: 0px 0px 32px 32px; 
  padding-bottom: 10px;
  `;

interface SwiperProps extends StateModel {
  theme?: any,
  loading?:boolean,
  animation: any,
  imageBig: string,
  imageShort: string,
  isMobile: boolean,
  text:string
}


export const Swiper : React.FC<SwiperProps> = ({ theme, loading, animation, imageBig, imageShort, isMobile, text}) => {

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
            <div style={{zIndex:1}}>             
            <animated.div style={animation} >
                <Container theme={theme} title={imageBig} vocab={isMobile.toString()}>
                  <div style={{position: "absolute", bottom:"0vh", left:"0vw", width: "100%"}}>
                    <TitleHeader theme={DarkColors}>{text}</TitleHeader>
                  </div>
                </Container> 
            </animated.div>
            <MiniContainer vocab={isMobile.toString()}><MiniImage src={imageShort} /></MiniContainer>
            
            
            </div>
            
        </animated.div>
    )
  
}

const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
      loading: state.theme,
    }
    
  }

  const mapDispatchToProps = {
    setTheme
  }

export default connect(mapStateToProps, mapDispatchToProps)(Swiper);