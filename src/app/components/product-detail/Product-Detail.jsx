"use client"
import { addProduct } from '@/app/reduxwork/Cartthunk';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
export default function ProductDetail({ ProductDetails }) {
let redirect = useRouter
    const settings = {


        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true
    };
    const [data, setdata] = useState(ProductDetails?.productres)
    const [path, setpath] = useState(ProductDetails?._Path)
    const [image, setimage] = useState(data?._image)
    const [mainimage, setmainImage] = useState(ProductDetails.productres?._Gallery_image ?? [])


    const token = Cookies.get("token");
  const dispatch = useDispatch();


  
  const AddtoCart = (_id) => {

  

    const newProduct = {
     _ProductID:ProductDetails.productres?._id ,
    _ProductName:ProductDetails.productres?._ProductName ,
    _ProductPrice:ProductDetails.productres?._Product_Discount_Price ,
    _Quantity: 1,
    _ProductImage:ProductDetails.productres?._image ,

    };
    if(token){
  dispatch(addProduct(newProduct));


    }
    else{
         toast(" Please Login First ")  
         redirect('/login-register')

    }

  
  
  };
 


    return (
        <>
        <ToastContainer/>
            <div className=" max-w-[1200px] mx-auto grid md:grid-cols-2">


                <div>
                    <img className='pt-2 rounded-2xl w-[95%] h-[75%]' src={image} alt={data?._image} />
                    <div className=' gap-3 pt-4 slider-container '>
                        <Slider {...settings}>
                            {mainimage.map((img, i) => (
                                <div key={i} className="px-1">
                                    <img
                                        src={img}
                                        onClick={() => setimage(img)}
                                        className={`w-26 h-24 object-cover rounded-lg cursor-pointer border-2 ${image === img ? "border-blue-500" : "border-gray-200"
                                            }`}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='px-5 pb-3 pt-10'>
                    <h5 className='text-xl font-serif text-neutral-800'> {data?._ProductName} </h5>
                    <p className='flex  items-center py-3'>
                        <span className='text-[12px] text-neutral-600  line-through px-1'>Rs. {data?._Product_Original_Price} </span>
                        <span className='text-[16px] animate-pulse text-yellow-600 font-bold  px-3'>Rs.  {data?._Product_Discount_Price} </span>
                    </p>
                    
         <p className='text-[14px]  text-neutral-600   px-3'> Short Discription :  {data?._Product_Short_Description} </p>



                    <p className='text-[13px] px-3 text-neutral-700 font-semibold py-1'> Dimension:: {data?._Product_Width}W {data?._Product_Hight}H {data?._Product_Length} L </p>
                    <p className='text-[13px] px-3 text-neutral-700 font-semibold py-1'> Estimate Delivery Days: {'"30-35" Days'} </p>

                     <p className='text-[13px] px-3 text-neutral-700 font-semibold py-1'>Category: {data?._PerentCategory?._CategoryName}</p>

                    <p className='text-[13px] px-3 text-neutral-700  flex items-center font-semibold py-1'> Color: {data?._Color?.map(item => (
                        <span key={item._id}> &nbsp; {item._ColorName + ","}</span>
                    ))} </p>

                    <p className='text-[13px] px-3 flex items-center text-neutral-700 font-semibold py-1'> Material: {data?._Material?.map(item => (
                        <span  key={item._id}>   &nbsp; {item._MetarialName + ` `}</span>
                    ))} </p>

                    <button  onClick={()=>AddtoCart(data._id)} className='text-[13px] bg-yellow-600 font-bold text-white duration-500 hover:bg-neutral-900 cursor-pointer rounded my-3 mx-2 px-15 py-2'>
                        Add to Cart
                    </button>


                </div>

            </div>
            <div className=" max-w-[1200px] mx-auto ">

                <h4 className='text-2xl text-yellow-600 font-semibold border-b-1 border-neutral-200 py-4 px-2'> Description </h4>

                <p className='text-[12px] text-neutral-500 px-3 font-semibold py-6 '>   {data?._Product_Long_Description}.</p>
            </div>

        </>
    )
}
