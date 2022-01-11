import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { StateModel } from "../models/state-model";
import { DarkColors } from "../utils/Colors";
import Buttons from "./Buttons";
import '../utils/styles.css';
import { animated, useSpring, useSprings } from "react-spring";
import { svgIconProps } from "../models/svg-model";
import { setLogout } from "../actions";
import { useAlert } from "react-alert";


const DesktopMenu: any= {
    Wrapper: styled.nav`
      flex: 1;
  
      align-self: flex-start;
    margin-top: 2vh;
      padding: 1rem 5rem;
  
      margin-left: 1vw;
      margin-right: 1vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
  
      background-color: ${props => (props.theme ? props.theme["Background2"]: DarkColors["Background2"])};
        border-radius: 24px;
    `,
    Logo: styled.div`
    position: relative;
    width: 10vw;
    height: 10vh;
    `,
    Items: styled.ul`
      display: flex;
      list-style: none;
    `,
    Item: styled.li`
        color: ${props => (props.theme ? props.theme["PrimaryText"] : DarkColors["PrimaryText"])};
      padding: 5px 15px;
      cursor: pointer;
      ${props => (props.slot==="true" ? `border-bottom: 5px solid ${props.theme["MenuIcon"]}`: ``)};
    `
  };

const MobileMenu:any = {
    Wrapper: styled(DesktopMenu.Wrapper)`
      position: fixed;
      width: auto;
      bottom: 20px;
      left:1px;
      right:1px;
      height: 8vh;
      margin-left: 5vw;
      margin-right: 5vw;

        background: ${props => (props.theme ? props.theme["Background2"]: DarkColors["Background2"])};
        border-radius: 24px;
  
      justify-content: center;
    `,
    Items: styled(DesktopMenu.Items)`
      flex: 1;
      padding: 0 0rem;
  
      justify-content: space-around;
    `,
    Item: styled(DesktopMenu.Item)`
      display: flex;
      flex-direction: column;
      align-items: center;
  
      font-size: 1.2rem;
    `,
    Icon: styled.span`
    width: 15vw;
    height: 8vh;
    margin-left: 0vw;
    margin-right: 0vw;
    background-color:  ${props => (props.theme ? props.theme["SelectedButton"]: DarkColors["SelectedButton"])};
    border-radius: 16px;
    `
  };


  const HomeIcon = (props:svgIconProps) => {
    return (
      <div className="navbar-icon">
       <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3637 8.12705L18.3636 8.12696L10.5505 1.0239C10.2635 0.761097 9.88849 0.615338 9.49936 0.615356C9.11024 0.615375 8.73524 0.761168 8.44829 1.02399L0.63636 8.12696C0.475451 8.27353 0.34687 8.45205 0.258823 8.6511C0.170776 8.85016 0.125199 9.06539 0.125 9.28305V18.3125C0.125474 18.7267 0.290246 19.1239 0.583169 19.4168C0.876092 19.7097 1.27324 19.8745 1.6875 19.875H17.3125C17.7268 19.8745 18.1239 19.7097 18.4168 19.4168C18.7098 19.1239 18.8745 18.7267 18.875 18.3125V9.2831C18.8748 9.06545 18.8292 8.85024 18.7412 8.65119C18.6532 8.45215 18.5246 8.27364 18.3637 8.12705Z" fill={props.fill}/>
        </svg>
      </div>
    );
  }

  const HistoryIcon = (props:svgIconProps) => {
    return (
      <div className="navbar-icon">
       <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 0.125C7.64581 0.125 5.83325 0.674834 4.29153 1.70497C2.74982 2.73511 1.54821 4.19929 0.838634 5.91234C0.129062 7.6254 -0.0565943 9.5104 0.305142 11.329C0.666879 13.1475 1.55976 14.818 2.87088 16.1291C4.182 17.4402 5.85246 18.3331 7.67103 18.6949C9.48961 19.0566 11.3746 18.8709 13.0877 18.1614C14.8007 17.4518 16.2649 16.2502 17.295 14.7085C18.3252 13.1668 18.875 11.3542 18.875 9.5C18.8722 7.01446 17.8836 4.63152 16.126 2.87398C14.3685 1.11643 11.9855 0.127811 9.5 0.125ZM13.9194 6.18541L10.0525 10.0524C9.97992 10.125 9.8938 10.1825 9.79902 10.2218C9.70423 10.2611 9.60264 10.2813 9.50004 10.2813C9.39744 10.2813 9.29585 10.2611 9.20106 10.2218C9.10627 10.1826 9.02014 10.125 8.94759 10.0525C8.87504 9.97992 8.81749 9.8938 8.77822 9.79901C8.73895 9.70422 8.71874 9.60263 8.71874 9.50004C8.71873 9.39744 8.73894 9.29584 8.77819 9.20105C8.81745 9.10626 8.875 9.02014 8.94754 8.94759L12.8145 5.08058C12.8871 5.00803 12.9732 4.95048 13.068 4.91122C13.1628 4.87195 13.2644 4.85174 13.367 4.85174C13.4696 4.85174 13.5712 4.87194 13.6659 4.9112C13.7607 4.95046 13.8469 5.00801 13.9194 5.08055C13.992 5.1531 14.0495 5.23922 14.0888 5.33401C14.128 5.42879 14.1482 5.53038 14.1482 5.63298C14.1482 5.73557 14.128 5.83716 14.0888 5.93195C14.0495 6.02674 13.992 6.11286 13.9194 6.18541H13.9194Z" fill={props.fill}/>
        </svg>
      </div>
    );
  }

  const NewsIcon = (props:svgIconProps) => {
    return (
      <div className="navbar-icon">
       <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5312 2.12555H14.9688V1.3443C14.9688 1.1371 14.8864 0.938385 14.7399 0.791872C14.5934 0.64536 14.3947 0.563049 14.1875 0.563049C13.9803 0.563049 13.7816 0.64536 13.6351 0.791872C13.4886 0.938385 13.4062 1.1371 13.4062 1.3443V2.12555H10.2812V1.3443C10.2812 1.1371 10.1989 0.938385 10.0524 0.791872C9.90592 0.64536 9.7072 0.563049 9.5 0.563049C9.2928 0.563049 9.09409 0.64536 8.94757 0.791872C8.80106 0.938385 8.71875 1.1371 8.71875 1.3443V2.12555H5.59375V1.3443C5.59375 1.1371 5.51144 0.938385 5.36493 0.791872C5.21841 0.64536 5.0197 0.563049 4.8125 0.563049C4.6053 0.563049 4.40659 0.64536 4.26007 0.791872C4.11356 0.938385 4.03125 1.1371 4.03125 1.3443V2.12555H2.46875C2.05449 2.12602 1.65734 2.2908 1.36442 2.58372C1.0715 2.87664 0.906724 3.27379 0.90625 3.68805V18.5318C0.907198 19.3603 1.23674 20.1546 1.82259 20.7405C2.40843 21.3263 3.20274 21.6559 4.03125 21.6568H14.9688C15.7973 21.6559 16.5916 21.3263 17.1774 20.7405C17.7633 20.1546 18.0928 19.3603 18.0938 18.5318V3.68805C18.0933 3.27379 17.9285 2.87664 17.6356 2.58372C17.3427 2.2908 16.9455 2.12602 16.5312 2.12555ZM12.625 15.4068H6.375C6.1678 15.4068 5.96909 15.3245 5.82257 15.178C5.67606 15.0315 5.59375 14.8327 5.59375 14.6255C5.59375 14.4183 5.67606 14.2196 5.82257 14.0731C5.96909 13.9266 6.1678 13.8443 6.375 13.8443H12.625C12.8322 13.8443 13.0309 13.9266 13.1774 14.0731C13.3239 14.2196 13.4062 14.4183 13.4062 14.6255C13.4062 14.8327 13.3239 15.0315 13.1774 15.178C13.0309 15.3245 12.8322 15.4068 12.625 15.4068ZM12.625 12.2818H6.375C6.1678 12.2818 5.96909 12.1995 5.82257 12.053C5.67606 11.9065 5.59375 11.7077 5.59375 11.5005C5.59375 11.2933 5.67606 11.0946 5.82257 10.9481C5.96909 10.8016 6.1678 10.7193 6.375 10.7193H12.625C12.8322 10.7193 13.0309 10.8016 13.1774 10.9481C13.3239 11.0946 13.4062 11.2933 13.4062 11.5005C13.4062 11.7077 13.3239 11.9065 13.1774 12.053C13.0309 12.1995 12.8322 12.2818 12.625 12.2818Z" fill={props.fill}/>
        </svg>
      </div>
    );
  }
  


