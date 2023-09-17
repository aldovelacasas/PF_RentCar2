import { useState } from "react";
import promoUno from "../images/PromocionUno.jpg";
import promoDos from "../images/PromocionDos.jpg";
import promoTres from "../images/PromocionTres.jpg";
import Image from "next/image";

function PromoCarousel() {
  let nextImage;
  let imageStack = [promoUno, promoDos, promoTres];
  const [currImage, setCurrImage] = useState(0); // first image
  const [timerActive, setTimerActive] = useState(true);

  if (timerActive === true) {
    nextImage = setTimeout(() => handleNextIndex(), 5000);
  }

  function handlePrevIndex() {
    currImage === 0
      ? setCurrImage(imageStack.length - 1)
      : setCurrImage(currImage - 1);
  }

  function handleNextIndex() {
    currImage === imageStack.length - 1
      ? setCurrImage(0)
      : setCurrImage(currImage + 1);
  }

  let indexes = [];
  let x = 0;
  while (x < imageStack.length) {
    indexes.push(x);
    x++;
  }

  function handleActive(value) {
    if (value === false) {
      clearTimeout(nextImage);
    }
    setTimerActive(value);
  }

  return (
    <section
      onMouseEnter={() => handleActive(false)}
      onMouseLeave={() => handleActive(true)}
      className="flex mx-[auto] w-[80vw]">
      <button
        onClick={handlePrevIndex}
        className="rotate-180 dark:text-black  md:px-4 bg-gris_fondo hover:bg-negro_fondo md:text-[2em] hover:text-white active:bg-white">
        ➤
      </button>
      <div className="relative flex justify-center">
        <Image
          src={imageStack[currImage]}
          alt={`imagen número ${currImage + 1} de vehículos`}
          className="w-full  object-scale-down object-bottom"
        />
        <div className="absolute bottom-4 bg-gris_fondo rounded-md opacity-75">
          {indexes?.map((i) => {
            return (
              <span
                key={i}
                onClick={() => setCurrImage(i)}
                className={` px-2 py-1 ${
                  currImage === i ? "text-black" : "text-white"
                } cursor-pointer`}>
                ⬤
              </span>
            );
          })}
        </div>
      </div>
      <button
        onClick={handleNextIndex}
        className=" md:px-4 dark:text-black bg-gris_fondo hover:bg-negro_fondo md:text-[2em] hover:text-white active:bg-white">
        ➤
      </button>
    </section>
  );
}

export default PromoCarousel;
