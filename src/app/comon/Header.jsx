'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { RiMenuFoldLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reduxwork/UserSlice';
import { redirect } from 'next/navigation';
import { fetchCart, UpdateCart } from '../reduxwork/CartSlice';
import { toast, ToastContainer } from 'react-toastify';
import { Componydata, componydata } from '../services/componyServises';
import axios from 'axios';
import { fetchwish } from '../reduxwork/WishlistSlice';


export default function Header({ componydata, category, subcategory }) {
  let token = useSelector((state) => state.userStore.token)
  let news = useSelector((state) => state.Enqurystore.newsletters)

  let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL
 
  let contect = useSelector((state) => state.Enqurystore.contect)
  const [scrolled, setScrolled] = useState(false);
  const [open, setopen] = useState(false);
  let logout = useDispatch()
  const [data, setdata] = useState(null)
  const [path, setpath] = useState("")
  const [subdata, setsubdata] = useState([])
  const [opacity, setopacity] = useState(false)

  let categorydata = category.Categoryres

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // 🔥 removes special chars like }
      .replace(/\s+/g, '-')
      .trim();

  let subcstegoryfilter = (CategoryName) => {
    if (!subcategory?.SubCategoryres) {
      setsubdata([]); // null ki jagah empty array
      return;
    }

    const filtered = subcategory.SubCategoryres.filter(
      (item) => item?._PerentCategory?._CategoryName === CategoryName
    );

    setsubdata(filtered);
  };

  let Subpath = subcategory._path


  let Componydata = () => {
    axios.get(`${apibaseurl}home/compony`)
      .then((res) => res.data)
      .then((finalres) => {
        setdata(finalres.componydata[0])
        setpath(finalres._path)
      })

  }
  useEffect(() => {
    Componydata()
  }, [])


  let HendelLogout = () => {
    logout(logOut())
    redirect('/')
  }
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY >= 125) {
        setScrolled(true)
      } else if (window.scrollY <= 125) {
        setScrolled(false)
      }
    })

  }, [])

  let dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(fetchCart())
    }


  }, [token])

  let cart = useSelector((store) => store.CartStore.cartdata)
  let update = useSelector((store) => store.CartStore.update)

  let Delete = useSelector((store) => store.CartStore.delete)
  let Add = useSelector((store) => store.CartStore.add)
  let Addw = useSelector((store) => store.Wishliststore.add)

  let Deletew = useSelector((store) => store.Wishliststore.delete)

  useEffect(() => {
    if (Deletew?._status) {
      toast.success(Deletew?._message)
      dispatch(fetchwish())
    }
    else if (Deletew?._status === false) {
      toast.error("Something Went Wrong")
    }
  }, [Deletew])

  useEffect(() => {
    if (Add?._status) {
      toast.success(Add?._message)
      dispatch(fetchCart())
    }
    else if (Add?._status === false) {
      toast.error("Something Went Wrong")
    }
  }, [Add])

  useEffect(() => {
    if (Addw?._status === true) {
      toast.success(Addw?._message)
      dispatch(fetchwish())

    }
    else if (Addw?._status === false) {
      toast.error(Addw?._message)
    }
  }, [Addw])

  useEffect(() => {
    if (news?._Status === true) {
      toast.success(news?._Message)

    }
    else if (news?._Status === false) {
      toast.error(news?._Message)
    }
  }, [news])
  useEffect(() => {
    if (contect?._Status === true) {
      toast.success(contect?._Message)

    }
    else if (contect?._Status === false) {
      toast.error(contect?._Message)
    }
  }, [contect])
  useEffect(() => {
    if (Delete?._status === true) {
      toast.success(Delete?._message)
      dispatch(fetchCart())
    }
    else if (Delete?._status === false) {
      toast.error("Something Went Wrong")
    }
  }, [Delete])

  useEffect(() => {
    if (update?._status === true) {
      toast.success(update?._message)
      dispatch(fetchCart())
    }
    else if (update?._status === false) {
      toast.error("Something Went Wrong")
    }
  }, [update])

  let cartlenght = cart?.cartres.length
  let totalPrice = cart?.cartres?.reduce((acc, item) => {
    return acc + item._ProductPrice;
  }, 0);


  return (

    <>
      <ToastContainer />
      <div className='w-full  bg-white '>



        <div className=' sm:px-2 md:px-4 '>
          <div className='w-full  bg-white  border-b border-neutral-200'>

            <div className='max-w-[1200px] mx-auto py-3 hidden lg:flex flex justify-between items-center text-[12px] text-neutral-800 font-medium'>

              <p>Contact us 24/7 :<a href={data?._ComponyPhoneNumber}>{data?._ComponyPhoneNumber} </a> /
                <a href="furnitureinfo@gmailcom"> {data?._ComponyEmail} </a>
              </p>


              {token ? <div className='flex gap-2 '>
                <button onClick={HendelLogout} className='font-serif rounded px-1 border-2 border-yellow-600 hover:text-yellow-600'> Logout </button>
                <Link href={'/login-user'}>
                  <button className='font-serif rounded px-1 border-2 border-yellow-600 hover:text-yellow-600'> Dashboard </button>
                </Link> </div>
                :
                <Link href={'/login-register'}>
                  <p
                    className=' hover:text-yellow-600  duration-250 ' >
                    Login / Register
                  </p>
                </Link>
              }

            </div>
          </div>
          <div className='w-full  bg-white  border-b border-neutral-200'>

            <div className='max-w-[1200px] mx-auto py-5  flex   justify-between items-center text-[12px] px-3 md:px-4 text-neutral-800 font-medium'>
              <Link href={'/'}>
                <img className='w-34 ' src={path + data?._logoimg} alt="Monsta" />
              </Link>
              <div className='flex gap-4 md:pe-4  items-center  sm:justify-center   '>


                <div className='hidden lg:flex md:flex flex items-center rounded py-2 px-2 gap-2  border border-neutral-200'>
                  <input className='outline-none lg:w-[250px] md:w-[150px] ' type="text" placeholder='search product...' />  <IoSearchSharp className='text-2xl font-extralight' />

                </div>

                <button className='  border border-neutral-200 sm:text-left py-2.5 px-2.5 text-xl rounded' >  <Link href={'/my-wishlist'} >
                  <FaHeart className=' hover:text-yellow-600 cursor-pointer duration-200 ' /></Link>
                </button>

                <div className='flex relative sm:justify-start ml-1 items-center py-2.5 px-4 text-[18px] font-semibold px-1 rounded border hover:text-yellow-600 duration-200 border-neutral-200'>
                  <button className=' border-neutral-200 md:border-r border-neutral-200 pr-2 cursor-pointer'>  <Link href={'/my-cart'} ><FaCartShopping /></Link>
                  </button>


                  <button className='flex hidden md:flex items-center gap-3 px-2 text-[12px] cursor-pointer '> Rs. {totalPrice ? totalPrice : '00'}  <FaAngleDown />

                  </button>
                  <div className=' absolute w-4 h-4 rounded-[50%] -left-2 top-3 bg-yellow-600 flex justify-center items-center text-[12px] text-white' > {cartlenght}  </div>
                </div>
              </div>

              <div className='  lg:hidden sm:flex md:flex border-1 border-neutral-500 rounded p-1.5 sm:mr-3 md:mr-4  '>
                <RiMenuFoldLine className='w-6 h-6 font-semibold hover:text-yellow-600 hover:cursor-pointer' onClick={() => setopen(true)} />

              </div>
            </div>
          </div>
          <div className={` w-full  hidden lg:flex left-0  bg-white ${scrolled && '   bg-white lg:fixed top-0 z-20 py-1 duration-500'} border-b border-neutral-200`}>

            <div className={`max-w-[1200px] mx-auto   text-center `}>


              <ul className='flex uppercase justify-center items-center gap-10 text-[12px] font-semibold' >
                <li className={`max-w-24 ${scrolled ? ' mx-5 block' : 'hidden'}  `}>  <img className='w-full' src={path + data?._logoimg} alt="Monsta" /></li>

                <Link href={'/'}>
                  <li className='text-yellow-600 hover:cursor-pointer duration-250 py-5'>Home</li>
                </Link>
                {categorydata.map((item, i) => {
                  return (

                    <li key={i} onMouseEnter={() => { subcstegoryfilter(item._CategoryName); setopacity(false) }} className='text-neutral-500 py-5  hover:cursor-pointer ease-in duration-900 relative group hover:  hover:text-yellow-600 flex items-center gap-1'> {item._CategoryName} <FaAngleDown />
                      <div className={`bg-white w-178  rounded ${opacity ? 'opacity-0' : 'opacity-100'}  text-black origin-top absolute z-9 ${scrolled ? '-left-85' : '-left-60'}    top-[58px]  rotate-x-90 duration-600  group-hover:rotate-x-0 group-hover:skew-x-0 `}>
                        <div className='  flex gap-2  flex-wrap '>

                          {subdata.map((sitem, si) => (

                            <Link key={si} href={`/product/${item._CategoryName.toLowerCase()
                              .replaceAll('.', '')
                              .replaceAll(' ', '-')
                              .replaceAll('&', '')
                              .replaceAll('--', '-')
                              .trim()}/${sitem._SubCategoryName
                                .toLowerCase()
                                .replaceAll('.', '')
                                .replaceAll(' ', '-')
                                .trim()}`}>



                              <div onClick={() => setopacity(true)} className='py-4  w-43  hover:text-yellow-600  hover:scale-105 px-5 text-center leading-14  '>
                                <img className='w-[100%] h-25  rounded-2xl shadow-[0px_2px_8px_4px_rgba(202,138,4,0.8)]  ' src={Subpath + sitem._image} alt="db" />
                                <p className=''> {sitem._SubCategoryName} </p>

                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </li>
                  )
                })}
                <li className='  hover:text-yellow-600 py-5 hover:cursor-pointer duration-250 flex items-center gap-2 relative group hover:'>pages  <FaAngleDown />
                  <div className='bg-white  w-50 text-black origin-top absolute z-9 -left-10  top-[58px] -skew-x-15 rotate-x-90 duration-600 group-hover:rotate-x-0 group-hover:skew-x-0'>

                    <div className='py-3 px-5 text-left    '>

                      <ul className='text-neutral-500 text-[11px] capitalize leading-7 '>
                        <li className='hover:text-yellow-600'><Link href={'/about-us'} > About Us</Link></li>
                        <li className='hover:text-yellow-600'><Link href={'/my-cart'} >Cart </Link> </li>
                        <li className='hover:text-yellow-600'><Link href={'/login-register'} > Login Register </Link></li>
                        <li className='hover:text-yellow-600'><Link href={'/faq-page'} > Frequently Questions </Link> </li>
                      </ul>
                    </div>


                  </div>
                </li>
                <li className=' hover:text-yellow-600 py-5 hover:cursor-pointer duration-250 '> <Link href={'/contact-us'}> contact us </Link> </li>
              </ul>

            </div>
          </div>
        </div>

        <div onClick={() => setopen(false)} className={`sm:w-55 md:w-70    ${open ? 'translate-x-0' : '-translate-x-[100%]'} duration-500 ease-in-out bg-white fixed  top-0 overflow-y-auto  z-30 h-[100%]`}>
          <div className='flex justify-end flex-col  w-full  py-8 px-5'>

            <div className='flex justify-end items-end'>
              <div className='flex  sm:w-7 sm:h-7   md:w-9 md:h-9 border-1 border-neutral-300 rounded-[50%]'>
                <RxCross2 className='sm:text-xl md:text-2xl mx-auto my-auto font-extrabold' onClick={() => setopen(false)} />
              </div>

            </div>
            <div className='text-center py-4 text-[13px]  text-neutral-600'>

              <p className='pb-4'>Contact us 24/7 :<a href="tel:+919876543210">+919876543210</a> </p>
              <a href="furnitureinfo@gmailcom">furnitureinfo@gmail.com</a>
            </div>
            <div>
              <ul className='flex text-neutral-600 flex-col uppercase  text-[13px] font-semibold' >

                <Link href={'/'}>
                  <li className=' hover:cursor-pointer duration-250 py-5'>Home</li>
                </Link>

                <li className=' flex border-b border-neutral-200 justify-between items-center py-5 hover:cursor-pointer  group hover:  hover:text-yellow-600 flex items-center gap-2'>living  <FaAngleDown />

                </li>
                <li className=' py-5  border-b border-neutral-200  flex justify-between  items-center hover:cursor-pointer  hover:text-yellow-600 flex items-center gap-2 relative group hover:'> sofa  <FaAngleDown />

                </li>
                <li className='   py-5  border-b border-neutral-200  flex justify-between  items-center hover:cursor-pointer  flex items-center gap-2  group '>pages  <FaAngleDown />

                </li>
                <li className='  py-5 hover:cursor-pointer  '> <Link href={'/contact-us'}> contact us </Link> </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
