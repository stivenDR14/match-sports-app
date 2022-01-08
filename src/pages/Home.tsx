import { useEffect } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchGetSports } from "../actions";
import Buttons from "../components/Buttons";
import Swiper from "../components/Swiper";
import { StateModel } from "../models/state-model";
import { DarkColors } from "../utils/Colors";

function Home(props:any) {

  const alert = useAlert()
  
  useEffect(() => {
    props.fetchGetSports();
  },[]);

  const navigate = useNavigate();
  
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
    return (
    <div style={{
          background: props.theme["Background1"],
          height: "100vh",
          width: "100%",
          position: "absolute",
          zIndex: -1,
          top: 0
    }}>
                <Swiper imageBig={"https://www.thesportsdb.com/images/sports/soccer.jpg"} imageShort={"https://www.thesportsdb.com/images/icons/sports/soccer.png"}/>
                <Buttons type={1} text={props.theme===DarkColors?"🌤️":"🌙"} isLeft={false}/>
                <Buttons type={2}/>
                <Buttons type={3}/>
                
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