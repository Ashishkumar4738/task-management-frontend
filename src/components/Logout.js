import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Logout = (props) => {
    const navigate = useNavigate();
    useEffect(()=>{
        props.handleAlert("You are logged out","warning");
        localStorage.removeItem('token');
        navigate("/signin");
    })

  return (
    <div>Logout</div>
  )
}

export default Logout;
