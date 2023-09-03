"use client"
import {useRef, useState} from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

function BookingForm({productId}) {
  console.log(productId);
  
    const [booking,setBooking]=useState({
        userID:"",
        productID:"",
        fecha_inicio:"",
        fecha_fin:"",
    })


    const form =useRef(null);
    const router = useRouter()

    


     
     //await conn.query("SELECT * FROM product WHERE product.id=productID;")
  

    const handleChange = (e) => {
      setBooking({
      ...booking,
      [e.target.userID]: e.target.value
      })
      }

      const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(booking);

      const res = await axios.post("/api/bookings", booking)
      console.log(res);
      form.current.reset();
      router.push("/bookings")
      }

  return (
    <form className='bg-white shadow-md rounded-md px-8 pt-4 pb-4 mb-4' 
    onSubmit={handleSubmit}
    ref={form}
    >
      
  
    <div className="grid grid-cols-2 gap-3">
      
      <div>
        <p>{productId}</p>
      </div>

      <div>
        <label htmlFor="fecha_inicio" className='block text-gray-700 text-sm font-bold mb-2'>Fecha Inicial</label>
        <input name="fecha_inicio" type="date" placeholder="Ingresa un fecha inicial" onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3'
        />
      </div>
      <div>
        <label htmlFor="fecha_fin" className='block text-gray-700 text-sm font-bold mb-2'>Fecha Final</label>
        <input name="fecha_fin" type="date" placeholder="Ingresa una fecha de final" onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3'
        />
      </div>
      <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded'>
        Save Booking
      </button>
    </div>
  </form>
  
     )
}

export default BookingForm