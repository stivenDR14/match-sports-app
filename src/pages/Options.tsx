import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { fetchGetCountries, fetchGetSports, setCountry, setLeaguesSuccess, setParameterTrigger, setSport } from "../actions";
import { BodyComponent } from "../components/BodyComponent";
import Buttons from "../components/Buttons";
import {DropdownComponent}  from "../components/Dropdown";
import { FieldTitle, FormHeader, FormTitle } from "../components/Form";
import { StateModel } from "../models/state-model";
import { DarkColors } from "../utils/Colors";
import '../utils/styles.css';

function Options(props: any) {
  
  const alert = useAlert()


  
  useEffect(() => {
    if(props.sports==null){
      props.fetchGetSports();
    }   
    if(props.countries==null){
      props.fetchGetCountries();
    }  
    
  },[]);

  useEffect(() => {
    if(props.error!=''){
      alert.error(props.error)
    }
    if(props.user!=null){
    }
    if(props.loading){
      if(props.sports==null){
         alert.info("getting sports...")
      }
      if(props.countries==null){
        alert.info("getting countries...")
     }
     
    }
    
  },[props.user, props.loading, props.error, props.sports, props.countries]);
  
    return (<BodyComponent theme={props.theme}>
    <Buttons type={1} text={props.theme===DarkColors?"🌤️":"🌙"} isLeft={false}/>
                
    <div style={{marginTop:"20vh"}}>
    <FormHeader theme={props.theme}>Select the options for the items that you want to match</FormHeader>
    <FormTitle theme={props.theme}>After that you can back to the home and see the changes</FormTitle>
      <div className="content-box">
      <div className="form-field">
        <FieldTitle theme={props.theme}>Sport</FieldTitle><DropdownComponent keyList="strSport" callback={(sport1: string)=>{props.setParameterTrigger(true);props.setLeaguesSuccess([]);props.setSport(sport1)}} list={props.sports?props.sports:[]} theme={props.theme} defaultValue={props.sport}/>
      </div>   
      <div className="form-field">
        <FieldTitle theme={props.theme}>Country</FieldTitle><DropdownComponent keyList="name_en" callback={(country1: string)=>{props.setParameterTrigger(true);props.setLeaguesSuccess([]);props.setCountry(country1)}} list={props.countries?props.countries:[]} theme={props.theme} defaultValue={props.country}/>
      </div>   
        
      </div>
    </div>
      
       
       
    </BodyComponent>);
  }
  

  const mapStateToProps = (state: StateModel): StateModel => {
    return{
      theme:state.theme,
      loading: state.loading,
      error:state.error,
      sports:state.sports,
      countries: state.countries,
      sport: state.sport,
      country: state.country,
      parameterTrigger: state.parameterTrigger
    }
    
  }
  const mapDispatchToProps = {
    fetchGetSports,
    fetchGetCountries,
    setSport,
    setCountry,
    setParameterTrigger,
    setLeaguesSuccess
  }

  export default connect(mapStateToProps, mapDispatchToProps) (Options);