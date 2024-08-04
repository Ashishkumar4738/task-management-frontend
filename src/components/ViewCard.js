import React from 'react';

const ViewCard = (props) => {
  
  const close = ()=>{
    props.setView(null);
  }

  return (
    <>
      <div className='absolute left-[5%] md:left-[25%] top-[10%] w-[90%] md:w-[50%] max-h-max shadow-gray-400 shadow-lg bg-white/80 backdrop-blur-lg rounded-[20px] px-4 py-4'>
      <p className='absolute right-10  border-2 border-black px-2 rounded-full top-6  shadow-lg shadow-white/20 font-bold cursor-pointer  ' onClick={close} >X</p>
       
          <h1 className='text-xl md:text-3xl font-medium my-3 underline  ' >{props.task.title[0].toUpperCase()+ props.task.title.slice(1)}</h1>
          <p className='text-pretty text-base mb-2 border-y-2 py-2 ' > <span className='text-lg font-semibold' >Description:-</span> {props.task.description} </p>
          <div className='flex justify-between' >
          <p> {props.task.dueStatus} </p>
          <p> {props.task.status===true?"Completed":"Not completed"} </p>
          </div>

      </div>
    </>
  );
};

export default ViewCard;
