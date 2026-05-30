'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function ForgetPassword() {

  const [method, setMethod] = useState("email")
   let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL

  const handleSubmit = (e) => {
    e.preventDefault()
let _UserEmail= e.target._UserEmail.value
    let Email = {
   
        _UserEmail: e.target._UserEmail.value,
       
      } 
   if(_UserEmail===''){
    toast.error('Please Fill the Email')
   }
   else{
   axios.post(`${apibaseurl}user/forgot-password`, Email)
        .then((res) => res.data)
        .then((finalres) => {
       
          if (finalres._status) {
            toast.success(finalres._Message)
           e.target.reset()
          }
          else{
            toast.error(finalres._Message)
          }
          

          
        })

   }

   
  }

  return (

    <>
   
    <ToastContainer/>
    <div className=" mt-8 flex items-center justify-center  px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 md:p-8">

        

        {/* Toggle Buttons */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setMethod("email")}
            className={`w-1/2 py-2 rounded-lg font-medium transition ${
              method === "email"
                ? "bg-yellow-600 text-white"
                : "text-gray-600"
            }`}
          >
            Email
          </button>

          <button
            onClick={() => setMethod("phone")}
            className={`w-1/2 py-2 rounded-lg font-medium transition ${
              method === "phone"
                ? "bg-yellow-600 text-white"
                : "text-gray-600"
            }`}
          >
            Phone
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {method === "email" ? (
            <input
              type="email"
              placeholder="Enter your email"
             name='_UserEmail'
              
              className="w-full px-4 py-3  rounded-lg outline-none focus:ring-2 focus:ring-yellow-600"
            />
          ) : (
            <input
              type="tel"
              placeholder="Enter your phone number"
         
            
              className="w-full px-4 py-3  rounded-lg outline-none focus:ring-2 focus:ring-yellow-600"
            />
          )}

          <button
            type="submit"
            className="w-full bg-bg-yellow-600 bg-yellow-600 hover:bg-neutral-700 font-bold text-white py-3 rounded-lg font-semibold transition"
          >

            {method==='email' ?' Send Link':'Send OPT'}
           
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Remember password?

          <Link href={'/checkout'}>
          <span className="text-bg-yellow-600 hover:text-yellow-600 cursor-pointer">
            Login
          </span>
          </Link>
        </p>

      </div>
    </div>
     </>
  )
}
