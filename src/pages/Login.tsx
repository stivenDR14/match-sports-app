import { Component } from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import Buttons from "../components/Buttons";
import Card from "../components/Card";
import Form from "../components/Form";
import { StateModel } from "../models/stateModel";
import { DarkColors } from "../utils/Colors";


function Login(props:StateModel) {

    const MainPhoto = styled.img`
        height: 100%;
        width:100%;
        object-fit: contain;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: -10;
        background: ${props.theme.Background1};
        `;

    return (
        <div>
            <div >
                <Buttons type={1} text={props.theme==DarkColors?"🌤️":"🌙"}/>
            </div>
            <MainPhoto src="/assets/main_image.png"/>
            <Card title="Welcome to your favorite sports" subtitle="Discover diferent sports and save it!" />
                   
            
        </div>);
  }
  

  const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme
    }
    
  }

export default connect(mapStateToProps, null)(Login);