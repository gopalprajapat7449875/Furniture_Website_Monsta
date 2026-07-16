"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Welcome() {
    const [data, setdata] = useState(null)



    let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL



    let aboutdaat = () => {
        axios.get(`${apibaseurl}home/about`)
            .then((res) => res.data)
            .then((finalres) => {
                setdata(finalres.about)
              
            })

    }
    useEffect(() => {
        aboutdaat()
    }, [])
    return (
        <>
            <div className=" max-w-[1200px] mx-auto text-center  ">
                <div className='text-center py-3'>
                    <h2 className='text-2xl font-serif font-semibold'>Welcome to Monsta!</h2>
                    <p className='text-[13px] text-neutral-600 leading-6 py-3'>
                       {data?._AboutDiscription}
                    </p>
                    <span className='text-yellow-600 text-[14px]'>
                        “There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”

                    </span>
                </div>
            </div>

        </>

    )
}
