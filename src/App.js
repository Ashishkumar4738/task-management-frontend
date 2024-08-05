import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";
import { useState } from "react";
import Logout from "./components/Logout";
import ContextState from "./context/ContextState";

function App() {
  const [alert, setAlert] = useState(null);

  // Function to handle alerts
  const handleAlert = (message, type) => {
    setAlert(() => {
      return {
        message,
        type
      };
    });
    // Automatically dismiss alert after 5 seconds
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }

  return (
    <>
      <ContextState handleAlert={handleAlert} >
        <BrowserRouter>
          {/* Display alert if present */}
          {alert && <Alert alert={alert} />}
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Home handleAlert={handleAlert} />} />
            {/* Sign up route */}
            <Route path="/signup" element={<SignUp handleAlert={handleAlert} />} />
            {/* Sign in route */}
            <Route path="/signin" element={<SignIn handleAlert={handleAlert} />} />
            {/* Logout route */}
            <Route path="/logout" element={<Logout handleAlert={handleAlert} />} />
          </Routes>
        </BrowserRouter>
      </ContextState>
    </>
  );
}

export default App;
