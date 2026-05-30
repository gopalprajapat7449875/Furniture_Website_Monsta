"use client";

// import Slider from "react-slick";
import dynamic from "next/dynamic";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

export default function Testimonial({ testimonialdata }) {
    const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

    const [data, setdata] = useState(testimonialdata?.data)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false



    };





    return (
        <div className='text-center p-6'>
            <h3 className='text-[26px] text-neutral-800 font-semibold font-serif -tracking-[0.05em]' >
                What Our Custumers Say ?
            </h3>
            <div className=" py-1 sm:p-3 md:p-6">

                <Slider className="" {...settings}>


                    {data?.map((item, i) => (
                        <div className=' max-w-[1200px] py-3 px-3 sm:px-20 md:px-30  mx-auto flex flex-col justify-items-center  '>

                            <p className='text-[14px] text-neutral-700 font-medium '>
                                {item._TestimonialAbout}
                            </p>
                            <div className="w-22 h-24  rounded-[50%] mt-3 flex items-center justify-center ">
                                <img className="w-full h-full  object-fill " src={testimonialdata._path + item._image} alt="Kathy" />
                            </div>
                            <h6 className="text-[14px] font-serif font-semibold  font-medium py-2 "> {item._TestimonialName}</h6>
                            <p className="text-[12px] font-medium text-neutral-400 "> {item._TestimonialComponiName}</p>
                            <ul className="flex items-center py-4 gap-0.5">
                                {[...Array(item._TestimonialRating)].map((_, i) => (
                                    <li key={i} className="text-yellow-600">
                                        <FaStar />
                                    </li>
                                ))}
                            </ul>



                        </div>
                    ))}



                </Slider>
            </div>
        </div>
    );
}
