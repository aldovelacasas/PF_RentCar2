function Alerts({ children, visible, top = 40 }) {
  if (visible === false) return null;
  return (
    <div className="fixed w-[100vw] left-[0] h-[100vh] top-[0] bg-[#dbdbdbcc] grid text-black dark:text-white">
      <picture
        className={`fixed w-1/2 justify-self-center top-[${top}%] bg-white dark:bg-dark_blanco border-[1px] border-black rounded-2xl pb-6`}>
        <div className="flex flex-wrap flex-col justify-center justify-self-center items-center gap-4 z-[3]">
          {children}
        </div>
      </picture>
    </div>
  );
}

export default Alerts;
