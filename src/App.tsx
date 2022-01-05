import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Data from "./pages/Data";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { store } from "./store/configuration";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/data" element={<Data/>} />
              <Route element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    </Provider>
    
  );
}

export default App;
