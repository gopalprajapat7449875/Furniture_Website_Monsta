'use client'

import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

export default function BannerSection({ sliderdata }) {

  const [data, setdata] = useState(sliderdata.Sliderres)
  // const [path, setpath] = useState(sliderdata._path)


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
    <div className="w-full h-[480px] overflow-hidden">
      <Slider {...settings}>
        {data.map((item, i) => (
          <div key={i} className="w-full h-[480px] ">


            <img
              src={item._image}
              alt={item._image}
              className="w-full h-[100%] object-cover   "
            />
          </div>
         
        ))}
      </Slider>
    </div>
  )
}