function Alerts({ children, visible }) {
  console.log(visible);
  if (visible === false) return null;
  return (
    <div className="fixed w-[100vw] left-[0] h-[100vh] top-[0] bg-[#dbdbdbcc] grid">
      <picture className="fixed w-1/2 justify-self-center top-[40%] bg-gris_frente border-[2px] border-black rounded-2xl pb-6">
        <div className="flex flex-wrap flex-col items-center gap-4 z-[3]">
          {children}
        </div>
      </picture>
    </div>
  );
}

export default Alerts;
