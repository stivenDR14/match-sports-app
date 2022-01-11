import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CountryModel } from "../models/country-model";
import { SportModel } from "../models/sport-model";
import { StateModel } from "../models/state-model";
import { DarkColors } from "../utils/Colors";


interface DropdownProps extends StateModel {
    theme?: any,
    list: SportModel[] | CountryModel[],
    defaultValue: string,
    callback: Function,
    keyList: string,
  }
  

const DropDownContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const DropDownHeader = styled.div`
  
height:auto;
margin-top:1vh;
margin-bottom:1vh;
margin-left:1vw;
margin-right:1vw;
font-weight: 500;
  font-size: 1.3rem;
  border-radius: 18px;
  padding-top:30px;
    padding-left:15px;
    padding-right:15px;
  padding-bottom:10px;
  border: ${props => (props.theme ? props.theme["BorderFieldStyle"] : DarkColors["BorderFieldStyle"])};
  color: ${props => (props.theme ? props.theme["PrimaryText"] : DarkColors["PrimaryText"])};
  background: ${props => (props.theme ? props.theme["Background2"]: DarkColors["Background2"])};
`;


const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  max-height: 10vh;
  overflow-y: scroll;
  padding-left: 1em;
  background: #ffffff;
  border-radius: 12px;
  border: ${props => (props.theme ? props.theme["BorderFieldStyle"]: DarkColors["BorderFieldStyle"])};
  box-sizing: border-box;
  color: ${props => (props.theme ? props.theme["PrimaryText"] : DarkColors["PrimaryText"])};
  background: ${props => (props.theme ? props.theme["Background2"]: DarkColors["Background2"])};
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 2%;
  }
`;

const ListItem = styled.li`
  list-style: none;
  margin-bottom: 2%;
`;


export const DropdownComponent : React.FC<DropdownProps> = ({ theme, list, defaultValue, callback, keyList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
  
    const ref:any = useRef(null);
    const onOptionClicked = (value:any) => {
      setSelectedOption(value);
      setIsOpen(false);
      console.log(value);
      callback(value)
    };

    useEffect(() => {
        
        const closeOpenMenus = (e:any)=>{
            if(ref.current && !ref.current.contains(e.target)){
                setIsOpen(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", closeOpenMenus);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", closeOpenMenus);
        };
    }, [ref]);
    return (
        <div>
                 <DropDownContainer ref={ref}>
                    <DropDownHeader onClick={() => setIsOpen(true)} theme={theme}>
                    {selectedOption || defaultValue}
                    </DropDownHeader>
                    {isOpen && (
                        <DropDownList theme={theme}>
                        {list?list.map((option,index) => (                            
                            <div>
                                <ListItem key={index.toString() + keyList + Math.random.toString()} onClick={()=>onOptionClicked(option[keyList])}>
                                {option[keyList]}
                                </ListItem> 
                                <div className="divider"></div>
                            </div>
                        )):
                        <ListItem onClick={()=>onOptionClicked("")} key={Math.random()}>
                            {"No data"}
                            </ListItem>}
                        </DropDownList>
                    )}
                </DropDownContainer>
        </div>
                   
    )
  }
