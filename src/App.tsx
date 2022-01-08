import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter, Link, Outlet } from "react-router-dom";
import Data from "./pages/Data";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { store } from "./store/configuration";
import { positions, Provider as ProviderAlert } from "react-alert";
import  AlertTemplate  from "./components/Alert";
import  Menu  from "./components/Menu";
import News from "./pages/News";


const options = {
  timeout: 1500,
  position: positions.TOP_CENTER,
  offset: '10px',
};

function App() {
  return (
    <Provider store={store}>
     
      <BrowserRouter>
        <div>
          <Routes>
              
              <Route path="/login" element={
                  <ProviderAlert template={AlertTemplate} {...options}>
                    <Login/>
                  </ProviderAlert>
                } />
              <Route path="/" element={<Menu/>}>
                
                <Route path="/home" element={<Home/>} />
                <Route path="/data" element={<Data/>} />
                <Route path="/news" element={<News/>} />
              </Route>
              
              <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
            
      </BrowserRouter>
      
      
    </Provider>
    
  );
}


export default App;
