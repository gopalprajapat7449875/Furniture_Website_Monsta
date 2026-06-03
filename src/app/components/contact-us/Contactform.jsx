"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import { AddContect } from '@/app/reduxwork/EnqurySlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

export default function Contactform() {


  let dispatch = useDispatch()
  const token = Cookies.get("token");


  let AddContectData = (e) => {
    e.preventDefault()

    let data = {
      _Name: e.target._Name.value,
      _Email: e.target._Email.value,
      _Subject: e.target._Subject.value,

      _Phone: e.target._Phone.value,
      _Message: e.target._Message.value,
    }
    if (token) {


      dispatch(AddContect(data))
      e.target.reset()
    }
    else {
    
      toast("Please Login first")
      setTimeout(() => {
        redirect('/login-register')
      }, [3000])


    }


  }
  const [data, setdata] = useState(null)
  const [path, setpath] = useState("")




  let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL



  let Componydata = () => {
    axios.get(`${apibaseurl}home/compony`)
      .then((res) => res.data)
      .then((finalres) => {
        setdata(finalres.componydata[0])

      })

  }
  useEffect(() => {
    Componydata()
  }, [])

  return (
    <>
      <div className=" max-w-[1200px] mx-auto  py-5 grid sm:grid-cols-1 md:grid-cols-2">

        <div className='pt-4 px-2'>
          <h5 className='text-xl py-3 border-b border-neutral-200 font-semibold font-serif '>
            Contact Us
          </h5>
          <p className='text-[13px]  border-b border-neutral-200  text-neutral-700 py-3'>Address:  {data?._ComponyFullAddrese}  </p>
          <p className='text-[13px]  border-b border-neutral-200  text-neutral-700 py-3'  >Phone: <a className='hover:text-yellow-600 cursor-pointer' href={"tel:" + data?._ComponyPhoneNumber}>{data?._ComponyPhoneNumber} </a> </p>
          <p className='text-[13px]   text-neutral-700 py-3'>Email: {data?._ComponyEmail} </p>

        </div>

        <div className='pt-4 px-2'>

          <h5 className='text-xl py-3  font-semibold font-serif '>
            Tell us your question

          </h5>
          <form onSubmit={AddContectData} className="my-2 text-[12px]  ">

            {/* Name */}
            <div className='py-4'>
              <label className="block font-semibold mb-2">
                Your Name (required)
              </label>
              <input
                name='_Name'
                type="text"
                placeholder="Name *"
                className="w-full border border-gray-300  px-4 py-3 rounded outline-none focus:border-black"
              />
            </div>

            {/* Email */}
            <div className='py-4'>
              <label className="block font-semibold mb-2">
                Your Email (required)
              </label>
              <input
                name='_Email'
                type="email"
                placeholder="Email *"
                className="w-full border border-gray-300 px-4 py-3 rounded outline-none focus:border-black"
              />
            </div>

            {/* Mobile */}
            <div className='py-4'>
              <label className="block font-semibold mb-2">
                Your Mobile Number (required)
              </label>
              <input
                name='_Phone'
                type="tel"
                placeholder="Mobile Number *"
                className="w-full border border-gray-300  px-4 py-3 rounded outline-none focus:border-black"
              />
            </div>

            {/* Subject */}
            <div className='py-4'>
              <label className="block font-semibold mb-2">
                Subject
              </label>
              <input
                name='_Subject'
                type="text"
                placeholder="Subject *"
                className="w-full border border-gray-300  px-4 py-3 rounded outline-none focus:border-black"
              />
            </div>

            {/* Message */}
            <div className='py-4'>
              <label className="block font-semibold mb-2">
                Your Message
              </label>
              <textarea
                name='_Message'
                rows="6"
                placeholder="Message *"
                className="w-full border border-gray-300  px-4 py-3 rounded outline-none focus:border-black"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-neutral-800 text-[14px] rounded hover:bg-yellow-600 cursor-pointer text-white px-6 py-2 hover:bg-gray-800 transition"
            >
              Send
            </button>

          </form>
        </div>
      </div>
    </>
  )
}
