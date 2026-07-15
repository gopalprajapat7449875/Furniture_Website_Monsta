'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './reduxwork/Store'
import AuthLayout from '../proxy'


export default function Mainlayout({ children }) {
  return (
    <Provider store={store}>
    

        {children}
    
    </Provider>
  )
}
