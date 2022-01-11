import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BodyComponent } from "../components/BodyComponent";
import Buttons from "../components/Buttons";
import { FormHeader, FormTitle } from "../components/Form";
import { StateModel } from "../models/state-model";

function NotFound(props:any) {
    return (
    <BodyComponent theme={props.theme}>
      <br/>
     
      <FormTitle theme={props.theme}> <Buttons type={4}/>Back</FormTitle>
      <FormHeader theme={props.theme}>You shouldn't are here, back to the main page</FormHeader>
      
  
    </BodyComponent>);
  }

  const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
    }
    
  }
  
  export default connect(mapStateToProps, null)(NotFound);