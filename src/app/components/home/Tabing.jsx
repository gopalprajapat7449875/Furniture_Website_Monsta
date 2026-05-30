'use client'

import React, { useEffect, useState } from 'react'
import Card from '../../comon/Card'
import { FaRegHeart } from 'react-icons/fa';
import Link from 'next/link';
import { AddtoCart } from '@/app/services/ProductServices';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, fetchProducts } from '@/app/reduxwork/Cartthunk';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie'
import { addwishlist } from '@/app/reduxwork/WishlistSlice';
export default function Tabing({ Productdata }) {






    // console.log(Productdata)
    const [ActiveTab, SetActiveTab] = useState('1');


  





    let filteredData = Productdata?.productres?.filter(
        (item) => item._Prodcut_Type == ActiveTab
    );
   

    return (
        <>
        <ToastContainer/>
            <div className='max-w-[1200px] mx-auto py-3    '>

                <div className='flex justify-center items-center  '>

                    <div className="h-[2px] rounded-2xl sm:hidden md:flex sm:w-40 md:w-50 lg:w-60 bg-gradient-to-l from-neutral-300/50 via-neutral-300/20 to-transparent"></div>

                    <div className=' lg:flex gap-0 font-serif'>
                        <button id='tab1' onClick={() => SetActiveTab('1')} className={`border-2 hover:text-yellow-600 ${ActiveTab === '1' ? ' border-yellow-600 text-yellow-600' : 'border-neutral-300'} py-2 px-6 text-xl font-semibold cursor-pointer   `}  >Featured</button>
                        <button id='tab2' onClick={() => SetActiveTab('2')} className={`border-2 hover:text-yellow-600 ${ActiveTab === '2' ? ' border-yellow-600 text-yellow-600' : 'border-neutral-300'} py-2 px-6 text-xl font-semibold cursor-pointer  `}  > New Arrivals </button>
                        <button id='tab3' onClick={() => SetActiveTab('3')} className={`border-2 hover:text-yellow-600 ${ActiveTab === '3' ? ' border-yellow-600 text-yellow-600' : 'border-neutral-300'} py-2 px-6 text-xl font-semibold cursor-pointer  `}  >Onsale</button>
                    </div>

                    <div className="h-[2px] sm:hidden md:flex rounded-2xl sm:w-40 md:w-50 lg:w-60 bg-gradient-to-r from-neutral-300/50 via-neutral-300/20 to-transparent"></div>
                </div>










                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-6  '>


                    {filteredData?.map((item, i) => (

                       <Card  key={i} item={item} productdata={Productdata} />
                    ))}


                </div>







            </div>

        </>
    )
}
