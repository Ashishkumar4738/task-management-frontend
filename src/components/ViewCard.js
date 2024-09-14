import React from 'react';
import { motion } from 'framer-motion';
const ViewCard = (props) => {
  
  const close = ()=>{
    props.setView(null);
  }
  const hidden = {
    y:-200,
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
      <motion.div
      initial={hidden}
      animate={visible}
      className='absolute left-[5%] md:left-[25%] top-[10%] w-[90%] md:w-[50%] max-h-max shadow-gray-400 shadow-lg bg-white/80 backdrop-blur-lg rounded-[20px] px-4 py-4'>
      <p className='absolute right-10  border-2 border-black px-2 rounded-full top-6  shadow-lg shadow-white/20 font-bold cursor-pointer  ' onClick={close} >X</p>
       
          <h1 className='text-xl md:text-3xl font-medium my-3 underline  ' >{props.task.title[0].toUpperCase()+ props.task.title.slice(1)}</h1>
          <p className='text-pretty text-base mb-2 border-y-2 py-2 ' > <span className='text-lg font-semibold' >Description:-</span> {props.task.description} </p>
          <div className='flex justify-between' >
          <p> {props.task.dueStatus} </p>
          <p> {props.task.status===true?"Completed":"Not completed"} </p>
          </div>

      </motion.div>
    </>
  );
};

export default ViewCard;
