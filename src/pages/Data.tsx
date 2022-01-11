import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import styled from "styled-components";
import { getHistoryUser } from "../actions";
import { BodyComponent } from "../components/BodyComponent";
import Buttons, { FavIcon, NotIcon } from "../components/Buttons";
import { FormHeader, FormTitle } from "../components/Form";
import { DocumentModel } from "../models/document-model";
import { StateModel } from "../models/state-model";
import { DarkColors, LightColors } from "../utils/Colors";
import Moment from 'react-moment';
import moment from 'moment';

const DateTitle=styled.p`
  padding-left: 5vw;
  padding-right: 5vw;
  font-weight: 600;
  color: ${props => (props.theme ? props.theme["PrimaryText"] : DarkColors["PrimaryText"])};
  font-size: 0.7rem;
  padding-top: 2px;
  padding-bottom: 2px;
`
const ScrollContainer=styled.div`
  widht:100%;
  height:50vh;
  overflow-y:scroll
`
const CardHistory=styled.div`
position:relative;
padding: 0 0 32px;
margin: 5vw ;
background: ${props => (props.theme ? props.theme["Background2"]: DarkColors["Background2"])};
width: 90%;
height: 6vh;
z-index:-1;
border-radius: 12px;
`;
const CardImage=styled.div`
position:absolute;
width: 75%;
height: 10vh;
z-index:1;
border-radius: 12px;
background-image: url(${props => (props.title ? props.title: "")});
background-position: center center;
background-size: cover;
background-repeat: no-repeat;
`;

const TitleHeader = styled.header`
  position:absolute;
  padding-top:2vh;
  width: 71%;
  height: 8vh;
  z-index:2;
  padding-left:4vw;
  border-radius: 12px;
  font-weight: 600;
  color: ${props => (props.theme ? props.theme["PrimaryText"] : DarkColors["PrimaryText"])};
  font-size: 1.4rem;
  justify-content: left;
  background: rgba(0, 0, 0, 0.3);
  `;

function Data(props:any) {

  const alert = useAlert()

  useEffect(()=>{
   props.getHistoryUser(props.user.uid)
  },[])


  useEffect(() => {
    if(props.error!=''){
      alert.error(props.error)
    }
    if(props.loading){
      if(props.history==null){
         alert.info("getting history...")
      }     
    }
    
  },[props.loading, props.error, props.sports, props.history]);

    return (
      <BodyComponent theme={props.theme}>
        <Buttons type={1} text={props.theme===DarkColors?"🌤️":"🌙"} isLeft={true}/>
        <Buttons type={4}/>
        <br />
        <br />
        <br />
        <div style={{width:"100%", height:"6vh"}}></div>
        <FormHeader typeof={"-"} theme={props.theme}>History</FormHeader>
        <FormTitle theme={props.theme}>In this page, you can see all the matches that you did in a day</FormTitle>
        <ScrollContainer>
          {
            props.history?Object.keys(props.history).length>0? Object.keys(props.history).map((itemDate,indexDate)=>
            <div><DateTitle key={"historyDate"+indexDate.toString()} theme={props.theme}>{moment(itemDate, 'YYYYMMDD').format('DD MMMM')}</DateTitle>
            {props.history[`${itemDate}`].map((itemHistory: DocumentModel,indexHistory: number)=>
            <div>
              <CardHistory key={"historyData"+indexHistory.toString()} theme={props.theme}>
              <TitleHeader theme={DarkColors}>{itemHistory.league.strSport}</TitleHeader>
              
              {itemHistory.like?<div style={{marginLeft:"72vw", position:"absolute", marginTop: "1vh"}}><FavIcon fill={props.theme["IconSelected"]}/></div>: <div style={{marginLeft:"72vw", position:"absolute", marginTop: "1vh"}}><NotIcon fill={LightColors["NotIcon"]}/></div>}
                <CardImage title={itemHistory.league.strBadge}></CardImage ></CardHistory>
              
            </div>
            
            )}
            
            </div>
              
            ):<div><br /><FormTitle theme={props.theme}>You don't match yet, please try it in Home page</FormTitle></div>:<br />
          }          
        </ScrollContainer>
        
    </BodyComponent>);
  }
  const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
      history: state.history,
      user: state.user,
      loading: state.loading,
      error:state.error,
    }
    
  }
  
  const mapDispatchToProps = {
    getHistoryUser,
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Data);