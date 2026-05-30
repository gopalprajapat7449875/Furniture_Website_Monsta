"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
export default function My_Order() {
     const token = Cookies.get("token");
  let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL
     const [orderdata, setorderdata] = useState([])
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
console.log(finalres.orderres)
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

      <div className=" max-w-[1200px] mx-auto text-center ">

  
 <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-slideUp">


          {/* Dummy Orders */}
          <div className="space-y-4">

            {orderdata?.map((item, i) => (
              <div
                key={item}
                className="border rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium">OrderId :  {item._OrderID}</p>
                  <p className="text-sm text-gray-500">Placed on : {new Date(item._OrderDate).toLocaleString("en-IN", options)}   </p>
                </div>
                   <div>
                  
                  <p className="text-sm text-gray-500"> Order-Delivery-Date: {new Date(item._OrderDileverDate).toLocaleString("en-IN", options)}   </p>
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
