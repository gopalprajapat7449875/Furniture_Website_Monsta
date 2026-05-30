'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function resetpage() {


  let { id } = useParams('')
  console.log(id)





  let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL


  let handleSubmit = (e) => {
  e.preventDefault()

    let _NewPassword = e.target._NewPassword.value

    let confirmPassword = e.target.confirmPassword.value

    let data = {

      _NewPassword: _NewPassword
    }

    if (_NewPassword === confirmPassword) {



      axios.post(`${apibaseurl}user/reset-password/${id}`, data)
        .then((res) => res.data)
        .then((finalres) => {

          if (finalres._status) {
            toast.success(finalres._message)
            e.target.reset()
          }

        })






    }


    else {
      toast.error("New password and confirm password do not match");
    }


  };


  // 👉 yaha apni API call lagao
  // const res = await fetch('/api/reset-password', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(form)
  // })

  // demo success


return (
  <>
    <ToastContainer />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="_NewPassword"


              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"


              placeholder="Confirm password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>



          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Reset Password
          </button>

        </form>
      </div>
    </div>

  </>
)
}
