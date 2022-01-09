import { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { animated, useSpring, useSprings } from "react-spring";
import { fetchGetSports } from "../actions";
import Buttons from "../components/Buttons";
import Swiper from "../components/Swiper";
import { StateModel } from "../models/state-model";
import { DarkColors } from "../utils/Colors";
import { useDrag, useGesture } from '@use-gesture/react'
import { SportModel } from "../models/sport-model";

const springObjects =
  (originalIndex = 0,xPos=0,down=false, mx=0, isFinalDrag=false, array:SportModel[]=[], goneCount=0) =>
  (index: number) =>
    index === originalIndex
      ? isFinalDrag? { x: xPos}:{ x: down ? mx : 0, immediate: down}
      : index >= (array.length - goneCount) ?{ x: -200 - window.innerWidth}: { x: 0}

function Home(props:any) {

  const alert = useAlert()


  
  useEffect(() => {
    if(props.sports==null){
      props.fetchGetSports();
      api.start(springObjects(0, 0, false, 0, false, [], 0))
    }else{
      api.start(springObjects(0, 0, false, 0, false, props.sports.sports, 0))
    }
    
    
  },[]);

  const navigate = useNavigate();

  const [gone, setGone] = useState(0)
  
  useEffect(() => {
    if(props.error!=''){
      alert.error(props.error)
    }
    if(props.user!=null){
    }
    if(props.loading){
      alert.info("getting sports...")
    }
    if(props.user===null){
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    }
  },[props.user, props.loading, props.error, props.sports]);

  const [styles, api] = useSprings(40,springObjects())

  const [greatTrigger, setGreatTrigger] = useState(false)

  const multiAnimation = useSpring({
    from: { scaleY: greatTrigger? 1:1, x:0 },
    to: [
        { scaleY: greatTrigger? 1.5:1, x: 0},
        { scaleY: greatTrigger? 1:1},
    ],
    duration: 2000
  });

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
    onDrag: ({ args: [originalIndex], down, movement: [mx] }) => api.start(springObjects(originalIndex, 0, down, mx, false, props.sports.sports, gone)),
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
    api.start(springObjects(originalIndex, -200 - window.innerWidth,false, 0, true, props.sports.sports, gone))
    setTimeout(() => {
      apiDislke.start({ scale: 1, y: 10, opacity: 1})
    }, 400);
    setGone(gone+1)
  }

  const handleLike=(originalIndex:number)=>{
    setGreatTrigger(true)
    apiLike.start({ scale: 1.3, y: -350, x: -90, opacity: 1})
    setTimeout(() => {
      api.start(springObjects(originalIndex, -200 - window.innerWidth,false, 0, true, props.sports.sports, gone))
      setGreatTrigger(false)
      apiLike.start({ scale: 1, y: 0, x:0, opacity: 1})
    }, 1000);
    
    setGone(gone+1)
  }


    return (
    <div style={{
          background: props.theme["Background1"],
          height: "100vh",
          width: "100%",
          position: "absolute",
          zIndex: -1,
          top: 0,
          overflow: "hidden"
    }}>
                
                {props.sports?props.sports.sports.map((sport: SportModel, index:number)=>
                <animated.div key={sport.idSport} {...bind(index)} style={{ ...styles[index], touchAction: 'none' }} >
                  <Swiper imageBig={sport.strSportThumb} imageShort={sport.strSportIconGreen} animation={index == (props.sports.sports.length - gone)?multiAnimation:{}}/>
                </animated.div>)
                :<div/>}
                
                <Buttons type={1} text={props.theme===DarkColors?"🌤️":"🌙"} isLeft={false}/>
                
                <animated.div
                    onMouseUp={()=> {
                      handleLike(props.sports.sports.length-1 - gone)
                    }}
                   style={stylesLike}
                >
                  <Buttons type={2} isLiked={greatTrigger}/>
                </animated.div>
                <animated.div
                    onMouseUp={()=> {
                      handleUnlike(props.sports.sports.length-1 - gone)
                    }}
                    style={stylesDislike}
                >
                  <Buttons type={3}/>
                </animated.div>
    </div>);
  }
  
  const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
      loading: state.loading,
      user: state.user,
      error:state.error,
      sports:state.sports,
    }
    
  }
  const mapDispatchToProps = {
    fetchGetSports
  }
export default connect(mapStateToProps, mapDispatchToProps)(Home);