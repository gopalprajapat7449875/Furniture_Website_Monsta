'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ProfilePage() {
  const [full, setfull] = useState(false)
  const [path, setpath] = useState('')
  let data = useSelector((state) => state.userStore.userdata)
  let pathu = useSelector((state) => state.userStore.userpath)

  useEffect(() => {
    setpath(pathu)
  }, [pathu])


  return (
    <div className=" bg-gray-100 relative p-4 md:p-8">



      <div className={`  ${full?'flex duration-300 rounded-2xl':'hidden' }  flex justify-center w-[90%] overflow-x-hidden   absolute z-9 `}>

<div  onClick={()=>setfull(false)}  className='text-red-800 text-2xl absolute cursor-pointer font-bold'> X</div>
        <img className='w-110 rounded h-150 overflow-x-hidden' src={data?._ProfilePic} alt={data?._ProfilePic} />


      </div>

      <div className="max-w-6xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fadeIn">

          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* Profile Image */}
            <div      className="relative">


              <img
                src={data?._ProfilePic}
                alt="profile"
              onClick={()=>setfull(true)} 
                className="w-28 h-28 rounded-full object-cover border-4 border-yellow-500"
          
              />
            </div>

            {/* User Info */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">{data?._UserName.toUpperCase()}</h2>
              <p className="text-gray-500">{data?._UserEmail}</p>
            </div>

          </div>
        </div>



      </div>
    </div>
  )
}