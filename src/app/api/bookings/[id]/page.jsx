import BookingForm from "@/components/bookingform"
import { useParams } from "next/navigation";
useParams

function NewPage({productId}) {


  return (
    <div className="flex justify-center items-center h-full ">


      <BookingForm productId={productId} />
     
    </div>
  )
}

export default NewPage;