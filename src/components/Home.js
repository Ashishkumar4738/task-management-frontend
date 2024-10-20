import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContextProvider from '../context/ContextProvider';
import UpdateForm from './UpdateForm';
import ViewCard from './ViewCard';
import CreateNewTask from './CreateNewTask';
import Loader from './Loader';
import { DeleteIcon, EditIcon, ViewIcon } from './Icons';
import { motion } from 'framer-motion';
const Home = (props) => {
  const navigate = useNavigate();
  const context = useContext(ContextProvider);
  const { username, taskList, getTaskList, handleDelete, loading } = context;
  const [selectedTask, setSelectedTask] = useState(null);
  const [view, setView] = useState(null);
  const [visible, setVisible] = useState(false);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      props.handleAlert('First you have to sign in this application', 'warning');
      navigate('/signin');
    } else {
      getTaskList();
    }
  }, [navigate, props, getTaskList]); // Include getTaskList in the dependency array


  const updateTask = (task) => {
    setSelectedTask(task);
  }

  const deleteTask = (taskid) => {
    handleDelete(taskid)
      .then(() => {
        props.handleAlert("List deleted successfully", "success");
      })
      .catch(() => {
        props.handleAlert("Not able to delete task", "error");
      });
  }

  const handleView = (task) => {
    setView(task);
  }

  const handleVisible = () => {
    setVisible(!visible);
  }

  const handleCreate = () => {
    setCreate(true);
  }

  const calculateRemainingTime = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days left` : `${days} days passed`;
  }

  return (
    <>
      {loading && <Loader className={"z-10 top-[50%] left-[50%] "} />}
      <div className='absolute top-0 z-0 w-screen h-screen flex flex-col items-center'>
        <h1 className='text-2xl md:text-3xl mt-10 font-bold'>Welcome! <span className='font-semibold text-purple-800'>{username || "User"}</span></h1>
        <p className='text-md sm:text-lg font-medium text-gray-400 my-4'>List of your tasks.</p>

        <motion.button
          whileTap={{ scale: 0.8 }}
          className='absolute right-5 md:right-20 md:top-10 top-20 font-medium shadow-2xl shadow-purple-400 border-2 border-black px-3 py-1 rounded-[50px] text-xs md:text-sm w-min md:w-max  md:rounded-lg'>
          <motion.div
            whileHover={{ scale: 1.1 }}

          >
            <Link to="/logout"  >Log out</Link>
          </motion.div>
        </motion.button>

        <div className='absolute w-1/2 h-1/2 rounded-full bg-purple-400/40 blur-[120px] backdrop-blur-[120px] -z-10' />

        <p className={`absolute bottom-32 right-20 invisible ${visible && "visible"}`}>Add new task</p>
        <motion.button

          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className='fixed bottom-5 right-5 md:bottom-20 md:right-24 text-4xl border-4 border-black rounded-full px-3 font-bold bg-purple pb-2 bg-purple-400/60 text-black shadow-lg shadow-black z-10  ' onMouseEnter={handleVisible} onMouseOut={handleVisible} onClick={handleCreate}>+</motion.button>



        <div className='grid  sm:grid-cols-2 lg:grid-cols-3 w-[90%] mt-10 gap-14  '>
          {taskList && taskList.map((value, index) => (
            <div key={index} className='bg-white/60 backdrop-blur-2xl w-full px-4 py-2 h-min rounded-[20px] shadow-xl'>
              <div className='relative flex flex-wrap justify-between items-center w-full h-min '>
                <h1 className='text-lg md:text-3xl font-bold'>{value.title}</h1>
                <div className='flex gap-2 flex-row-reverse   '>
                  <motion.p
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className=' font-light md:font-normal underline underline-offset-2  cursor-pointer  ' onClick={() => handleView(value)}>
                    <ViewIcon />
                  </motion.p>
                  <div className='border-r-2 border-black pr-2 ' >
                    <motion.p
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      className='font-light md:font-normal underline underline-offset-2 cursor-pointer' onClick={() => updateTask(value)}>
                      <EditIcon />

                    </motion.p>
                  </div>
                  <div className='border-r-2 border-black pr-2 ' >
                    <motion.p
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      className='font-light md:font-normal underline underline-offset-2 cursor-pointer' onClick={() => deleteTask(value._id)}>

                      <DeleteIcon />

                    </motion.p>
                  </div>
                </div>
              </div>
              <hr />
              <p className={`text-xs sm:text-sm md:text-xl font-medium py-4 ${value.status && "line-through text-green-500"}`}>{value.description.length < 100 ? value.description : value.description.slice(0, 50) + "...."}</p>
              <hr />
              <div className='flex justify-between'>
                <p>{calculateRemainingTime(value.dueStatus)}</p>
                <p>{value.status ? "Completed" : "Not completed"}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedTask && <UpdateForm task={selectedTask} handleAlert={props.handleAlert} setSelectedTask={setSelectedTask} />}
        {view && <ViewCard task={view} setView={setView} />}
        {create && <CreateNewTask setCreate={setCreate} handleAlert={props.handleAlert} />}
      </div>
    </>
  )
}

export default Home;
