import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { addProduct, fetchProducts } from "./Cartthunk";
import Cookies from 'js-cookie'
export const AddContect = createAsyncThunk(
    "enqury/AddContect",
    async (contect) => {
        const token = Cookies.get("token");


        const apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL;



        const res = await axios.post(`${apibaseurl}enqury/contect`, contect,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        return res.data ;
    }
);
export const AddNewsletter = createAsyncThunk(
    "enqury/AddNewsletter",
    async (newsdata) => {
        const token = Cookies.get("token");


        const apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL;



        const res = await axios.post(`${apibaseurl}enqury/newsletter`, newsdata ,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        return res.data;

    }
)

// fetchCart()
const EnqurySlice = createSlice({
    name: "enqury",

    initialState: {
        contect: null,
        newsletters:null,
       
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            
            .addCase(AddContect.fulfilled, (state, action) => {
                state.contect = action.payload


            })
            .addCase(AddNewsletter.fulfilled, (state, action) => {
                state.newsletters = action.payload


            });
    },
});

export default EnqurySlice.reducer;