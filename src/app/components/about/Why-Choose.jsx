'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function WhyChoose() {


    const [data, setdata] = useState(null)



    let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL



    let whychoose = () => {
        axios.get(`${apibaseurl}home/whychoose`)
            .then((res) => res.data)
            .then((finalres) => {
                setdata(finalres.whychooseres)
            })

    }
    useEffect(() => {
        whychoose()
    }, [])
    return (
        <>
            <div className=" max-w-[1200px] mx-auto text-center ">
                <div className='text-center py-3'>
                    <h2 className='text-2xl font-serif font-semibold'>Why chose us?</h2>

                    <div className='grid pt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>


                        {data?.map((item, i) => (
                            <div className='text-center py-4 px-6'>
                                <img className='mx-auto ' src={item._image} alt='89df96b6-b70d-463b-affb' />
                                <h6 className='text-[15px] font-serif pt-2'>
                                    {item._WhyChooseTital}

                                </h6>
                                <p className='text-[12px] text-neutral-600 pt-2 '>
                                    {item._WhyChooseDiscription}
                                </p>
                            </div>

                        ))}


                    </div>

                </div>
            </div>
        </>
    )
}
