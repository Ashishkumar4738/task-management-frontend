import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ContextProvider from "../context/ContextProvider";
import Loader from "./Loader";
import { VerifyOtp } from "./VerifyOtp";
import { ResetForm } from "./ResetForm";
const SignIn = (props) => {
  const [crediential, setCrediential] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const context = useContext(ContextProvider);
  const { setUsername } = context;
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [otpSend, setOtpSend] = useState(false);
  const [openResetForm, setOpenResetForm] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCrediential({ ...crediential, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (hide) {
      handleForgot();
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/signin`,
        {
          email: crediential.email,
          password: crediential.password,
        }
      );
      setLoading(false);
      if (response.data.success) {
        localStorage.setItem("token", response.data.jwtToken);
        props.handleAlert(
          response.data.message || "Successfully logged",
          "success"
        );

        setUsername(response.data.name);
        navigate("/");
      } else {
        props.handleAlert(response.data.message || "some error", "error");
      }
    } catch (error) {
      if (error && error.response) {
        if (error.response.data.errors) {
          props.handleAlert(error.response.data.errors[0].msg, "error");
        } else {
          props.handleAlert(error.response.data.message, "error");
        }
      } else {
        props.handleAlert("Some error occured", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    setHide(true);
    if (!crediential.email) {
      props.handleAlert("First enter the email", "error");
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/sendmail`,
        {
          email: crediential.email,
        }
      );
      if (response.data) {
        props.handleAlert(response.data.message, "success");
        setHide(false);
        setOtpSend(true);
      }
      setLoading(false);
    } catch (error) {
      if (error && error.response) {
        if (error.response.data.errors) {
          props.handleAlert(error.response.data.errors[0].msg, "error");
        } else {
          props.handleAlert(error.response.data.message, "error");
        }
      } else {
        props.handleAlert("Some error occured", "error");
      }
    }
  };

  const handleOtpPopup = () => {
    setOtpSend(false);
    setOpenResetForm(true);
  };
  const handleOpenResetForm = () => {
    setOpenResetForm(false);
  };

  return (
    <>
      {loading && <Loader className={"z-10 top-[50%] left-[50%] "} />}
      {openResetForm ? (
        <ResetForm
          mail={crediential.email}
          handleAlert={props.handleAlert}
          handleOpenResetForm={handleOpenResetForm}
        />
      ) : (
        ""
      )}

      {otpSend && (
        <VerifyOtp
          email={crediential.email}
          handleOtpPopup={handleOtpPopup}
          handleAlert={props.handleAlert}
        />
      )}
      <div className="absolute top-0 z-0 w-screen h-screen flex flex-col-reverse md:flex-row overflow-hidden ">
        <motion.div
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, type: "spring" }}
          className="left w-full md:w-[50%] 
        bg-white-500 h-screen flex flex-col justify-center place-content-center items-center  "
        >
          <div>
            <h1 className="text-2xl md:text-5xl font-semibold my-4  ">
              Welcome back
            </h1>
            <p className="text-pretty mb-8 md:text-xl ">
              Welcome back! Please enter your details.
            </p>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label htmlFor="email" className="font-semibold text-base mb-2  ">
                Email
              </label>
              <input
                className="text-black py-3 px-2 border-2 border-gray-400 rounded-[10px]  "
                type="email"
                name="email"
                placeholder="Enter your email"
                value={crediential.email}
                onChange={handleChange}
              />

              {!hide ? (
                <>
                  <label
                    htmlFor="password"
                    className="font-semibold text-base mb-2 mt-4 "
                  >
                    Password
                  </label>
                  <input
                    className="text-black py-3 px-2 border-2 border-gray-400 rounded-[10px]"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={crediential.password}
                    onChange={handleChange}
                  />
                </>
              ) : (
                ""
              )}

              <p
                className="self-end my-4 text-gray-400 font-semibold underline underline-offset-4 cursor-pointer hover:text-purple-800 "
                onClick={handleForgot}
              >
                Forgot password
              </p>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                type="submit"
                className="w-full rounded-[10px] py-3 px-1 text-xl font-semibold bg-purple-800 text-white  "
              >
                {!hide ? "Sign in" : "Request Otp"}
              </motion.button>
            </form>
            <p className="text-gray-500 self-center w-full text-center mt-6 ">
              Don't have an account?{" "}
              <span className="text-purple-800 font-medium">
                {" "}
                <Link to="/signup" className="underline">
                  Sign up
                </Link>{" "}
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, type: "spring" }}
          className="relative right w-full md:w-[50%]  md:h-screen bg-slate-300/60 "
        >
          <div className=" flex w-full h-full justify-center items-center">
            <div className="w-[225px] h-[225px] bg-purple-900 rounded-full " />
          </div>
          <div className="absolute top-[50%] h-[50%] bg-white/20  backdrop-blur-2xl w-full  " />
        </motion.div>
      </div>
    </>
  );
};

export default SignIn;
