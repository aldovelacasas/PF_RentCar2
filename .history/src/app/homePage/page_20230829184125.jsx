import { Rubik, Poppins } from "next/font/google";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

function HomePage() {
  return (
    <div className={`bg-amarillo_status ${rubik}`}>
      <h1 className="text-lg">Hola k ase</h1>
      <div></div>
    </div>
  );
}

export default HomePage;
