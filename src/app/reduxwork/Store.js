import { configureStore } from "@reduxjs/toolkit"
import UserSlice from "./UserSlice"
import  CartSlice  from "./CartSlice"
import Orderslice  from "./OrderSlice"
import EnqurySlice  from "./EnqurySlice"
import WishlistSlice  from "./WishlistSlice"
export const store = configureStore({
reducer:{
userStore:UserSlice,
CartStore:CartSlice,
OrdreStore:Orderslice,
Enqurystore:EnqurySlice,
Wishliststore:WishlistSlice
}
})