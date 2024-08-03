
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Home from "./components/Home"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";
import { useState } from "react";
import Logout from "./components/Logout";
import ContextState from "./context/ContextState";

function App() {
  const [alert, setAlert] = useState(null);

  const handleAlert = (message, type) => {
    setAlert(() => {
      return {
        message,
        type
      };
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }

  return (
    <>
      <ContextState>
        <BrowserRouter>
          {alert && <Alert alert={alert} />}
          <Routes>
            <Route path="/" element={<Home handleAlert={handleAlert} /> } />
            <Route path="/signup" element={<SignUp handleAlert={handleAlert} />} />
            <Route path="/signin" element={<SignIn handleAlert={handleAlert} />} />
            <Route path="/logout" element={<Logout handleAlert={handleAlert} />} />
          </Routes>
        </BrowserRouter>
      </ContextState>
    </>
  );
}

export default App;
