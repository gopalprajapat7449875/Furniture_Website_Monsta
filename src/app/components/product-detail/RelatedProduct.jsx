
'use client'
import React, { useRef } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import Slider from 'react-slick'
import Card from '../../comon/Card';


export default function RelatedProduct({ Product, _Slug }) {

  const sliderRef = useRef(null);


  let cotegory = Product?.productres?.filter(
    (item) => item._Slug == _Slug



  );
  let productdata = Product?.productres?.filter(
    (item) => item?._PerentCategory?._CategoryName == cotegory[0]?._PerentCategory?._CategoryName



  );



 
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

        <div className='flex justify-between items-center '>
          <h3 className='text-2xl  font-semibold'>
            Related Product

          </h3>

          <div className='h-[2px]  rounded-3xl w-[880px] bg-neutral-200 px-1 '>

          </div>
          <div className='flex gap-1'>
            <GrFormPrevious className='text-2xl text-neutral-600 hover:text-yellow-600 cursor-pointer duration-300' onClick={() => sliderRef.current.slickPrev()} />
            <GrFormNext className='text-2xl text-neutral-600 hover:text-yellow-600 cursor-pointer duration-300' onClick={() => sliderRef.current.slickNext()} />


          </div>
        </div>
        <div className='px-2 py-5 '>
          <Slider className='' ref={sliderRef} {...settings}>

            {productdata.map((item, i) => (
              <Card key={i} item={item} productdata={Product} />
            ))}




          </Slider>
        </div>
      </div>
    </>
  )
}
