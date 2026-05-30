'use client'
import React, { useState } from 'react'
import Card from '../../comon/Card'
import { FaRegHeart } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { Productdata } from '@/app/services/ProductServices'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { addProduct } from '@/app/reduxwork/Cartthunk'
import { addwishlist } from '@/app/reduxwork/WishlistSlice'

export default function CatagoryContent({ material, color, productdata, type, value, subcategorydata, categorydata }) {


    let subcategory = value
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500000);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState([]);
    const [selectedColor, setSelectedColor] = useState([]);
    const [slectedtype, setslectedtype] = useState([]);
    const [sortType, setSortType] = useState("");
    const [side, setside] = useState(false)

    console.log(selectedColor, selectedMaterial

    )



    const [filter, setfilter] = useState(false)
    let filterarrey = ['Featured Products', 'New Arrivals', 'On sale', 'Best Sellings', 'Sort by price: low to high', 'Sort by price: high to low']
    const dispatch = useDispatch();
    let token = Cookies.get('token')

    let data = [];


    if (type == "furniture" && value == "online-store") {
        data = productdata?.productres

    }
    else if (type != 'category' && type != 'furniture') {
        const formattedValue = value.toLowerCase().replaceAll('-', ' ').trim()

        if (value == 'collection') {
            let filter = productdata?.productres.filter((item) =>
                item?._PerentCategory?._CategoryName
                    ?.toLowerCase()
                    .trim() === formattedValue
            )
            data = filter
        }
        else {

            let filter = productdata?.productres.filter((item) =>
                item?._SubCategory?._SubCategoryName
                    ?.toLowerCase()
                    .trim() === formattedValue
            )
            data = filter

        }




    }

    else if (type == "category") {
        const formattedValue = value.toLowerCase().replaceAll('-', ' ').trim()

        let filter = productdata?.productres.filter((item) =>
            item?._PerentCategory._CategoryName
                ?.toLowerCase()
                .trim() === formattedValue
        )


        data = filter

    }



    else if (type == "furniture" && value == "best-selling") {
        let filter = productdata?.productres.filter((item) =>
            item._Product_Best_Selling === true
        )
        data = filter
    }

    else if (type == "furniture" && value == "top-reted") {
        let filter = productdata?.productres.filter((item) =>
            item._Product_Top_Rated === true
        )
        data = filter
    }

    else if (type == "furniture" && value == "on-sale") {
        let filter = productdata?.productres.filter((item) =>
            item._Prodcut_Type === "3"
        )
        data = filter
    }


    const handleFilter = (value, state, setState) => {
        if (state.includes(value)) {
            setState(state.filter((item) => item !== value));
        } else {
            setState([...state, value]);
        }
    };


    const filteredData = data
        .filter((item) => {
            const materialMatch =
                selectedMaterial.length === 0 ||
                item._Material?.some((m) =>
                    selectedMaterial.includes(m._MetarialName.trim())
                );

            const colorMatch =
                selectedColor.length === 0 ||
                item._Color?.some((c) =>
                    selectedColor.includes(c._ColorName.trim())
                );

            return (
                (selectedCategory.length === 0 ||
                    selectedCategory.includes(item._SubCategory?._SubCategoryName)) &&

                materialMatch &&
                colorMatch &&

                (slectedtype.length === 0 ||
                    slectedtype.includes(item._Prodcut_Type) ||
                    (slectedtype.includes("4") && item._Product_Best_Selling)) &&

                Number(item._Product_Discount_Price) <= Number(maxPrice)
            );
        })
        .sort((a, b) => {
            const priceA = Number(a._Product_Discount_Price);
            const priceB = Number(b._Product_Discount_Price);

            if (sortType === "5") return priceA - priceB;
            if (sortType === "6") return priceB - priceA;

            return 0;
        }); console.log(filteredData)



    return (
        <>


            <div className="max-w-[1200px] mx-auto my-8 grid grid-cols-1 md:grid-cols-4 gap-4">

                {data.length > 0 ? (
                    <>
                        {/* Sidebar */}
                        <div className={` px-3 py-4 col-span-1 duration-800 ease-in-out fixed md:static w-60 overflow-y-auto md:overflow-auto    ${side ? 'left-[0%] z-50   ' : 'left-[-100%] '} md:left-0 md:w-[90%] md:w-auto h-full md:h-auto bg-white `}>
                            <div className='flex justify-between px-2 '>

                                <h4 className="text-[16px] md:text-[22px] text-neutral-800 pb-2 font-semibold font-serif">
                                    Categories
                                </h4>
                                <button onClick={() => setside(false)} className='text-[12px] rounded-2xl hover:bg-yellow-600 hover:text-white md:hidden px-3 py-2 font-black border-2 border-yellow-600'>
                                    filter
                                </button>
                            </div>

                            <div className="w-full custom-scroll h-[250px] md:h-100 border-b border-neutral-200 overflow-y-auto">
                                {categorydata?.Categoryres?.map((item, i) => (
                                    <div className="px-3 md:px-5" key={i}>
                                        <h5 className="text-[10px] md:text-[16px] py-2 md:py-3 text-neutral-600 font-bold font-serif">
                                            {item._CategoryName}
                                        </h5>

                                        {subcategorydata?.SubCategoryres
                                            .filter(
                                                (items) =>
                                                    items._PerentCategory._CategoryName ==
                                                    item._CategoryName
                                            )
                                            .map((sitem, si) => (
                                                <div
                                                    key={si}
                                                    className="flex px-2 gap-3 items-center pb-2 text-[13px] md:text-[14px] text-neutral-400 font-semibold"
                                                >
                                                    <input
                                                        type="checkbox"

                                                        checked={sitem._SubCategoryName.toLowerCase().replaceAll('.', '')
                                                            .replaceAll(' ', '-')
                                                            .replaceAll('&', '')
                                                            .replaceAll('--', '-')
                                                            .trim() == subcategory}
                                                        value={sitem._SubCategoryName}
                                                        onChange={() =>
                                                            handleFilter(
                                                                sitem._SubCategoryName,
                                                                selectedCategory,
                                                                setSelectedCategory
                                                            )
                                                        }
                                                    />
                                                    <p>{sitem._SubCategoryName}</p>
                                                </div>
                                            ))}
                                    </div>
                                ))}
                            </div>

                            {/* Material */}
                            <h4 className="text-[16px] md:text-[22px] mt-4 text-neutral-800 pb-2 font-semibold font-serif">
                                Material
                            </h4>

                            <div className="w-full custom-scroll h-[150px] md:h-50 border-b border-neutral-200 overflow-y-auto">
                                {material.Materialres?.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex ps-4 md:ps-7 gap-3 items-center pb-2 text-[13px] md:text-[14px] text-neutral-500 font-semibold"
                                    >
                                        <input
                                            type="checkbox"
                                            onChange={() =>
                                                handleFilter(
                                                    item._MetarialName,
                                                    selectedMaterial,
                                                    setSelectedMaterial
                                                )
                                            }
                                        />
                                        <p>{item._MetarialName}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Color */}
                            <h4 className="text-[16px] md:text-[22px] text-neutral-800 pb-2 font-semibold font-serif">
                                Color
                            </h4>

                            <div className="w-full custom-scroll h-[150px] md:h-50 border-b border-neutral-200 overflow-y-auto">
                                {color.colorres?.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex ps-4 md:ps-7 gap-3 items-center pb-2 text-[13px] md:text-[14px] text-neutral-500 font-semibold"
                                    >
                                        <input
                                            type="checkbox"
                                            onChange={() =>
                                                handleFilter(
                                                    item._ColorName,
                                                    selectedColor,
                                                    setSelectedColor
                                                )
                                            }
                                        />
                                        <p>{item._ColorName}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Price */}
                            <h4 className="text-[16px] md:text-[22px] mt-3 text-neutral-800 pb-2 font-semibold font-serif">
                                Price
                            </h4>

                            <div className="w-full border-b border-neutral-200 pb-4">
                                <input
                                    type="range"
                                    min={minPrice}
                                    max="500000"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-full accent-yellow-500 px-2 py-2"
                                />
                                <div className="flex justify-between text-sm">
                                    <p>₹{minPrice}</p>
                                    <p>₹{maxPrice}</p>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="md:col-span-3 col-span-1 pl-0 md:pl-3">

                            {/* Sort */}
                            <div className="border flex flex-col md:flex-row justify-between md:justify-end items-start md:items-center text-[13px] gap-3 text-neutral-500 font-semibold border-neutral-200 py-3 px-2">

                                <div className='md:hidden'>
                                    <button onClick={() => setside(true)} className='text-[14px] rounded-2xl font-bold border px-5 py-2'> {`<`} Filter</button>
                                </div>



                                <div className='flex gap-2 items-center '>
                                    <p className="font-serif">Sort By :</p>




                                    <div onClick={() => setfilter(!filter)} className=' cursor-pointer border-1 border-neutral-300 py-1 px-4 relative group flex items-center gap-2' > Sort By <IoIosArrowDown className={` ${filter ? 'rotate-x-180' : 'rotate-0'} duration-300 `} />

                                        <div className={`w-50 bg-white  ${filter ? 'scale-100' : 'scale-0'}  duration-200 ease-in origin-top-left   rounded absolute -left-0.5 top-7 border-1 border-neutral-200`}>
                                            <ul>
                                                {
                                                    filterarrey.map((v, i) => (
                                                        <li key={i}

                                                            onClick={() => {
                                                                const val = String(i + 1);

                                                                if (val === "5" || val === "6") {
                                                                    setSortType(val)
                                                                } else {
                                                                    setslectedtype([val]);
                                                                }
                                                            }}
                                                            className=' text-[13px] font-medium text-neutral-400 hover:bg-neutral-100  py-2 px-2 rounded  cursor-pointer'
                                                             value={i + 1}> {v} </li>
                                                    ))
                                                }

                                            </ul>
                                        </div>


                                    </div>




                                    <p>
                                        Showing {filteredData.length} of {data.length} results
                                    </p>

                                </div>
                            </div>

                            {/* Product Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-5">
                                {filteredData.length > 0 ? (
                                    filteredData?.map((item, i) => (
                                        <Card key={i} item={item} productdata={productdata} />
                                    ))
                                ) : (
                                    <div className="w-full col-span-3 bg-yellow-600 text-white font-bold animate-pulse m-2 py-5 text-center">
                                        <p>No Record Found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full col-span-1 md:col-span-4 h-full">
                        <div className="w-full mx-auto text-center">
                            <img
                                src="/my-Order.jpg"
                                alt="No record"
                                className="w-60 md:w-100 mb-4 mx-auto"
                            />
                            <p className="text-gray-500 text-[12px] md:text-[16px]">No Record Found</p>
                        </div>
                    </div>
                )}
            </div>
            {/* <div className=" max-w-[1200px] mx-auto my-8 grid grid-cols-4 ">

                {data.length > 0 ? (<>





                    <div className=' px-3 py-4  col-span-1'>
                        <h4 className='text-[22px] text-neutral-800 pb-2 font-semibold font-serif'>Catagories</h4>
                        <div className='max-w-full custom-scroll h-100 border-b-1 border-neutral-200 overflow-y-auto'>



                            {categorydata?.Categoryres?.map((item, i) => (
                                <div className='px-5' key={i}>
                                    <h5 className='text-[16px] py-3 text-neutral-600 font-bold font-serif'> {item._CategoryName} </h5>

                                    {subcategorydata?.SubCategoryres.filter((items) => items._PerentCategory._CategoryName == item._CategoryName).map((sitem, si) => (
                                        <div className='flex px-2 gap-5 items-center pb-2 text-[14px] text-neutral-400 font-semibold'>
                                            <input
                                                type="checkbox"
                                                value={sitem._SubCategoryName}
                                                onChange={() => handleFilter(sitem._SubCategoryName, selectedCategory, setSelectedCategory)}


                                            />
                                            <p>{sitem._SubCategoryName
                                            } </p>
                                        </div>

                                    ))}




                                </div>

                            ))}



                        </div>

                        <h4 className='text-[22px] mt-4 text-neutral-800 pb-2 font-semibold font-serif'>Material</h4>
                        <div className='max-w-full custom-scroll h-50 border-b-1 border-neutral-200 overflow-y-auto'>
                            {material.Materialres?.map((item, i) => (
                                <div key={i} className='flex ps-7 gap-5 items-center pb-2 text-[14px] text-neutral-500 font-semibold'>

                                    <input
                                        type="checkbox"
                                        onChange={() => handleFilter(item._MetarialName, selectedMaterial, setSelectedMaterial)}
                                    />
                                    <p> {item._MetarialName} </p>

                                </div>
                            ))}







                        </div>
                        <h4 className='text-[22px] text-neutral-800 pb-2 font-semibold font-serif'>Color</h4>
                        <div className='max-w-full custom-scroll h-50 border-b-1 border-neutral-200 overflow-y-auto'>
                            {color.colorres?.map((item, i) => (
                                <div key={i} className='flex ps-7 gap-5 items-center pb-2 text-[14px] text-neutral-500 font-semibold'>

                                    <input
                                        type="checkbox"
                                        onChange={() => handleFilter(item._ColorName, selectedColor, setSelectedColor)}

                                    />
                                    <p> {item._ColorName} </p>

                                </div>
                            ))}

                        </div>
                        <h4 className='text-[22px] mt-3 text-neutral-800 pb-2 font-semibold font-serif'>Price</h4>
                        <div className='max-w-full border-b border-neutral-200 pb-4'>
                            <input
                                type="range"
                                min={minPrice}
                                max="500000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full  accent-yellow-500 px-2 py-2"
                            />
                            <div className='flex justify-between'>

                                <p>₹{minPrice}</p>
                                <p>₹{maxPrice}</p>
                            </div>
                        </div>

                    </div>







                    <div className='  col-span-3 pl-3'>
                        <div className='border flex justify-end items-center text-[13px] gap-3  text-neutral-500 font-semibold border-neutral-200 py-3 px-2'>
                            <p className='font-serif'>Sort By  :  </p> 
                            
                            <div onClick={() => setfilter(!filter)} className=' cursor-pointer border-1 border-neutral-300 py-1 px-4 relative group flex items-center gap-2' > Sort By <IoIosArrowDown />

                                <div className={`w-50 bg-white  ${filter ? 'scale-100' : 'scale-0'}  duration-200 ease-in origin-top-left   rounded absolute -left-0.5 top-7 border-1 border-neutral-200`}>
                                    <ul>
                                        {
                                            filterarrey.map((v, i) => (
                                                <li key={i}

                                                    onClick={() => {
                                                        const val = String(i + 1);

                                                        if (val === "5" || val === "6") {
                                                            setSortType(val); // ✅ sorting
                                                        } else {
                                                            setslectedtype([val]); // ✅ filter
                                                        }
                                                    }}
                                                    className=' text-[13px] font-medium text-neutral-400 
                                                
                                                
                                                
                                                
                                                hover:bg-neutral-100  py-2 px-2 rounded  cursor-pointer' value={i + 1}> {v} </li>
                                            ))
                                        }

                                    </ul>
                                </div>


                            </div>
                            <p>
                                Showing {filteredData.length} of {data.length} results
                            </p>
                        </div>

                        <div className='grid grid-cols-3 gap-3 pt-5'>



                            {filteredData.length > 0 ? (filteredData?.map((item, i) => (

                                <Card key={i} item={item} productdata={productdata} />
                            ))) : (

                                <div className='w-full col-span-3 bg-yellow-600 text-white font-bold animate-pulse m-2 py-5 text-center'>
                                    <p>No Record Found</p>
                                </div>

                            )}

                        </div>
                    </div>
                </>) : (
                    <div className=" w-full col-span-4   h-full">
                        <div className=" w-full mx-auto text-center">
                            <img
                                src="/my-Order.jpg"
                                alt="No record"
                                className="w-100 mb-4 mx-auto"
                            />
                            <p className="text-gray-500 text-[16px]">No Record Found</p>
                        </div>
                    </div>
                )}



            </div> */}
        </>
    )
}
