"use client"
import { DeleteItem, fetchwish } from '@/app/reduxwork/WishlistSlice'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { addProduct } from '@/app/reduxwork/Cartthunk'
import { toast, ToastContainer } from 'react-toastify'
export default function WishTable() {
    let dispatch = useDispatch()
    let token = Cookies.get('token')



    let wishlist = useSelector((store) => store.Wishliststore.wishdata)

    const [data, setdata] = useState(wishlist.wishlist)
    const [path, setpath] = useState(wishlist._Path)

    useEffect(() => {
        dispatch(fetchwish())

    }, [token])

    const AddtoCart = (_id) => {



        const newProduct = {
            _ProductID: data?._id,
            _ProductName: data?._ProductName,
            _ProductPrice: data?._Product_Discount_Price,
            _Quantity: 1,
            _ProductImage: data?._image,

        };
        if (token) {
            dispatch(addProduct(newProduct));


        }
        else {
            toast(" Please Login First ")
        }
    }

     let Delete = (_id) => {
        dispatch(DeleteItem(_id));
      }
    
    
    return (
        <>
            <ToastContainer />
            <div className=" max-w-[1200px] mx-auto   ">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-[15px]  rounded-lg">
                        <thead className="bg-neutral-100 border-b-2 border-yellow-600 font-serif">
                            <tr>
                                <th className="py-3 px-4 text-center">Delete</th>
                                <th className="py-3 px-4 text-center">Image</th>
                                <th className="py-3 px-4 text-center">Product</th>
                                <th className="py-3 px-4 text-center">Price</th>



                                <th className="py-3 px-4 text-center">Add To Cart</th>

                            </tr>
                        </thead>
                        <tbody className=" ">

                            {data?.map((item, i) => {
                                return (
                                    <tr className=" border-b-1 border-neutral-200 ">
                                        <td className="py-3 h-40 my-auto   px-4 text-xl my-auto flex justify-center justify-items-center border-l-1 border-neutral-200 ">

                                            <RiDeleteBin5Line onClick={() => Delete(item._id)} className='hover:text-yellow-600 my-auto  duration-300 cursor-pointer ' />

                                        </td>

                                        <td className="py-3 px-4 w-65 h-40 text-center  border-x-1 border-neutral-200 ">
                                            <Link href={`/product-details/${item._Product_Slug}`}>
                                                <img className="object-center w-full h-full " src={path + item._ProductImage} alt="furniture" />
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4 text-center  border-r-1 border-neutral-200 text-[13px] font-sans font-semibold "> {item._ProductName} </td>
                                        <td className="py-3 px-4 text-center  border-r-1 border-neutral-200 "><span> Rs. {item._ProductPrice
                                        }</span></td>


                                        <td className="py-3 px-4 text-center">  <button onClick={() => AddtoCart(data._id)} className='text-[13px] bg-yellow-600 font-bold text-white duration-500 hover:bg-neutral-900 cursor-pointer rounded my-3 mx-2 px-15 py-2'>
                                            Add to Cart
                                        </button></td>

                                    </tr>
                                )
                            })}






                        </tbody>


                    </table>

                </div>

            </div>
        </>
    )
}
