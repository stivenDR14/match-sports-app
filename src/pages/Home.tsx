import { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { animated, useSpring, useSprings } from "react-spring";
import { fetchGetLeagues, setParameterTrigger, setSportDatabase } from "../actions";
import Buttons from "../components/Buttons";
import Swiper from "../components/Swiper";
import { StateModel } from "../models/state-model";
import { DarkColors } from "../utils/Colors";
import { useDrag, useGesture } from '@use-gesture/react'
import { SportModel } from "../models/sport-model";
import { DocumentModel } from "../models/document-model";
import { LeagueModel } from "../models/league-model";
import { FormHeader } from "../components/Form";
import { BodyComponent } from "../components/BodyComponent";

const springObjects =
  (originalIndex = 0,xPos=0,down=false, mx=0, isFinalDrag=false, array:SportModel[]=[], goneCount=0) =>
  (index: number) =>
    index === originalIndex
      ? isFinalDrag? { x: xPos}:{ x: down ? mx : 0, immediate: down}
      : index >= (array.length - goneCount) ?{ x: -200 - window.innerWidth}: { x: 0}

function Home(props:any) {

  const alert = useAlert()


  
  useEffect(() => {
    if(props.leagues==null){
      props.fetchGetLeagues(props.country,props.sport);
      api.start(springObjects(0, 0, false, 0, false, [], 0))
    }else{
      api.start(springObjects(0, 0, false, 0, false, props.leagues, 0))
    }
    
    
  },[]);

  useEffect(() => {
    if(props.parameterTrigger){
      props.fetchGetLeagues(props.country,props.sport);
      props.setParameterTrigger(false)
    }
    
    
  },[props.parameterTrigger]);


  const [gone, setGone] = useState(0)
  
  useEffect(() => {
    if(props.error!=''){
      alert.error(props.error)
    }
    if(props.user!=null){
    }
    if(props.loading){
      if(props.leagues==null){
         alert.info("getting leagues...")
      }
     
    }
    
  },[props.user, props.loading, props.error, props.leagues]);

  const [styles, api] = useSprings(40,springObjects())

  const [greatTrigger, setGreatTrigger] = useState(false)

  

  const [stylesLike, apiLike] = useSpring(() => ({
    scale: 1,
    y: 0,
    x:0,
    opacity: 1,
    width: "5vh",
  }))

  const [stylesDislike, apiDislke] = useSpring(() => ({
    scale: 1,
    y: 0,
    opacity: 1,
    width: "5vh",
  }))

  

  const bind =useGesture({
    onDrag: ({ args: [originalIndex], down, movement: [mx] }) => api.start(springObjects(originalIndex, 0, down, mx, false, props.leagues, gone)),
    onDragEnd: ({args: [originalIndex], movement: [mx]}) => {
      if(-100>mx){
        handleUnlike(originalIndex)
      }
      if(mx>100){
        handleLike(originalIndex)
      }
    },
  })


  const handleUnlike=(originalIndex:number)=>{
    apiDislke.start({ scale: 0.8, y: 140, opacity: 0.4})
    api.start(springObjects(originalIndex, -200 - window.innerWidth,false, 0, true, props.leagues, gone))
    let sportData:DocumentModel={
      like: false,
      league: props.leagues[originalIndex] as LeagueModel
    }
    props.setSportDatabase(sportData,props.user.uid)
    setTimeout(() => {
      apiDislke.start({ scale: 1, y: 10, opacity: 1})
    }, 400);
    setGone(gone+1)
  }

  const handleLike=(originalIndex:number)=>{
    setGreatTrigger(true)
    apiLike.start({ scale: 1.3, y: -350, x: -90, opacity: 1})
    let sportData:DocumentModel={
      like: true,
      league: props.leagues[originalIndex] as LeagueModel
    }
    props.setSportDatabase(sportData,props.user.uid)
    setTimeout(() => {
      api.start(springObjects(originalIndex, -200 - window.innerWidth,false, 0, true, props.leagues, gone))
      setGreatTrigger(false)
      apiLike.start({ scale: 1, y: 0, x:0, opacity: 1})
    }, 1000);
    
    setGone(gone+1)
    console.log(gone, props.leagues.length)
  }

  const [windowDimension, setWindowDimension] = useState(0);
  useEffect(() => {
    setWindowDimension(window.innerWidth)
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;

  const multiAnimation = useSpring({
    from: { scale: greatTrigger? isMobile? 1: 1:1, x:0 },
    to: [
        { scale: greatTrigger? isMobile? 1.5:0.7:1, x: 0},
        { scale: greatTrigger? isMobile? 1:1:1},
    ],
    duration: 2000
  });

    return (
      
    <BodyComponent theme={props.theme}>

                
                {props.leagues?props.leagues.map((league: LeagueModel, index:number)=>
                <animated.div key={league.idLeague} {...bind(index)} style={{ ...styles[index], touchAction: 'none' }} >
                  <Swiper text={league.strSport} isMobile={isMobile} imageBig={league.strFanart1==="" || league.strFanart1===null?league.strLogo:league.strFanart1} imageShort={league.strBadge} animation={index == (props.leagues.length - gone)?multiAnimation:{}}/>
                </animated.div>)
                :<div/>}
                
                <Buttons type={1} text={props.theme===DarkColors?"🌤️":"🌙"} isLeft={false}/>
                
                {props.leagues? props.leagues.length===0 || props.leagues.length - gone===0?
                <div style={{marginTop:"25vh"}}><FormHeader theme={props.theme}>There is not data for the options set. Please change them</FormHeader ></div>
                :<div>
                   <animated.div
                    onMouseUp={()=> {
                      handleLike(props.leagues.length-1 - gone)
                    }}
                    style={stylesLike}
                  >
                    <Buttons type={2} isLiked={greatTrigger} isMobile={isMobile}/>
                  </animated.div>
                  <animated.div
                      onMouseUp={()=> {
                        handleUnlike(props.leagues.length-1 - gone)
                      }}
                      style={stylesDislike}
                  >
                    <Buttons type={3}/>
                  </animated.div>
                </div>: <div style={{marginTop:"25vh"}}><FormHeader theme={props.theme}>There is not data for the options set. Please change them</FormHeader ></div>}
               
    </BodyComponent>);
  }
  
  const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
      loading: state.loading,
      user: state.user,
      error:state.error,
      sports:state.sports,
      leagues: state.leagues,
      sport:state.sport,
      country:state.country,
      parameterTrigger: state.parameterTrigger
    }
    
  }
  const mapDispatchToProps = {
    fetchGetLeagues,
    setSportDatabase,
    setParameterTrigger
  }
export default connect(mapStateToProps, mapDispatchToProps)(Home);