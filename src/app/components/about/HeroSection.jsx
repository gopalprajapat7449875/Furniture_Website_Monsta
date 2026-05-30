"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GrFormNext } from 'react-icons/gr'

export default function HeroSection() {
    const [data, setdata] = useState(null)
    const [path, setpath] = useState("")
console.log(data)


    let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL



    let aboutdaat = () => {
        axios.get(`${apibaseurl}home/about`)
            .then((res) => res.data)
            .then((finalres) => {
                setdata(finalres.about)
                setpath(finalres._path)
            })

    }
    useEffect(() => {
        aboutdaat()
    }, [])


    return (
        <>
            <div className=" max-w-[1200px] mx-auto text-center ">

                <div className=' py-10 border-b border-neutral-200'>
                    <h1 className=' sm:text-[25px] md:text-[33px]  font-semibold font-serif'>
                        About Us

                    </h1>
                    <p className='flex items-center justify-center  gap-1'>
                        <span className='hover:text-yellow-600'>
                            <Link href={'/'} >Home  </Link>
                        </span><span className='flex items-center
                text-yellow-600 gap-1'> <GrFormNext /> About Us </span>
                    </p>
                </div>

                <div className='pt-8 pb-3'>
                    <img src={path+data?._AboutHero} alt='about-hero' />
                </div>
            </div>

        </>
    )
}
