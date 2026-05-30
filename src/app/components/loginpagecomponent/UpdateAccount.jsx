


'use client'
import { store } from '@/app/reduxwork/Store'
import { logOut, Userdata, UserPath } from '@/app/reduxwork/UserSlice'
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import Cookies from 'js-cookie'
export default function UpdateAccount() {
  const [open, setopen] = useState(false)
  const [user, setUser] = useState(null)
  const [orderdata, setorderdata] = useState([])
 
  let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL

  let logout = useDispatch()
  let dispatch = useDispatch()

 

  let token = Cookies.get('token')

useEffect(() => {
    dispatch(Userdata(user))
  }, [token])


  let UserData = () => {
    axios.post(`${apibaseurl}user/user-data`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((res) => res.data)
      .then((finalres) => {

        setUser(finalres.userData)
        dispatch(UserPath(finalres._path))





      })
  }
  let HendelLogout = () => {
    logout(logOut())
    redirect('/')
  }



  useEffect(() => {
    UserData()
  }, [token])



  const handleUpdate = (e) => {
    e.preventDefault()
    let data = new FormData(e.target)
    axios.post(`${apibaseurl}user/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((res) => res.data)
      .then((finalres) => {
        toast.success(finalres._message)
        UserData()


      })
  }

  useEffect(() => {
    axios.post(`${apibaseurl}order/show-order`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((res) => res.data)
      .then((finalres) => {
        
        setorderdata(finalres.orderres)


      })
  }, [token])


  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  };

  return (
    <>


      <ToastContainer />



      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 py-2">



        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Sidebar */}
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="font-semibold text-lg mb-4">Dashboard</h2>

            <ul className="space-y-3 text-gray-600">
              <li className="text-yellow-600 cursor-pointer ">Profile</li>
              <Link href={'my_order'} > <li className="hover:text-yellow-600 cursor-pointer "> My Order </li>
              </Link>
              <Link href={'my-wishlist'} > <li className="hover:text-yellow-600 cursor-pointer pt-2">Wishlist</li>
              </Link>


              <li onClick={HendelLogout} className="hover:text-red-500 cursor-pointer pt-2">Logout</li>
              <Link href={'changepassword'} > <li className="hover:text-yellow-600 cursor-pointer">Change Password</li>
              </Link>


            </ul>
          </div>

          {/* Form Section */}

          <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-xl shadow-md">
            <form onSubmit={handleUpdate} action="submit" >
              <h2 className="text-xl font-semibold mb-6">Profile Details</h2>



              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input name="_UserName" defaultValue={user?._UserName} placeholder="Full Name" className=" outline-none bg-amber-50 focus:border-2 border-yellow-600 py-1 px-1 rounded" />
                <input type='email' name="_UserEmail" readOnly defaultValue={user?._UserEmail} placeholder="Email" className=" outline-none bg-amber-50 focus:border-2 border-yellow-600 py-1 px-1 rounded" />

                <input name="_UserPhoneNumber" readOnly defaultValue={user?._UserPhoneNumber} placeholder="Phone Number" className=" outline-none bg-amber-50 focus:border-2 border-yellow-600 py-1 px-1 rounded" />
                <input name="_UserCity" defaultValue={user?._UserCity} placeholder="City" className=" outline-none bg-amber-50 focus:border-2 border-yellow-600 py-1 px-1 rounded" />

                <input name="_UserState" defaultValue={user?._UserState} placeholder="State" className=" outline-none bg-amber-50 focus:border-2 border-yellow-600 py-1 px-1 rounded" />
                <input name="_UserPinCode" defaultValue={user?._UserPinCode} placeholder="Pincode" className=" outline-none bg-amber-50 focus:border-2 border-yellow-600 py-1 px-1 rounded" />

                <input name="_UserCountry" defaultValue={user?._UserCountry
                } placeholder="Country" className=" outline-none bg-amber-50 focus:border-2 border-yellow-600 py-1 px-1 rounded" />
                <input name="_UserAddress" defaultValue={user?._UserAddress} placeholder="Address" className="outline-none bg-amber-50 focus:border-2 border-yellow-600 py-1 px-1 rounded md:col-span-2" />


                <div className='w-50 h-20 bg-amber-50 hover:border-2 border-yellow-600 py-1 px-1 rounded md:col-span-2'>
                  <input type='file' name="_ProfilePic" className="outline-none w-full h-full  py-1 px-1 rounded md:col-span-2" />

                </div>



              </div>


              {/* Button */}
              <div className="mt-6 flex justify-center md:justify-end">
                <button
                  type='submit'
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition w-full md:w-auto"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>


        </div>
        {/* Orders Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-slideUp">

          <h3 className="text-xl font-semibold mb-6">My Orders</h3>

          {/* Dummy Orders */}
          <div className="space-y-4">

            {orderdata?.map((item, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium">OrderId :  {item._OrderID}</p>
                  <p className="text-sm text-gray-500">Placed on : {new Date(item._OrderDate).toLocaleString("en-IN", options)}   </p>
                </div>

                <div className="mt-2 md:mt-0">

                  {item._OrderStatus == "process" && (<span className="bg-orange-300 font-bold text-yellow-700 px-3 py-1 rounded-full text-sm">
                    process
                  </span>) || item._OrderStatus == "Dileverd" && (<span className="bg-green-100 font-bold text-green-600 px-3 py-1 rounded-full text-sm">
                    Delivered
                  </span>) || item._OrderStatus == "Cancle" && (<span className="bg-orange-300 font-bold text-red-600 px-3 py-1 rounded-full text-sm">
                    Cancle
                  </span>)}



                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  )
}
