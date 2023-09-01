"use client"
import BookingForm from "@/components/bookingform"

import { useRouter } from "next/navigation"
import React from 'react'

function Buttons({productId}) {
    
  const router=useRouter()
  
  console.log(productId);
    return (
    
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"  onClick={() => {
            router.push(`/bookings/${productId}`);
          }} >
            Rentar
        </button>

  )
}