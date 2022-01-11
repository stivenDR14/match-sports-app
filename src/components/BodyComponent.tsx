import styled from "styled-components";
import { DarkColors } from "../utils/Colors";

export const BodyComponent=styled.div`
    background: ${props => props.theme ? props.theme["Background1"]: DarkColors["Background1"]};
    height: 100vh;
    width: 100%;
    position: absolute;
    z-Index: -1;
    top: 0;
    overflow: hidden;
`;