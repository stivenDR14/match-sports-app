import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter, useLocation} from "react-router-dom";
import Data from "./pages/Data";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { store } from "./store/configuration";
import { positions, Provider as ProviderAlert } from "react-alert";
import  AlertTemplate  from "./components/Alert";
import  Menu  from "./components/Menu";
import News from "./pages/News";
import { useTransition, animated } from 'react-spring';

const options = {
  timeout: 1500,
  position: positions.TOP_CENTER,
  offset: '10px',
};

function App() {

  const location = useLocation()
  
  const transitions = useTransition(location, {
    from: { opacity: 0},
    enter: { opacity: 1},
    leave: { opacity: 0},
  })

  console.log(transitions)

  return transitions((props, item) => (
        <animated.div
          style={props} >
          <Routes location={item}>
              
              <Route path="/login" element={
                  <ProviderAlert template={AlertTemplate} {...options}>
                    <Login/>
                  </ProviderAlert>
                } />
              <Route path="/" element={<Menu/>}>
                
                <Route path="/home" element={
                <ProviderAlert template={AlertTemplate} {...options}>
                  <Home/>
                 </ProviderAlert>} />
                <Route path="/data" element={<Data/>} />
                <Route path="/news" element={<News/>} />
              </Route>
              
              <Route path="*" element={<NotFound/>} />
            </Routes>
        </animated.div>
      ))
}


export default App;
