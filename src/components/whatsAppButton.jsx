// WhatsAppButton.js

import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '+543816426399'; // Reemplaza con tu número de teléfono
  const message = 'Hola, quiero saber más sobre los automoviles que rentan'; // Reemplaza con tu mensaje predeterminado

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 right-5 p-0 rounded-full z-10 dark:bg-dark_fondo"
    >
      <img
        src="/Rv.png" // Ruta de tu imagen de WhatsApp
        alt="WhatsApp Icon"
        className="w-16 h-16 rounded-full" // Clases de Tailwind CSS para el tamaño de la imagen
      />
    </button>
  );
};

export default WhatsAppButton;

