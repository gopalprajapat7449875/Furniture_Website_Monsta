import axios from "axios";

 let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL
 let Sliderdata = () => {
    return axios.get(`${apibaseurl}home/slider`)
      .then((res) => res.data)
      .then((finalres) =>finalres)
  }



  let TestimonialData=()=>{
     return axios.get(`${apibaseurl}home/testimonial`)
      .then((res) => res.data)
      .then((finalres) =>finalres)
  }
  let Category=()=>{
     return axios.get(`${apibaseurl}home/category`)
      .then((res) => res.data)
      .then((finalres) =>finalres)
  }
  let Subcategory=()=>{
     return axios.get(`${apibaseurl}home/subcategory`)
      .then((res) => res.data)
      .then((finalres) =>finalres)
  }
let Color=()=>{
     return axios.get(`${apibaseurl}home/color`)
      .then((res) => res.data)
      .then((finalres) =>finalres)
  }
let Material=()=>{
     return axios.get(`${apibaseurl}home/material`)
      .then((res) => res.data)
      .then((finalres) =>finalres)
  }

  
  export {TestimonialData,Sliderdata,Category,Subcategory,Color,Material}