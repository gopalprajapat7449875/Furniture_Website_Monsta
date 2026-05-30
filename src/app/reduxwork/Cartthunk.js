import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// ✅ FETCH PRODUCTS

// ✅ ADD PRODUCT
export const addProduct = createAsyncThunk(
    "cart/addProduct",
    async (productData, thunkAPI) => {

        // ✅ token store se lo
        const token = thunkAPI.getState().userStore.token;

        const apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL;

        const res = await axios.post(
            `${apibaseurl}cart/addtocart`,
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
