import React, { useState } from 'react'
import ContextProvider from './ContextProvider'
import axios from "axios";

const ContextState = (props) => {
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState("");
  const [username,setUsername] = useState("");
  const getTaskList = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/task/fetchalltasks`, {
        headers: {
          auth_token: localStorage.getItem("token")
        }
      });
      console.log(response.data.task);
      setTaskList(response.data.task);

    } catch (error) {
      console.log(error);
    }
  }




  return (
    <ContextProvider.Provider
      value={{
          taskList,
          error,
          getTaskList,
          username,
          setUsername
        }} >
      {props.children}
    </ContextProvider.Provider>
  )
}

export default ContextState;


