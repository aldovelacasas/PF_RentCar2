import Image from "next/image";
/* eslint-disable jsx-a11y/alt-text */

function Loading() {
  return (
    <main className=" min-h-[800px] bg-gris_fondo dark:bg-dark_fondo grid place-content-center">
      <picture className="w-[300px] h-[300px] rounded-full bg-white grid place-content-center">
        <Image src="/Loader.gif" width={150} height={100} alt="Gif loader" />
        <p className="font-bold text-center">Cargando</p>
      </picture>
    </main>
  );
}

export default Loading;
