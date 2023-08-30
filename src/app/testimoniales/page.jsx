import { Rubik, Poppins } from "next/font/google";
import TestCard from "@/components/TestCard";
import OpinionForm from "@/components/OpinionForm";

const fontRubik = Rubik({
  weight: "600",
  subsets: ["latin"],
});

const fontPoppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});
const poppins = fontPoppins.className;
const rubik = fontRubik.className;

const testimonio = {
  name: "Juanito Perez",
  profession: "Abogado",
  rating: 5,
  image:
    "https://img.freepik.com/foto-gratis/chico-worldface-espanol-fondo-blanco_53876-137665.jpg?w=360",
  description:
    "Nunca habiamos rentado un auto antes, pero luego de haber puesto nuestro voto de confianza en esta pagina es una experiencia que quiero repetir cada que tenga vacaciones",
};

const arr = [1, 2, 3, 4];

function Testimoniales() {
  return (
    <div className="bg-white">
      <div>
        <h2 className={`${poppins} text-4xl p-10 bg-gray-400 sm:text-6xl`}>
          Testimoniales
        </h2>
      </div>
      <div>
        {arr.map((numero) => {
          return (
            <TestCard
              key={testimonio.name}
              name={testimonio.name}
              profession={testimonio.profession}
              rating={testimonio.rating}
              description={testimonio.description}
              image={testimonio.image}
            />
          );
        })}
      </div>
      <OpinionForm />
    </div>
  );
}

export default Testimoniales;
