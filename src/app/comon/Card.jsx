'use client'
import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import { addProduct } from '../reduxwork/Cartthunk';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { addwishlist } from '../reduxwork/WishlistSlice';
import { redirect } from 'next/navigation';

export default function Card({ item, productdata }) {



  let dispatch = useDispatch()
  const token = Cookies.get("token");

  const [path, setpath] = useState(productdata?._Path)




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
      setTimeout(() => {
        redirect('/login-register')
      }, [3000])
    }



  };


  let Addtowishlist = (_id) => {

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
      dispatch(addwishlist(newProduct));


    }
    else {
      toast(" Please Login First ")
      setTimeout(() => {
        redirect('/login-register')
      }, [3000])


    }



  };






  return (
    <>
      <ToastContainer />
      <div className="mx-auto  md:mx-0 w-70 h-100 mb-8 bg-white rounded-2xl shadow-md hover:shadow-yellow-600  duration-200 transition duration-300 overflow-hidden font-serif">

        {/* Image */}
        <Link href={`/product-details/${item._Slug}`}>
          <img
            className="w-full h-[50%] hover:scale-107 duration-300 object-cover"
            src={item._image}
            alt={item._ProductName}
          />
        </Link>

        {/* Content */}
        <div className="p-4 h-25 text-center">
          <p className="text-neutral-400 pb-4 text-xs">
            {item._PerentCategory?._CategoryName}
          </p>

          <h5 className="text-sm font-semibold hover:text-yellow-600 cursor-pointer transition duration-300 line-clamp-2">
            {item._ProductName}
          </h5>
        </div>

        {/* Divider */}
        <div className="h-[1px] mx-4 bg-gradient-to-r from-transparent via-neutral-300 to-transparent"></div>

        {/* Price */}
        <p className="flex justify-center gap-3 text-sm py-2">
          <span className="line-through text-neutral-400">
            Rs: {item._Product_Original_Price}
          </span>
          <span className="font-bold animate-pulse text-yellow-600">
            Rs: {item._Product_Discount_Price}
          </span>
        </p>

        {/* Buttons */}
        <div className="flex gap-2 items-center justify-center pb-4">

          {/* Wishlist */}
          <button
            onClick={() => Addtowishlist(item._id)}
            className="relative p-2 bg-neutral-100 hover:bg-yellow-600 group transition duration-300 rounded-md"
          >
            <FaRegHeart className="text-lg group-hover:text-white" />

            <div className="hidden group-hover:block absolute w-28 py-1 rounded-lg shadow-md -top-10 left-1/2 -translate-x-1/2 bg-white text-xs font-bold text-yellow-500">
              Wishlist
            </div>
          </button>

          {/* Add to Cart */}
          <button
            onClick={() => AddtoCart(item._id)}
            className="relative px-3 py-2 bg-neutral-100 hover:bg-yellow-600 hover:text-white group transition duration-300 rounded-md text-sm"
          >
            Add to cart

            <div className="hidden group-hover:block absolute w-28 py-1 rounded-lg shadow-md -top-10 left-1/2 -translate-x-1/2 bg-white text-xs font-bold text-yellow-500">
              Add to Cart
            </div>
          </button>

        </div>
      </div>
    </>
  )
}
