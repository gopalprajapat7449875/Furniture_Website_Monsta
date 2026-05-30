
'use client'
import React, { useRef, useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import Slider from 'react-slick'
import './Best.css'
import Link from 'next/link'
import { addProduct } from '@/app/reduxwork/Cartthunk'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import Card from '@/app/comon/Card'
export default function Bestselling({ productdata }) {

  const sliderRef = useRef(null);


  let dispatch = useDispatch()
  const token = Cookies.get("token");

  const [path, setpath] = useState(productdata._Path)

  let filteredData = productdata?.productres?.filter(
    (item) => item._Product_Best_Selling == true
  );


  const AddtoCart = (_id) => {

    let CartFilterData = productdata?.productres?.filter(
      (item) => item._id == _id
    );

    const newProduct = {
      _ProductID: CartFilterData[0]._id,
      _ProductName: CartFilterData[0]._ProductName,
      _ProductPrice: CartFilterData[0]._Product_Discount_Price,
      _Quantity: 1,
      _ProductImage: CartFilterData[0]._image,
      _Product_Slug: CartFilterData[0]._Slug

    };
    if (token) {
      dispatch(addProduct(newProduct));


    }
    else {
      toast(" Please Login First ")
    }



  };

  var settings = {
  autoplay: true,
  arrows: false,
  autoplaySpeed: 2500,
  pauseOnHover: true,
  infinite: true,
  accessibility: true,
  slidesToShow: 4,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1024, // tablet landscape
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768, // tablet
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 576, // mobile
      settings: {
        slidesToShow: 1
      }
    }
  ]
};
  return (
    <>
      <div className='font-serif max-w-[1200px] py-5  my-5 mx-auto'>

        <div className='flex justify-between px-4 sm:px-2 items-center '>
          <h3 className='text-[16px] sm:text-[20px] md:text-2xl  font-semibold'>
            Bestselling Products

          </h3>

          <div className='h-[2px]  rounded-3xl w-[880px] bg-neutral-200 px-1 '>

          </div>
          <div className='flex gap-1'>
            <GrFormPrevious className='text-2xl text-neutral-600 hover:text-yellow-600 cursor-pointer duration-300' onClick={() => sliderRef.current.slickPrev()} />
            <GrFormNext className='text-2xl text-neutral-600 hover:text-yellow-600 cursor-pointer duration-300' onClick={() => sliderRef.current.slickNext()} />


          </div>
        </div>
        <div className='px-2  w-full py-3'>
        
          <Slider className='w-full' ref={sliderRef} {...settings}>

            {filteredData.map((item, i) => {
              return (
                <div >


                  <Card key={i} item={item} productdata={productdata} />

                </div>
              )
            })}



          </Slider>
        </div>
      </div>
    </>
  )
}
