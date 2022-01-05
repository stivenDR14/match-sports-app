import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Data from "./pages/Data";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { store } from "./store/configuration";
import { positions, Provider as ProviderAlert } from "react-alert";
import  AlertTemplate  from "./components/Alert";


const options = {
  timeout: 1500,
  position: positions.TOP_CENTER,
  offset: '10px',
};

function App() {
  return (
    <Provider store={store}>
      
      <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <ProviderAlert template={AlertTemplate} {...options}>
                  <Login/>
                </ProviderAlert>
              } />
              <Route path="/home" element={<Home/>} />
              <Route path="/data" element={<Data/>} />
              <Route element={<NotFound/>} />
            </Routes>
      </BrowserRouter>
      
      
    </Provider>
    
  );
}

export default App;
