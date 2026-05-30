'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { GrFormNext } from 'react-icons/gr'

export default function DetailHeading({ProductDetails}) {
    const [data, setdata] = useState(ProductDetails.productres)
    console.log(data)
    return (
        <>
            <div className=" max-w-[1200px] mx-auto  text-center ">

                <div className=' py-10 border-b border-neutral-200'>
                       <h1 className=' sm:text-[25px] md:text-[33px]  font-semibold font-serif'>
                   {data?._ProductName}

                    </h1>
                    <p className='flex items-center justify-center text-[14px]  gap-1'>
                        <span className='hover:text-yellow-600'>
                            <Link href={'/'} >Home  </Link>
                        </span>
                        <span className='hover:text-yellow-600 flex items-center'>
                           <GrFormNext />  <Link href={'/slug'} > {data?._SubCategory?._SubCategoryName}  </Link>
                        </span>

                        <span className='flex items-center
                            text-yellow-600 gap-1'> <GrFormNext />{data?._ProductName} </span>
                    </p>
                </div>




            </div>
        </>
    )
}
