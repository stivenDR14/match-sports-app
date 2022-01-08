import { connect } from "react-redux";
import Buttons from "../components/Buttons";
import { StateModel } from "../models/state-model";
import { DarkColors } from "../utils/Colors";

function Home(props:any) {
    return (
    <div style={{
          background: props.theme["Background1"],
          height: "100vh",
          width: "100%",
          position: "absolute",
          zIndex: -1,
          top: 0
    }}>
                <Buttons type={1} text={props.theme==DarkColors?"🌤️":"🌙"} isLeft={false}/>
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
    }
    
  }
  const mapDispatchToProps = {
    
  }
export default connect(mapStateToProps, mapDispatchToProps)(Home);