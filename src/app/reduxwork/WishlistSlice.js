import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'






export const fetchwish = createAsyncThunk(
    "wishlist/fetchwish",
    async () => {
        const token = Cookies.get("token");


        const apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL;



        const res = await axios.post(`${apibaseurl}wishlist/view`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        return res.data ?? null;
    }
);

export const DeleteItem = createAsyncThunk(
    "wishlist/DeleteItem",
    async (productData) => {

        const token = Cookies.get("token");


        const apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL;



        const res = await axios.post(`${apibaseurl}wishlist/delete`, { _id: productData },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        return res.data ?? null;


    }

);
export const addwishlist = createAsyncThunk(
    "wishlist/addwishlist",
    async (productData, thunkAPI) => {

        // ✅ token store se lo
        const token = thunkAPI.getState().userStore.token;

        const apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL;

        const res = await axios.post(
            `${apibaseurl}wishlist/add`,
            productData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data ?? null;
    }
);


// fetchCart()
const WishlistSlice = createSlice({
    name: "wishlist",

    initialState: {
        
       wishdata:[],
        delete: null,
      
      add:null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // 🔹 FETCH
            .addCase(fetchwish.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchwish.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(fetchwish.fulfilled, (state, action) => {
                state.wishdata = action.payload

                // update 
            })
            
            .addCase(DeleteItem.fulfilled, (state, action) => {
                state.delete = action.payload


            })
            .addCase(addwishlist.fulfilled, (state, action) => {
                state.add = action.payload
                console.log(action.payload)
               


            });
    },
});

export default WishlistSlice.reducer;