import { connect } from "react-redux";
import { BodyComponent } from "../components/BodyComponent";
import Buttons from "../components/Buttons";
import { StateModel } from "../models/state-model";
import { DarkColors } from "../utils/Colors";

function Data(props:any) {
    return (
      <BodyComponent theme={props.theme}>
        <Buttons type={1} text={props.theme===DarkColors?"🌤️":"🌙"} isLeft={true}/>
        <Buttons type={4}/>
    </BodyComponent>);
  }
  const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
    }
    
  }
  
  const mapDispatchToProps = {
    
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Data);