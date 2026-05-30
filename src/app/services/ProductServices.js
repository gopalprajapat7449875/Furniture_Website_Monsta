import axios from "axios";

 let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL
 let Productdata = () => {
    return axios.get(`${apibaseurl}home/product`)
      .then((res) => res.data)
      .then((finalres) =>finalres)
  }

let ProductDetails= (_Slug)=>{
   
    return axios.get(`${apibaseurl}home/product-details/${_Slug}`)
      .then((res) => res.data)
      .then((finalres) =>finalres)
    
    

}



  export {Productdata,ProductDetails}   