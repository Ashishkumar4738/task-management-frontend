import axios from "axios";
import React, { useState } from "react";

export const ResetForm = (props) => {
  const [crediential, setCrediential] = useState({
    password: "",
    repassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (crediential.password !== crediential.repassword) {
      props.handleAlert("Passwords do not match", "error");
      return;
    }

    // Validate minimum password length
    if (crediential.password.length < 8) {
      props.handleAlert("Password should be at least 8 characters long", "error");
      return;
    }

    try {
      setLoading(true); // Set loading to true
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/updatepassword`,
        {
          mail: props.mail,
          password: crediential.password,
        }
      );
      if (response.data.success) {
        // Password updated successfully
        props.handleAlert("Your password was set successfully", "success");
        props.handleOpenResetForm();
      } else {
        // Failed verification
        props.handleAlert("Verification failed, please resend the OTP", "error");
      }
    } catch (error) {
      // Handle errors
      props.handleAlert("An error occurred. Please try again later.", "error");
      console.error("Error updating password:", error);
    } finally {
      setLoading(false); // Reset loading
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrediential((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[50vw] h-[50vh] bg-white/50 backdrop-blur-lg z-10 rounded-2xl flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-semibold">Enter new password</h1>
        <form className="flex flex-col gap-1" onSubmit={handleForm}>
          <label htmlFor="password">Password</label>
          <input
            type="password" // Changed from text to password
            id="password"
            name="password"
            className="px-4 py-2 rounded-lg font-semibold"
            value={crediential.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="repassword">Re-enter Password</label>
          <input
            type="password"
            id="repassword"
            name="repassword"
            className="px-4 py-2 rounded-lg font-semibold"
            value={crediential.repassword}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`mt-5 border-4 border-white text-white font-semibold text-lg w-[50%] m-auto rounded-lg py-2 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-400"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};
