'use client'

import React, { useEffect, useState } from 'react'
import Login_Heading from '../components/loginpagecomponent/Login-Heading'
import Link from 'next/link'
import ProfilePage from '../components/loginpagecomponent/Profile'
import UpdateAccount from '../components/loginpagecomponent/UpdateAccount'

export default function MyAccount() {


  return (
    <div className="min-h-screen bg-gray-100">

      <Login_Heading />
<ProfilePage/>
<UpdateAccount/>

    

     
    </div>
  )
}