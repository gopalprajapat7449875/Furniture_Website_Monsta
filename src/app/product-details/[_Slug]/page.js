import React from 'react'
import DetailHeading from '../../components/product-detail/Detail-Heading'
import ProductDetail from '../../components/product-detail/Product-Detail'

import RelatedProduct from '../../components/product-detail/RelatedProduct'
import UpsellProduct from '../../components/product-detail/UpsellProduct'
import { Productdata, ProductDetails } from '@/app/services/ProductServices'

export default async function Productdetial({params}) {
  let { _Slug } = await params
  
  


  let prosuctd =await ProductDetails(_Slug)
  let Product=await Productdata()

 
  return (
    <>

      <DetailHeading ProductDetails={prosuctd} />
      <ProductDetail ProductDetails={prosuctd}  />
      <RelatedProduct Product={Product} _Slug={_Slug} />
      <UpsellProduct Product={Product}  />

    </>
  )
}
