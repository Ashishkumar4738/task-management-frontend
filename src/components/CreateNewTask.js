import React, { useState, useContext } from 'react';
import ContextProvider from '../context/ContextProvider';
import Loader from './Loader';
import { motion } from 'framer-motion';
const CreateNewTask = (props) => {
  const [credentials, setCredentials] = useState({
    title:  "",
    description: "",
    status:false,
    dueStatus: ""
  });
  const context = useContext(ContextProvider);
  const {handleCreate, loading} = context;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(credentials.title.length===0){
      props.handleAlert("Title can't be empty!","warning");
    }else if(credentials.description.length<10){
      props.handleAlert("Description must have atleast 10 characters!","warning");
    }else if(credentials.dueStatus.length===0){
      props.handleAlert("Please select a date!","warning");
    }else{
      handleCreate(credentials);
      close();
    }

  }

  const close = ()=>{
    props.setCreate(false);
  }

  const hidden = {
    y:-400,
    opacity:0,
    scale:0
  }
  const visible = {
    y:0,
    opacity:1,
    scale:1,
    transition: { duration: 0.5 }
  }




  

  return (
    <>
      { loading && <Loader className={"z-10 top-[0%] left-[50%] "} />}
      <motion.div

      initial={hidden}
      animate={visible}
      
      className='overflow-hidden absolute left-[10%] md:left-[25%] top-[10%] w-[80%] md:w-[50%] max-h-max shadow-gray-400 shadow-lg bg-white/80 backdrop-blur-lg rounded-[20px] px-4 py-4 z-10 '>
      <p className='absolute right-5  border-2 border-black px-2 rounded-full top-2 shadow-lg shadow-white/20 font-bold cursor-pointer  ' onClick={close} >X</p>
      
        <form onSubmit={handleSubmit}  >
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={credentials.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              rows={5}
              type="text"
              name="description"
              value={credentials.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Status</label>
            <input
              type="checkbox"
              name="status"
              checked={credentials.status}
              onChange={(e) => setCredentials({ ...credentials, status: e.target.checked })}
              className="mr-2 leading-tight"
            />
            <span className="text-sm">{credentials.status===true?"Completed":"Not Completed"}</span>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Due Date</label>
            <input
              type="date"
              name="dueStatus"
              value={credentials.dueStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter due status"
            />
          </div>
          <button type="submit" className="w-full py-2 bg-purple-800 text-white font-semibold rounded-md">
            Create Task
          </button>
        </form>
      </motion.div>
    </>
  );
};

export default CreateNewTask;
