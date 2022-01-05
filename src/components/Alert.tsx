import { AlertComponentPropsWithStyle } from "react-alert"
import { connect } from "react-redux";
import styled from "styled-components";
import { StateModel } from "../models/state-model"
import { DarkColors } from "../utils/Colors";
import '../utils/styles.css';

interface alertProps extends AlertComponentPropsWithStyle{
    theme?: any
}
  
const AlertTemplate  : React.FC<alertProps> = ({style, options, message, close, theme} ) => {
    
    const ButtonClose=styled.div`
    top: 5px;
    right: 5px;
    width: 5vw;
    height: auto;
    position: absolute;
    font-size: 1.3rem;
    color: ${DarkColors.GradentLeft};
    border-radius: 18px;
  `;

  const TitleAlert = styled.p`
    font-size: 1.3rem;
    margin-left:2vw;
    margin-right:2vw;
    top:1px;
    left:15px;
    position: absolute;
    color: ${theme["TitleField"]};
  `;

  const ContainerAlert= styled.div`
  width: 50vw;
  height: 15vh;
  background: ${theme["Background2"]};
  font-family: Quicksand, arial, sans-serif;
  border-radius: 35px;
  margin-top:5px;
  margin-bottom:5px;
  position: relative;
`;

    return(
        <div style= {style}>
<ContainerAlert>
     
     <TitleAlert> {options.type === 'info' && '❕'}
     {options.type === 'success' && '✅'}
     {options.type === 'error' && '🚨'}{message}</TitleAlert>
   <ButtonClose onClick={close}>x</ButtonClose>
   
   
 </ContainerAlert>
        </div>
    
  )
}

const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
    }
    
  }

export default connect(mapStateToProps, null)(AlertTemplate);