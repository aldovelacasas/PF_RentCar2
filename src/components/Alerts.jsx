function Alerts({ children, visible, top = 40 }) {
  if (visible === false) return null;
  return (
    <div className="fixed w-[100vw] left-[0] h-[100vh] top-[0] bg-[#dbdbdbcc] grid">
      <picture
        className={`fixed w-1/2 justify-self-center top-[${top}%] bg-white border-[2px] border-black rounded-2xl pb-6`}>
        <div className="flex flex-wrap flex-col justify-center justify-self-center items-center gap-4 z-[3]">
          {children}
        </div>
      </picture>
    </div>
  );
}

export default Alerts;
