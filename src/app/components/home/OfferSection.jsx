import Link from 'next/link'
import React from 'react'

export default function OfferSection() {
  return (
   <>
   <div className=' w-full py-3 my-3 border-b border-neutral-200  '>
          <div className=" max-w-[1200px] mx-auto   grid gap-4 md:grid-cols-2 lg:grid-cols-3">
<Link href={'/product/furniture/top-reted'}>


            <div className=" relative h-63 sm:w-94 mx-auto rounded  my-5 group hover: duration-200">
              <div className="absolute h-full w-full overflow-hidden">

                <img className="  h-full w-full  group-hover:scale-115  duration-400" src="/furniture (2).jpg" alt="furniture" />

              </div>
              <div className=" absolute p-5 h-full w-full  font-serif  ">
                <p className="text-[14px]">
                  Design Creative
                </p>
                <h4 className="text-[25px] font-medium">
                  Chair Collection
                </h4>

              </div>
              <div className=" absolute p-5 h-full w-full hover:bg-black hover:opacity-40 duration-700 ">

              </div>

            </div>

</Link>
<Link href={'/product/furniture/best-selling'}>
            <div className=" relative h-63 sm:w-94 rounded mx-auto my-5 group hover: duration-200">
              <div className="absolute h-full w-full overflow-hidden">

                <img className="  h-full w-full mx-auto group-hover:scale-115  duration-400" src="/furniture.jpg" alt="furniture" />

              </div>
              <div className=" absolute p-5 h-full w-full font-serif  ">
                <p className="text-[14px]">
                  Bestselling Products
                </p>
                <h4 className="text-[25px] font-medium">


                  Chair Collection
                </h4>

              </div>
              <div className=" absolute p-5 h-full w-full hover:bg-black hover:opacity-40 duration-700 ">

              </div>

            </div>
</Link>
<Link href={'/product/furniture/on-sale'}>
            <div className=" relative h-63 sm:w-94 rounded  my-5 group hover: duration-200">
              <div className="absolute h-full w-full overflow-hidden">

                <img className="  h-full w-full  group-hover:scale-115  duration-400" src="/furniture (2).jpg" alt="furniture" />

              </div>
              <div className=" absolute p-5 h-full w-full font-serif    ">
                <p className="text-[14px]">
                  Onsale Products
                </p>
                <h4 className="text-[25px] font-medium">
                  Chair Collection
                </h4>

              </div>
              <div className=" absolute p-5 h-full w-full hover:bg-black hover:opacity-40 duration-700 ">

              </div>

            </div>
</Link>
          </div>
        </div>
   </>
  )
}
