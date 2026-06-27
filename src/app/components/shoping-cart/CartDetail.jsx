"use client"

import React, { useEffect, useState } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'

import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify'
import { DeleteCartItem, UpdateCart } from '@/app/reduxwork/CartSlice'
import { FaChessKing } from 'react-icons/fa'
import Link from 'next/link'

import { Orderslice, setorderdata } from '@/app/reduxwork/OrderSlice'

export default function CartDetail({componydata}) {
  const token = Cookies.get("token");

  const router = useRouter();


  let cart = useSelector((store) => store.CartStore.cartdata)



  const [data, setdata] = useState(cart?.cartres)
  const [path, setpath] = useState(cart?._Path)
  const [CartItem, setCartItems] = useState([])
  const [coupan, setCoupan] = useState('')
  const [dis, setdis] = useState(0)
  const [delevery, setdelevery] = useState(0)

let discountcoupan=componydata?.componydata[0]?._ComponyOfferCoupan;
let discountpercentage=componydata?.componydata[0]?._ComponyDisOffer

  let dispatch = useDispatch()

  let cartlenght = cart?.cartres.length


  // console.log(data)

  let updatenewcart = (e) => {

    e.preventDefault()
    dispatch(UpdateCart(CartItem));

  }

  const handleQuantityChange = (id, qty) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === id);

      if (exist) {
        // update quantity
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: qty } : item
        );
      } else {
        // add new object
        return [...prev, { id: id, quantity: qty }];
      }
    });
  };

  let totalPrice = cart?.cartres?.reduce((acc, item) => {
    return acc + item._ProductPrice;
  }, 0);


  let checkcoupan = (e) => {
    e.preventDefault()
    if (coupan == discountcoupan) {

      setdis(totalPrice * discountpercentage / 100)
      toast(" Coupan Aplly sucsecc")
      setCoupan('')
   

    }
    else {
      toast("Envalid Coupan")
    }

  }

  useEffect(() => {
    if (totalPrice && totalPrice >= "20000") {

      setdelevery(0)
    }
    else if (totalPrice && totalPrice <= "20000") {
      setdelevery(2000)
    }

  }, [totalPrice])

  let orderdata = {
    cart: cart?.cartres,

    discount: dis,
    delevery: delevery
  }
  let checkout = () => {


    if (cartlenght == 0) {
      toast("Please Add Cart product")
    }
    else if (token) {


      dispatch(setorderdata(orderdata));
      router.push("/checkout")

    }
    else {
      router.push("/login-register")
    }
  }


  let Delete = (_id) => {
    dispatch(DeleteCartItem(_id));
  }







  return (
    <>
      <ToastContainer />
      <div className=" max-w-[1200px] mx-auto   ">
        <div className="overflow-x-auto">

          <form onSubmit={updatenewcart} action="submit">
            <table className="min-w-full text-[15px]  rounded-lg">
              <thead className="bg-neutral-100 border-b-2 border-yellow-600 font-serif">
                <tr>
                  <th className="py-3 px-4 text-center">Delete</th>
                  <th className="py-3 px-4 text-center">Image</th>
                  <th className="py-3 px-4 text-center">Product</th>
                  <th className="py-3 px-4 text-center">Price</th>

                  <th className="py-3 px-4 text-center">Quantity</th>

                  <th className="py-3 px-4 text-center">Total</th>

                </tr>
              </thead>
              <tbody className=" ">

                {cart?.cartres ? (cart?.cartres.map((item, i) => (
                  <tr className=" border-b-1 border-neutral-200 ">
                    <td className="py-3 h-40 my-auto   px-4 text-xl my-auto flex justify-center justify-items-center border-l-1 border-neutral-200 ">

                      <RiDeleteBin5Line onClick={() => Delete(item._id)} className='hover:text-yellow-600 my-auto  duration-300 cursor-pointer ' />

                    </td>

                    <td className="py-3 px-4 w-65 h-40 text-center  border-x-1 border-neutral-200 ">
                      <Link href={`/product-details/${item._Product_Slug}`}>
                        <img className="object-center w-full h-full " src={cart?._Path + item._ProductImage} alt="furniture" />
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-center  border-r-1 border-neutral-200 text-[13px] font-sans font-semibold "> {item._ProductName} </td>
                    <td className="py-3 px-4 text-center  border-r-1 border-neutral-200 "><span> Rs. {item._ProductPrice
                    }</span></td>

                    <td className="py-3 px-4 text-center  border-r-1 border-neutral-200 flex gap-3 font-semibold font-serif text-[14px] justify-center items-center"> <p>Quantity </p> <input min={1} name='_Quantity' onChange={(e) =>
                      handleQuantityChange(item._ProductID, parseInt(e.target.value))
                    } defaultValue={item._Quantity} className='w-15 rounded outline-none py-1 border-neutral-200 border' type="number" /> </td>
                    <td className="py-3 px-4 text-center"><span> Rs. {item._ProductPrice} </span></td>

                  </tr>
                ))) : (<tr>
                  <td
                    colSpan="5"
                    className="text-4xl text-neutral-500 text-center py-10"
                  >
                    Your Cart is Empty
                  </td>
                </tr>)}




              </tbody>


            </table>
            <div className='flex justify-end border-1 border-neutral-200 py-2 px-4'>
              <button type='submit' className='py-2 px-4 uppercase outline-none bg-neutral-950  hover:bg-yellow-600 cursor-pointer text-[11px] duration-500 text-white font-bold rounded'>
                update cart
              </button>
            </div>
          </form>
        </div>
        <div className='max-w-full grid sm:grid-cols-1 md:grid-cols-2 mt-10 gap-5'>
          <div className='border-1 border-neutral-200'>
            <h1 className='text-xl font-serif bg-neutral-950 uppercase text-white font-semibold py-2 px-4 upercase' >Coupon</h1>

            <p className='text-[11px] text-neutral-500 font-semibold py-6 px-4'>Enter your coupon code if you have one.</p>
            <div className='py-4 px-4 flex gap-5 items-center'>

              <form onSubmit={checkcoupan} >

                <input type="text" className='py-2 bg-neutral-100 px-2 outline-none border-1 border-neutral-200 text-[13px] rounded ' placeholder='Coupon code' value={coupan}
                  onChange={(e) => setCoupan(e.target.value)} />  <button type='submit' className='py-2 px-4 uppercase outline-none bg-neutral-950  hover:bg-yellow-600 cursor-pointer text-[11px] duration-500 text-white font-bold rounded'  >
                  Apply coupon
                </button>

              </form>
            </div>
          </div>
          <div className='border-1 border-neutral-200'>




            <h1 className='text-xl font-serif bg-neutral-950 uppercase text-white font-semibold py-2 px-4 upercase' >Cart Totals</h1>

            <div className='flex justify-between py-3 px-3 text-neutral-950 font-bold text-[16px]'><p className='text-[14px]'>Subtotal</p><span> Rs. {totalPrice} </span> </div>
            <div className='flex justify-between py-3 px-3 text-neutral-950 font-bold text-[16px]'><p className='text-[14px]'>Discount </p><span>  Rs. -{dis} </span> </div>
            <div className='flex justify-between py-3 px-3 text-neutral-950 font-bold text-[16px]'><p className='text-[14px]'>Delevery Charges </p><span>Rs.  + {delevery} </span> </div>
            <div className='flex justify-between py-3 px-3 text-neutral-950 font-bold text-[16px]'><p className='text-[14px]'>Total</p><span> Rs. {(totalPrice - dis) + (delevery)} </span> </div>
            <div className='py-4 px-4 flex justify-end  items-center'>

              <button onClick={checkout} type='submit' className='py-2 px-6 uppercase outline-none hover:bg-neutral-950  bg-yellow-600 cursor-pointer text-[12px] duration-500 text-white font-bold rounded'>
                Proceed to Checkout

              </button>

            </div>

          </div>
        </div>

      </div>
    </>
  )
}
