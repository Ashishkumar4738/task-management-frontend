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
      if(response.data.success){
        props.handleAlert(response.data.message,"success");
      }else{
        props.handleAlert(response.data.message,"error");
      }
    } catch (error) {
      console.error(error);
      props.handleAlert("Some server side error","error");
    }
    finally{
      setLoading(false);
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
      console.log(response);
      if(response.data.success){
        props.handleAlert(response.data.message,"success");
      }else{
        props.handleAlert(response.data.message,"error");
      }
    } catch (error) {
      console.error(error);
      props.handleAlert("Some server side error","error");
    }
    finally{
      setLoading(false);
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
      if(response.data.success){
        props.handleAlert(response.data.message,"success");
      }else{
        props.handleAlert(response.data.message,"error");
      }
    } catch (error) {
      props.handleAlert(error.response.data.errors[0].msg||"Some error occured","error")
      console.error("error in create task ",error.response.data.errors[0].msg);
    }
    finally{
      setLoading(false);
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
