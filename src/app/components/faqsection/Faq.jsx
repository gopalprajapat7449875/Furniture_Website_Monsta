'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { TiMinus } from "react-icons/ti";

export default function Faq() {
    let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL
    const [Faqopen, setFaqopen] = useState(0)

    const [data, setdata] = useState()
    console.log(data)
    let faqfulldata = () => {
        return axios.get(`${apibaseurl}home/faq`)
            .then((res) => res.data)
            .then((finalres) => {
                setdata(finalres.Faqres)
            })
    }

    useEffect(() => {
        faqfulldata()
    }, [])
   

    let Toggle = (index) => {
        setFaqopen(Faqopen === index ? null : index)
    }


    return (
        <>
            <div className=" max-w-[1200px] mx-auto text-center ">

                {data?.map((value, index) => (
                    <div key={index} className={`bg-neutral-100    ${Faqopen === index ? ' border-1 border-yellow-600' : ' '}    my-3  hover:cursor-pointer `}>
                        <div className={`flex px-4 hover:text-yellow-600 rounded-xl justify-between item-center   ${Faqopen === index ? 'text-yellow-600' : 'text-neutral-900 '}  py-3 duration-300 ease-in-out  hover:cursor-pointer`} onClick={() => Toggle(index)} >

                            <h4 className=' text-[12px]   font-serif font-semibold'>{value._FaqQuestion}</h4>

                            {Faqopen === index ? (
                                <span >
                                    <TiMinus className='text-[13px] ' />



                                </span>
                            ) : <span >
                                <FaPlus className='text-[11px] ' />
                            </span>}

                        </div>
                        <div
                            className={`overflow-hidden transition-all duration-400 ease-in-out
                        ${Faqopen === index ? 'max-h-40' : 'max-h-0'}`}
                        >
                            <p className='text-neutral-500 px-4  border-t border-yellow-600  bg-white text-left py-2 text-[12px]'>
                                {value._FaqAnswer}
                            </p>
                        </div>

                    </div>
                ))}


            </div>
        </>
    )
}
