import React from 'react'
import CartHeding from '../components/shoping-cart/Cart-Heding'
import CartDetail from '../components/shoping-cart/CartDetail'
import { Componydata } from '../services/componyServises'



export default async function page() {

  let componydata=await Componydata()
  return (
  <>
<CartHeding/>
  <CartDetail componydata={componydata} />
  </>
  )
}
