import React, { useState, useCallback } from 'react';
import ContextProvider from './ContextProvider';
import axios from "axios";

const ContextState = (props) => {
  const [taskList, setTaskList] = useState([]);
  const [username, setUsername] = useState("");
  const [loading,setLoading] = useState(false);

  const getTaskList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/task/fetchalltasks`, {
        headers: {
          auth_token: localStorage.getItem("token")
        }
      });
      
      setTaskList(response.data.task);
      setUsername(response.data.name);
    } catch (error) {
      console.log(error);  
    }
    finally{
      setLoading(false);
    }
  }, []); // Empty dependency array to ensure the function doesn't change

  const handleDelete = async (taskid) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/task/deletetask?taskid=${taskid}`, {
        headers: {
          auth_token: localStorage.getItem("token")
        }
      });
      setLoading(false);
      if (response.data.success) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdate = async (taskid, credentials) => {
    try {

      setLoading(true);
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/task/updateexistingtask?taskid=${taskid}`,
        credentials,
        {
          headers: {
            auth_token: localStorage.getItem('token')
          }
        });
        setLoading(false);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCreate = async (credentials) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/task/createtask`,
        credentials,
        {
          headers: {
            auth_token: localStorage.getItem("token")
          }
        }
      );
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ContextProvider.Provider
      value={{
        taskList,
        username,
        loading,
        getTaskList,
        setUsername,
        handleDelete,
        handleUpdate,
        handleCreate
      }} >
      {props.children}
    </ContextProvider.Provider>
  )
}

export default ContextState;
