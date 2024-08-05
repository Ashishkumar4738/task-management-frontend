import React, { useState, useContext } from 'react';
import ContextProvider from '../context/ContextProvider';
import Loader from './Loader';

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
    handleCreate(credentials);
    close();

  }

  const close = ()=>{
    props.setCreate(false);
  }



  

  return (
    <>
      { loading && <Loader className={"z-10 top-[0%] left-[50%] "} />}
      <div className='overflow-hidden absolute left-[10%] md:left-[25%] top-[10%] w-[80%] md:w-[50%] max-h-max shadow-gray-400 shadow-lg bg-white/80 backdrop-blur-lg rounded-[20px] px-4 py-4'>
      <p className='absolute right-5  border-2 border-black px-2 rounded-full top-2 shadow-lg shadow-white/20 font-bold cursor-pointer  ' onClick={close} >X</p>
        <form onSubmit={handleSubmit} >
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
      </div>
    </>
  );
};

export default CreateNewTask;
