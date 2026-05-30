"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function MapLocation() {

     const[data,setdata]=useState(null)
      const[path,setpath]=useState("")
        
        
      console.log(data)
       
      let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL
       
      
      
        let Componydata=()=>{
            axios.get(`${apibaseurl}home/compony`)
            .then((res) => res.data)
            .then((finalres) =>{
      setdata(finalres.componydata[0])
     
            })
           
        }
        useEffect(()=>{
          Componydata()
        },[])
        
    
    return (
        <>
            <div className=" max-w-[1200px] mx-auto text-center ">


                <iframe
                 className='w-full h-[400px] border-0' 
                   
                 src={data?._ComponyMap}
                 loading="lazy"  
              >

                 </iframe>

            </div>
        </>
    )
}

