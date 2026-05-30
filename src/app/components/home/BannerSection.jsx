'use client'

import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

export default function BannerSection({sliderdata}) {

const [data, setdata] = useState(sliderdata.Sliderres)
  const [path, setpath] = useState(sliderdata._path)

   
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };


 
 

  return (
    <div className="w-full h-[420px] overflow-hidden">
      <Slider {...settings}>
        {data.map((item,i)=>(
          <div key={i} className="w-full h-[420px]">


            <img
              src={path + item._image}
              alt={item._image}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}