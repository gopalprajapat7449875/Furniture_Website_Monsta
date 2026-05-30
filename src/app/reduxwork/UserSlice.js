import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { componydata } from '../services/componyServises'




export const loginSlice = createSlice({
  name: 'user',
  initialState:{
    token:  Cookies.get('token') || null,
   
    userdata:null,
    userpath:'',
  },
  
  reducers: {
    setToken:(state,action)=>{
        state.token=action.payload
        console.log(state.token)
        Cookies.set('token', state.token,{ expires: 7 })
    },
    logOut:(state)=>{
        
        state.token=null
        Cookies.remove('token')
    },
     Userdata:(state,action)=>{
        state.userdata=action.payload
     
    },
    UserPath:(state,action)=>{
        state.userpath=action.payload
       
    }
  },
})

export const { setToken,logOut,Userdata,UserPath } = loginSlice.actions

export default loginSlice.reducer