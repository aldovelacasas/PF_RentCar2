import React from "react";

const WhatsAppButton = ({ phoneNumber }) => {
  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className=" flex flex-wrap items-center gap-6 text-lg mx-auto mb-10 bg-naranja_enf  text-white py-2 px-4 rounded-full shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black">
      <span className="font-bold">WhatsApp</span>
      <img
        src="./Rv.png"
        alt="WhatsApp Logo"
        className="w-[40px] rounded-full"
      />
    </a>
  );
};

export default WhatsAppButton;
