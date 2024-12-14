import axios from "axios";
import React, { useState } from "react";

export const VerifyOtp = (props) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    const value = element.value;

    // Only allow numeric input
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input box if available
      if (value && index < 5) {
        element.nextSibling?.focus();
      }
    }
  };

  const handleKeyDown = (element, index, event) => {
    // Handle backspace
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      element.previousSibling?.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/matchotp`,
      {
        email: props.email,
        otp,
      }
    );
    props.handleOtpPopup();
    if(response.data.status){
        props.handleAlert(
            `${response.data.message}`,
            "success"
          );
    }else{
      props.handleAlert(
        `${response.data.message}`,
        "error"
      );
    }
  };

  return (
    <div className="fixed translate-x-[50%] translate-y-[50%] w-[50vw] h-[50vh] bg-white/50 backdrop-blur-lg rounded-2xl z-10">
      <div className="w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <label htmlFor="otp" className="font-semibold">
            Enter your OTP:
          </label>
          <div className="flex gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border-2 border-black rounded-lg text-lg focus:outline-none"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e.target, index, e)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
