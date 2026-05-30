import Link from 'next/link'
import React from 'react'

export default function TrandingColaction() {
  return (
    <>
      <div className='h-120 my-6 bg-[url(/midelimage.jpg)] bg-no-repeat scroll bg-center bg-cover'>
        <div className='font-serif max-w-[1200px] mx-auto ps-20 pt-20 group'>
          <div className=' p-4 duration-450 ease-in-out  origin-center group-hover:scale-106'>
            <h1 className='text-[42px] text-neutral-800 font-semibold py-2 '>
              New Trending Collection

            </h1>
            <p className='text-[15px] text-neutral-500 font-medium'>
              We Believe That Good Design is Always in Season

            </p>
     <Link href={`/product/category/collection`}>

              <button className=' my-10 font-sans rounded uppercase py-3 px-12 hover:cursor-pointer  text-[12px] duration-300 text-yellow-600 border-2 font-medium border-yellow-600 hover:bg-yellow-600 hover:text-white'> shopping Now </button>
            </Link>    
            </div>



        </div>


      </div>
    </>
  )
}
