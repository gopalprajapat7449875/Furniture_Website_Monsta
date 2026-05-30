import React from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { IoEarthSharp } from 'react-icons/io5'
import { MdOutlineWatchLater } from 'react-icons/md'

export default function Support() {
  return (
    <>

      <div className=' bg-neutral-100 py-5 my-4'>

        <div className=' max-w-[1200px] py-10 mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

          <div className='flex flex-col justify-center  items-center group'>
            <div className='w-16 h-16 border-neutral-800 rounded-[50%] flex border-2 justify-around  text-neutral-500  items-center group-hover:border-yellow-600 group-hover:text-yellow-600 duration-500 '>
              <IoEarthSharp className='text-xl ' />

            </div>
            <h4 className='font-serif py-4 text-[19px] font-semibold text-neutral-800'>
              Free Shipping

            </h4>
            <p className='text-[15px] text-neutral-600'>
              Free shipping on all order


            </p>
          </div>
          <div className='flex flex-col justify-center  items-center group'>
            <div className='w-16 h-16 border-neutral-800 rounded-[50%] flex border-2 justify-around  text-neutral-500  items-center group-hover:border-yellow-600 group-hover:text-yellow-600 duration-500 '>
              <IoMdCheckmarkCircleOutline className='text-xl' />


            </div>
            <h4 className='font-serif py-4 text-[19px] font-semibold text-neutral-800'>
              Money Return


            </h4>
            <p className='text-[15px] text-neutral-600'>
              Back guarantee under 7 days




            </p>
          </div>
          <div className='flex flex-col justify-center  items-center group'>
            <div className='w-16 h-16 border-neutral-800 rounded-[50%] flex border-2 justify-around  text-neutral-500  items-center group-hover:border-yellow-600 group-hover:text-yellow-600 duration-500 '>
              <MdOutlineWatchLater className='text-xl ' />

            </div>
            <h4 className='font-serif py-4 text-[19px] font-semibold text-neutral-800'>
              Online Support


            </h4>
            <p className='text-[15px] text-neutral-600'>
              Support online 24 hours a day




            </p>
          </div>

        </div>
      </div>

    </>

  )
}
