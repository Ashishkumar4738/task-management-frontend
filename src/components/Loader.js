import React from 'react'

const Loader = ({className}) => {
  return (
      <div className='w-screen h-screen relative overflow-hidden' >
        <div className={`absolute w-screen h-screen bg-white/60 blur-[20px] backdrop-blur-sm z-10 `} />
        <div className={`loader ${className}  `}  />
        </div>
  )
}

export default Loader;
