import Link from 'next/link'
import React from 'react'
import { GrFormNext } from 'react-icons/gr'

export default function ContactHeading() {
    return (
        <>
            <div className=" max-w-[1200px] mx-auto text-center ">

                <div className=' py-10 border-b border-neutral-200'>
                     <h1 className=' sm:text-[25px] md:text-[33px]  font-semibold font-serif'>
                      Contact Us


                    </h1>
                    <p className='flex items-center justify-center  gap-1'>
                        <span className='hover:text-yellow-600'>
                            <Link href={'/'} >Home  </Link>
                            </span><span className='flex items-center
                    text-yellow-600 gap-1'> <GrFormNext /> Contact Us </span>
                    </p>
                </div>
            </div>

        </>
    )
}
