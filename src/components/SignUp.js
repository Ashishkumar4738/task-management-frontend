import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from "axios";
import { motion } from "framer-motion"
import Loader from './Loader';
const SignUp = (props) => {
  const [crediential, setCrediential] = useState({
    name: "",
    email: "",
    password: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (crediential.name.length < 3) {
      props.handleAlert("Name atleast have 3 characters", "error");
      return;
    }
    if (crediential.password.length < 6) {
      props.handleAlert("Password must be 6 digit long", "error");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, {
        name: crediential.name,
        email: crediential.email,
        password: crediential.password,
        address: crediential.address
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.jwtToken);
        props.handleAlert('Your account created successfully', 'success');
        navigate('/');
      } else {
        props.handleAlert(response.data.message, 'error');
        navigate('/signup');
      }
    } catch (error) {
      if (error.response.data.errors) {
        props.handleAlert(error.response.data.errors[0].msg || "Some error occured", "error");
      } else {
        props.handleAlert(error.response.data.message, "error");
      }
    }
    finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCrediential({ ...crediential, [name]: value });
  };

  return (
    <>
      {loading && <Loader className={"z-10 top-[50%] left-[50%] "} />}
      <div className='absolute top-0 z-0 w-screen h-screen flex md:flex-row flex-col overflow-x-hidden ' >
        <motion.div
          initial={
            { opacity: 0, x: 500 }
          }
          animate={
            { opacity: 1, x: 0 }
          }
          transition={
            { duration: 1.2, type: "spring" }
          }
          className='relative right md:w-[50%] h-screen bg-slate-300/60 ' >
          <div className=' flex w-full h-full justify-center items-center' >
            <div className='w-[225px] h-[225px] bg-purple-900 rounded-full ' />
          </div>
          <div className='absolute top-[50%] h-[50%] bg-white/20  backdrop-blur-2xl w-full  ' />
        </motion.div>

        <motion.div
          initial={
            { opacity: 0, x: -500 }
          }
          animate={
            { opacity: 1, x: 0 }
          }
          transition={
            { duration: 1.2, type: "spring" }
          }
          className='left md:w-[50%] bg-white-500 h-screen flex flex-col justify-center place-content-center items-center mb-6 lg:mb-0 ' >
          <div className='relative w-[90%] md:w-[65%]  px-3 py-1 '>

            <h1 className='text-2xl md:text-4xl font-semibold my-4  ' >Create account</h1>
            <p className='text-pretty mb-2 md:mb-8 md:text-xl '>Welcome! Please enter your details.</p>
            <form className='flex flex-col ' onSubmit={handleSubmit} >
              <label htmlFor='name' className='font-semibold text-base mb-2  ' >Name</label>
              <input className='text-black py-3 px-2 border-2 border-gray-400 rounded-[10px] mb-4 ' type="text" name='name' placeholder='Enter your name' value={crediential.name} onChange={handleChange} />

              <label htmlFor='email' className='font-semibold text-base mb-2  ' >Email</label>
              <input className='text-black py-3 px-2 border-2 border-gray-400 rounded-[10px]  ' type="email" name='email' placeholder='Enter your email' value={crediential.email} onChange={handleChange} />


              <label htmlFor='password' className='font-semibold text-base mb-2 mt-4 ' >Password</label>
              <input className='text-black py-3 px-2 border-2 border-gray-400 rounded-[10px]' type="password" name='password' placeholder='Enter your password' value={crediential.password} onChange={handleChange} />

              <label htmlFor='address' className='font-semibold text-base mb-2 mt-4 ' >Address</label>
              <textarea className='text-black py-3 px-2 border-2 border-gray-400 rounded-[10px] mb-4 ' type="text" name='address' placeholder='Enter your address' value={crediential.address} onChange={handleChange} />

              <button type='submit' className='w-full rounded-[10px] py-3 px-1 text-xl font-semibold bg-purple-800 text-white  '  >Sign up</button>
            </form>
            <p className='text-gray-500 self-center w-full text-center mt-6 ' >Already have an account! <span className='text-purple-800 font-medium' > <Link to="/signin" className='underline' >Sign in</Link> </span></p>
          </div>
        </motion.div>



      </div>
    </>
  )
};

export default SignUp;