function Menu (props:any){
  
    const [windowDimension, setWindowDimension] = useState(0);

    const location = useLocation()
    const alert = useAlert()
    
  useEffect(() => {
    setWindowDimension(window.innerWidth)
  }, []);

  useEffect(() => {
    console.log("current: ", location)
  }, [location]);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const [contError, setContError]= useState(0)
  useEffect(() => {
    if(props.error!='' && contError==1){
      alert.error(props.error)
      setContError(0)
    }
    if(props.user===null){
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    }

  },[props.loading, props.error, props.user]);

  const isMobile = windowDimension <= 640;

    const navigate = useNavigate();

    const objectStyleSelected={
      scale: 1.2,y:-5
    }
    const objectStyleNormal={
      scale: 1,
      y:0,
    }
   
    const [stylesHome, setStylesHome] = useSpring(() => (location.pathname==="/home"?objectStyleSelected:objectStyleNormal))

    const [stylesData, setStylesData] = useSpring(() => (location.pathname==="/data"?objectStyleSelected:objectStyleNormal))

    const [stylesNews, setStylesNews] = useSpring(() => (location.pathname==="/options"?objectStyleSelected:objectStyleNormal))

    const logout=()=>{
      alert.info("Closing session...")
      setContError(1)
      props.setLogout()
      
    }
    
    
  return (
    <div>
         <Outlet />
        {isMobile ?(
        <MobileMenu.Wrapper theme={props.theme}>
          <MobileMenu.Items>
            <MobileMenu.Item onClick={()=>{navigate("/home");}}>
               <MobileMenu.Icon theme={location.pathname==="/home"?props.theme:''}>
                <animated.div
                    onMouseUp={()=> {
                      setStylesHome.start(objectStyleSelected)
                      setStylesData.start(objectStyleNormal)
                      setStylesNews.start(objectStyleNormal)
                    }}
                    style={stylesHome}
                >
                    <HomeIcon fill={location.pathname==="/home"?props.theme["IconSelected"]:props.theme["MenuIcon"]}/>
                </animated.div>              
              </MobileMenu.Icon>
              
            </MobileMenu.Item>
            <MobileMenu.Item onClick={()=>{navigate("/data");}}>
              <MobileMenu.Icon theme={location.pathname==="/data"?props.theme:''}>
              <animated.div
                    onMouseUp={()=> {
                          setStylesData.start(objectStyleSelected)
                          setStylesHome.start(objectStyleNormal)
                          setStylesNews.start(objectStyleNormal)
                    }}
                    style={stylesData}
                >
                  <HistoryIcon fill={location.pathname==="/data"?props.theme["IconSelected"]:props.theme["MenuIcon"]}/>
              </animated.div> 
              
              </MobileMenu.Icon>
            </MobileMenu.Item>
            <MobileMenu.Item onClick={()=>{navigate("/options");}}>
              <MobileMenu.Icon theme={location.pathname==="/options"?props.theme:''}>
              <animated.div
                    onMouseUp={()=> {
                          setStylesNews.start(objectStyleSelected)
                          setStylesHome.start(objectStyleNormal)
                          setStylesData.start(objectStyleNormal)
                    }}
                    style={stylesNews}
                >
                  <NewsIcon fill={location.pathname==="/options"?props.theme["IconSelected"]:props.theme["MenuIcon"]}/>
              </animated.div> 
              
              </MobileMenu.Icon>
            </MobileMenu.Item>
            <MobileMenu.Item onClick={()=>{
                logout()}}>
              <MobileMenu.Icon theme={location.pathname==="/login"?props.theme:''}>
              <img className="navbar-icon" src="/assets/profile.png" alt="icon" />
              </MobileMenu.Icon>
            </MobileMenu.Item>
          </MobileMenu.Items>
        </MobileMenu.Wrapper>)
        :(<DesktopMenu.Wrapper theme={props.theme}>
          <DesktopMenu.Logo><Buttons type={1} text={props.theme==DarkColors?"🌤️":"🌙"}/></DesktopMenu.Logo>
          <DesktopMenu.Items>
            <DesktopMenu.Item theme={props.theme} slot={location.pathname==="/home"?"true":"false"} onClick={()=>{navigate("/home");}}>Home</DesktopMenu.Item>
            <DesktopMenu.Item theme={props.theme} slot={location.pathname==="/data"?"true":"false"} onClick={()=>{navigate("/data");}}>History</DesktopMenu.Item>
            <DesktopMenu.Item theme={props.theme} slot={location.pathname==="/options"?"true":"false"} onClick={()=>{navigate("/options");}}>Options</DesktopMenu.Item>
            <DesktopMenu.Item theme={props.theme} onClick={()=>{
                logout()}}>logout</DesktopMenu.Item>
          </DesktopMenu.Items>
        </DesktopMenu.Wrapper>)}
    </div>
   
      
  )
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
  setLogout,
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

