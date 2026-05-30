import React from 'react'
import CatagoryHeading from '../../../components/catagores/Catgory-Heading'
import CatagoryContent from '../../../components/catagores/Catagory-Content'
import { Productdata } from '@/app/services/ProductServices'
import { Category, Color, Material, Subcategory } from '@/app/services/HomeService'

export default async function product({ params }) {
  let { type, value } = await params

 


  let data = await Productdata()






 let subcategory=await Subcategory()
let category= await Category()
 
 let color=await Color()
 let material=await Material()



  return (
    <>
      <CatagoryHeading value={value} />
      <CatagoryContent material={material} color={color} productdata={data} type={type} value={value} categorydata={category} subcategorydata={subcategory}  />
    </>
  )
}
