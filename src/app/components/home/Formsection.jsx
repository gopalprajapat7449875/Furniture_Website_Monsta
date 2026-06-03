"use client"
import React from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify';
import { AddNewsletter } from '@/app/reduxwork/EnqurySlice';
import { redirect } from 'next/navigation';
export default function Formsection() {
let dispatch =useDispatch()
const token = Cookies.get("token");

let Addnews=(e)=>{
e.preventDefault()
let data={
    _Email:e.target._Email.value
}

if(token){


    dispatch(AddNewsletter(data))
    e.target.reset()
}
else{
toast("Please Login first")
 setTimeout(() => {
        redirect('/login-register')
      }, [3000])

}


}


    return (
        <>
        <ToastContainer/>
            <div className=' bg-neutral-100 py-8 border-b-neutral-200 flex flex-col items-center justify-items-center '>
                <h4 className='text-[22px] font-semibold font-serif py-4'>
                    Our Newsletter
                </h4>


                <p className='text-[14px] text-neutral-500 pb-5'>
                    Get E-mail updates about our latest shop and special offers.
                </p>

                <form onSubmit={Addnews}>
                <div className='flex items-center py-7'>
                    <input name='_Email' className='text-[12px] outline-none py-2.5 px-5 sm:w-70 md:w-100 lg:w-120 rounded-l border-l-2 border-y-2  border-neutral-400' type='Email' placeholder='Enter Email...' required />
                    <button type='submit' className='py-2.5 sm:px-8 md:px-13 outline-none bg-yellow-600 hover:bg-yellow-900 cursor-pointer text-[14px] text-white font-semibold rounded-r'>
                        Subscribe
                    </button>
                </div>
                </form>
            </div>
        </>
    )
}
