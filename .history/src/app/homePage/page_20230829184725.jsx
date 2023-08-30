import { Rubik, Poppins } from "next/font/google";

const rubik = Rubik({
  weight: "600",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

function HomePage() {
  return (
    <div className={`bg-amarillo_status ${rubik.className}`}>
      <h1 className="text-[5em]">Hola k ase</h1>
      <div>
        <p className={`${poppins.className}`}>Adio k ase</p>
      </div>
    </div>
  );
}

export default HomePage;
