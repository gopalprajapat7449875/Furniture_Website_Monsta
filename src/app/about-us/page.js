
import React from 'react'
import Testimonial from '../comon/Testimonial'
import HeroSection from '../components/about/HeroSection'
import Welcome from '../components/about/Welcome'
import WhyChoose from '../components/about/Why-Choose'
import { TestimonialData } from '../services/HomeService'

export default async function AboutUs() {
  let testimonialdata=await TestimonialData()
  return (
    <>

     <HeroSection/>
     <Welcome/>
     <WhyChoose/>
     <Testimonial testimonialdata={testimonialdata}  />

    </>

  )
}
