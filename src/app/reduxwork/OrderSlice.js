import { createSlice } from '@reduxjs/toolkit'


export const Orderslice = createSlice({
    name: 'order',
    initialState: {
        orderdata: [],

    },

    reducers: {

        setorderdata: (state, action) => {
            state.orderdata = action.payload

console.log(action.payload)
        }

    },
})

export const { setorderdata} = Orderslice.actions

export default Orderslice.reducer