function Loading() {
  return (
    <main className=" min-h-[800px] bg-gris_fondo grid place-content-center">
      <picture className="w-[300px] h-[300px] rounded-full bg-white grid place-content-center">
        <img
          src="https://drive.google.com/uc?export=download&id=1cX-x7mjrHSzhD23I-KbuwszEyNlXoxzR"
          className="w-[150px]"
        />
        <p className="font-bold text-center">Cargando</p>
      </picture>
    </main>
  );
}

export default Loading;
