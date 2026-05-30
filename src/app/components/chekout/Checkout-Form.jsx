'use client'

import { setToken } from '@/app/reduxwork/UserSlice'
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

export default function CheckoutForm() {
  let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL
let dispatch=useDispatch()

  let Loginruser=(e)=>{
       e.preventDefault()
        let data = {
   
        _UserEmail: e.target._UserEmail.value,
        _UserPassword: e.target._UserPassword.value,
      }
      axios.post(`${apibaseurl}user/login`, data)
        .then((res) => res.data)
        .then((finalres) => {
       
          if (finalres._status) {
            toast.success(finalres._Message)
            
             dispatch(setToken(finalres.token) )
            redirect('/login-user')
          }
          else if(finalres._status===false){
              toast.error(finalres._Message)
          }
          else{
             finalres.erre.forEach((item) => {
              Object.values(item).forEach((msg) => {
                toast.error(msg);
              });
            });
          }
          

          
        })

  }
  let Resisteruser = (e) => {
    e.preventDefault()
    let password = e.target._UserPassword.value
    let cunfurm = e.target.confurm_Password.value
    if (password == cunfurm) {
      let data = {
        _UserName: e.target._UserName.value,
        _UserPhoneNumber: e.target._UserPhoneNumber.value,
        _UserEmail: e.target._UserEmail.value,
        _UserPassword: e.target._UserPassword.value,
      }

      axios.post(`${apibaseurl}user/create`, data)
        .then((res) => res.data)
        .then((finalres) => {
       
          if (finalres._status) {
            toast.success(finalres._Message)
          }
          else{
             finalres.erre.forEach((item) => {
              Object.values(item).forEach((msg) => {
                toast.error(msg);
              });
            });
          }
          

          
        })
        



    }
    else {
      toast.error('Confurm password is not match...')
    }

  }
  return (
    <>
      <ToastContainer />
      <div className=" max-w-[1200px] mt-10 mx-auto  ">
        <div className="w-full grid md:grid-cols-2 gap-6">

          {/* LOGIN */}
          <div className="bg-white rounded-lg border-1 border-neutral-200  p-6">
            <h2 className="text-3xl font-serif mb-6">Login</h2>

            <form action='submit' onSubmit={Loginruser} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  name='_UserEmail'
                  required
                  placeholder="Email Address"
                  className="w-full border-1 border-neutral-200 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Password *
                </label>
                <input
                required
                  type="password"
                  name='_UserPassword'
                  placeholder="Password"
                  className="w-full  border-1 border-neutral-200 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>

              <div className="flex justify-between items-center  pt-2">
               <Link href={'/forgot-password'}> <span className="text-sm text-yellow-700 cursor-pointer">
                  Forget your password?
                </span>
                </Link>
                

                <button type='submit' className="bg-yellow-600 duration-300 cursor-pointer text-[12px] font-semibold text-white px-6 py-2 rounded-full hover:bg-neutral-800">
                  LOGIN
                </button>
              </div>
            </form>
          </div>

          {/* REGISTER */}


          <div className="bg-white rounded-lg border-1 border-neutral-200 p-6">
            <h2 className="text-3xl font-serif mb-6">Register</h2>

            <form action='submit' onSubmit={Resisteruser} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Name *
                </label>
                <input
                required
                  type="text"
                  placeholder="Enter Name"
                  name='_UserName'
                  className="w-full  border-1 border-neutral-200  rounded px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Phone Number *
                </label>
                <input
                required
                  type="text"
                  name='_UserPhoneNumber'
                  placeholder="Enter Phone Number"
                  className="w-full  border-1 border-neutral-200  rounded px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Email address *
                </label>
                <input
                required
                  type="email"
                  name='_UserEmail'
                  placeholder="Email Address"
                  className="w-full  border-1 border-neutral-200  rounded px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Password *
                </label>
                <input
                required
                  type="password"
                  name='_UserPassword'
                  placeholder="Password"
                  className="w-full  border-1 border-neutral-200  rounded px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Confurm Password *
                </label>
                <input
                required
                  type="password"
                  name='confurm_Password'
                  placeholder="cunfurm Password"
                  className="w-full  border-1 border-neutral-200  rounded px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button type='submit' className="bg-yellow-600 duration-300 cursor-pointer text-[12px] font-semibold text-white px-6 py-2 rounded-full hover:bg-neutral-800">
                  REGISTER
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}
