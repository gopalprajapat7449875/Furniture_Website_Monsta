import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { addProduct, fetchProducts } from "./Cartthunk";
import Cookies from 'js-cookie'
import { addProduct } from "./Cartthunk";
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async () => {
        const token = Cookies.get("token");


        const apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL;



        const res = await axios.post(`${apibaseurl}cart/cartitem`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        return res.data ?? null;
    }
);
export const UpdateCart = createAsyncThunk(
    "cart/UpdateCart",
    async (productData) => {
        const token = Cookies.get("token");


        const apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL;



        const res = await axios.post(`${apibaseurl}cart/updatecart`, { productData },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        return res.data ?? null;

    }

);
export const DeleteCartItem = createAsyncThunk(
    "cart/DeleteCartItem",
    async (productData) => {

        const token = Cookies.get("token");


        const apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL;



        const res = await axios.post(`${apibaseurl}cart/deleteitem`, { _id: productData },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        return res.data ?? null;


    }

);
export const CheckoutCartItem = createAsyncThunk(
    "cart/DeleteCartItem",
    async (CheckoutCartItem) => {


        return CheckoutCartItem ??null;


    }

);

// fetchCart()
const CartSlice = createSlice({
    name: "cart",

    initialState: {
        cartdata: null,
        update: null,
        delete: null,
        add:null,
        checkout:null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // 🔹 FETCH
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartdata = action.payload

                // update 
            })
            .addCase(UpdateCart.fulfilled, (state, action) => {
                state.update = action.payload

                // delete product 
            })
            .addCase(DeleteCartItem.fulfilled, (state, action) => {
                state.delete = action.payload


            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.add = action.payload
               


            });
    },
});

export default CartSlice.reducer;