import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ContextProvider from '../context/ContextProvider';
import { useScroll } from 'framer-motion';
const Home = (props) => {
  const navigate = useNavigate();
  const context = useContext(ContextProvider);
  const { username, taskList, error, getTaskList } = context;
  const [checkbox,setCheckbox] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      props.handleAlert('First you have to sign in this application', 'warning');
      navigate('/signin');
    } else {
      getTaskList();
    }
  }, [navigate, props]);

  useEffect(()=>{

  },[taskList,getTaskList]);

  const handleCheckbox = () => {

  }
  return (
    <>

      <div className='w-screen h-screen  flex flex-col items-center  '   >
        <h1 className='text-3xl mt-10 font-bold  ' >Welcome! <span className='font-semibold text-purple-800' > {username || "User"}</span></h1>
        <p className='text-xl font-medium text-gray-400 my-4 ' >List of your tasks.</p>

        <div className='grid grid-cols-3 w-[90%] mt-10 gap-14 bg-green-300 ' >
          {taskList && taskList.map((value,index)=>{
            return(
              <div key={value+index} className='bg-red-300 w-full px-4 py-2 rounded-[20px] ' >
            <div className='flex items-center justify-between  ' >
              <h1 className='text-3xl font-bold  ' >{value.title}</h1>
              <input type="checkbox"
                className='h-6 w-6  '
                checked={value.status}
                value={checkbox}
                onChange={handleCheckbox}
              />
            </div>
            <hr />
            <p className={`text-xl font-medium ${value.status && "line-through text-green-500 "} `} > {value.description} </p>
          </div> 

            )
          }) }
          

        </div>


      </div>

    </>
  )
}

export default Home;
