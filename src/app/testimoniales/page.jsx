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

const testimonios = [
  {
    name: "Laura Hernández",
    profession: "Psicóloga",
    rating: 4,
    image:
      "https://img.freepik.com/foto-gratis/retrato-mujer-feliz-sonriente_1303-10006.jpg?w=360",
    description:
      "Me encantó la experiencia de alquilar un auto a través de esta plataforma. Los vehículos son modernos y cómodos. El proceso de reserva es rápido y eficiente. Definitivamente volveré a utilizar sus servicios en mi próximo viaje.",
  },
  {
    name: "Carlos Ramírez",
    profession: "Empresario",
    rating: 5,
    image:
      "https://img.freepik.com/foto-gratis/retrato-hombre-negocios-sonriente_23-2148216635.jpg?w=360",
    description:
      "Desde que descubrí este servicio de renta de autos, no he vuelto a considerar otra opción. La calidad de los vehículos, combinada con la amabilidad del personal, crea una experiencia de cliente excepcional. Recomiendo ampliamente esta plataforma.",
  },
  {
    name: "Isabel Torres",
    profession: "Periodista",
    rating: 3,
    image:
      "https://img.freepik.com/foto-gratis/mujer-joven-sonriente-mirando-camara_23-2148086705.jpg?w=360",
    description:
      "En general, mi experiencia fue satisfactoria. La atención al cliente fue buena y el proceso de alquiler fue sencillo. Sin embargo, creo que podrían mejorar en la limpieza de los vehículos antes de entregarlos a los clientes.",
  },
  {
    name: "Juanito Perez",
    profession: "Abogado",
    rating: 5,
    image:
      "https://img.freepik.com/foto-gratis/chico-worldface-espanol-fondo-blanco_53876-137665.jpg?w=360",
    description:
      "Nunca habíamos rentado un auto antes, pero luego de haber puesto nuestro voto de confianza en esta página es una experiencia que quiero repetir cada que tenga vacaciones",
  },
  {
    name: "María García",
    profession: "Ingeniera",
    rating: 5,
    image:
      "https://img.freepik.com/foto-gratis/retrato-joven-hermosa-mujer-feliz-vestido-azul_176420-18231.jpg?w=360",
    description:
      "La atención al cliente es excepcional. Los vehículos están en excelente estado y el proceso de alquiler fue muy sencillo.",
  },
  {
    name: "Pedro Martinez",
    profession: "Chef",
    rating: 3,
    image:
      "https://img.freepik.com/foto-gratis/retrato-hombre-joven-feliz-tomando-cafe-vaso-llevar_176420-18236.jpg?w=360",
    description:
      "En general, la experiencia fue buena. Sin embargo, creo que podrían mejorar en la rapidez de entrega de los autos.",
  },
  {
    name: "Ana López",
    profession: "Diseñadora",
    rating: 5,
    image:
      "https://img.freepik.com/foto-gratis/retrato-hermosa-mujer-sonriente-feliz_1303-10173.jpg?w=360",
    description:
      "Increíble servicio. Los vehículos están limpios y bien mantenidos. Recomiendo esta plataforma a todos mis amigos.",
  },
  {
    name: "Luis Rodríguez",
    profession: "Estudiante",
    rating: 2,
    image:
      "https://img.freepik.com/foto-gratis/retrato-estudiante-feliz-con-libros_23-2148177946.jpg?w=360",
    description:
      "Tuve algunos problemas con la reserva y no recibí el vehículo que había seleccionado. Esperaba una mejor experiencia.",
  },
  {
    name: "Laura Hernández",
    profession: "Psicóloga",
    rating: 4,
    image:
      "https://img.freepik.com/foto-gratis/retrato-mujer-feliz-sonriente_1303-10006.jpg?w=360",
    description:
      "Me encantó la experiencia de alquilar un auto a través de esta plataforma. Los vehículos son modernos y cómodos. El proceso de reserva es rápido y eficiente. Definitivamente volveré a utilizar sus servicios en mi próximo viaje.",
  },
  {
    name: "Carlos Ramírez",
    profession: "Empresario",
    rating: 5,
    image:
      "https://img.freepik.com/foto-gratis/retrato-hombre-negocios-sonriente_23-2148216635.jpg?w=360",
    description:
      "Desde que descubrí este servicio de renta de autos, no he vuelto a considerar otra opción. La calidad de los vehículos, combinada con la amabilidad del personal, crea una experiencia de cliente excepcional. Recomiendo ampliamente esta plataforma.",
  },
  {
    name: "Isabel Torres",
    profession: "Periodista",
    rating: 3,
    image:
      "https://img.freepik.com/foto-gratis/mujer-joven-sonriente-mirando-camara_23-2148086705.jpg?w=360",
    description:
      "En general, mi experiencia fue satisfactoria. La atención al cliente fue buena y el proceso de alquiler fue sencillo. Sin embargo, creo que podrían mejorar en la limpieza de los vehículos antes de entregarlos a los clientes.",
  },
  {
    name: "Juanito Perez",
    profession: "Abogado",
    rating: 5,
    image:
      "https://img.freepik.com/foto-gratis/chico-worldface-espanol-fondo-blanco_53876-137665.jpg?w=360",
    description:
      "Nunca habíamos rentado un auto antes, pero luego de haber puesto nuestro voto de confianza en esta página es una experiencia que quiero repetir cada que tenga vacaciones",
  },
  {
    name: "María García",
    profession: "Ingeniera",
    rating: 5,
    image:
      "https://img.freepik.com/foto-gratis/retrato-joven-hermosa-mujer-feliz-vestido-azul_176420-18231.jpg?w=360",
    description:
      "La atención al cliente es excepcional. Los vehículos están en excelente estado y el proceso de alquiler fue muy sencillo.",
  },
  {
    name: "Pedro Martinez",
    profession: "Chef",
    rating: 3,
    image:
      "https://img.freepik.com/foto-gratis/retrato-hombre-joven-feliz-tomando-cafe-vaso-llevar_176420-18236.jpg?w=360",
    description:
      "En general, la experiencia fue buena. Sin embargo, creo que podrían mejorar en la rapidez de entrega de los autos.",
  },
  {
    name: "Ana López",
    profession: "Diseñadora",
    rating: 5,
    image:
      "https://img.freepik.com/foto-gratis/retrato-hermosa-mujer-sonriente-feliz_1303-10173.jpg?w=360",
    description:
      "Increíble servicio. Los vehículos están limpios y bien mantenidos. Recomiendo esta plataforma a todos mis amigos.",
  },
  {
    name: "Luis Rodríguez",
    profession: "Estudiante",
    rating: 2,
    image:
      "https://img.freepik.com/foto-gratis/retrato-estudiante-feliz-con-libros_23-2148177946.jpg?w=360",
    description:
      "Tuve algunos problemas con la reserva y no recibí el vehículo que había seleccionado. Esperaba una mejor experiencia.",
  },
  {
    name: "Laura Hernández",
    profession: "Psicóloga",
    rating: 4,
    image:
      "https://img.freepik.com/foto-gratis/retrato-mujer-feliz-sonriente_1303-10006.jpg?w=360",
    description:
      "Me encantó la experiencia de alquilar un auto a través de esta plataforma. Los vehículos son modernos y cómodos. El proceso de reserva es rápido y eficiente. Definitivamente volveré a utilizar sus servicios en mi próximo viaje.",
  },
  {
    name: "Carlos Ramírez",
    profession: "Empresario",
    rating: 5,
    image:
      "https://img.freepik.com/foto-gratis/retrato-hombre-negocios-sonriente_23-2148216635.jpg?w=360",
    description:
      "Desde que descubrí este servicio de renta de autos, no he vuelto a considerar otra opción. La calidad de los vehículos, combinada con la amabilidad del personal, crea una experiencia de cliente excepcional. Recomiendo ampliamente esta plataforma.",
  },
  {
    name: "Isabel Torres",
    profession: "Periodista",
    rating: 3,
    image:
      "https://img.freepik.com/foto-gratis/mujer-joven-sonriente-mirando-camara_23-2148086705.jpg?w=360",
    description:
      "En general, mi experiencia fue satisfactoria. La atención al cliente fue buena y el proceso de alquiler fue sencillo. Sin embargo, creo que podrían mejorar en la limpieza de los vehículos antes de entregarlos a los clientes.",
  },
  {
    name: "Juanito Perez",
    profession: "Abogado",
    rating: 5,
    image:
      "https://img.freepik.com/foto-gratis/chico-worldface-espanol-fondo-blanco_53876-137665.jpg?w=360",
    description:
      "Nunca habíamos rentado un auto antes, pero luego de haber puesto nuestro voto de confianza en esta página es una experiencia que quiero repetir cada que tenga vacaciones",
  },
  {
    name: "María García",
    profession: "Ingeniera",
    rating: 5,
    image:
      "https://img.freepik.com/foto-gratis/retrato-joven-hermosa-mujer-feliz-vestido-azul_176420-18231.jpg?w=360",
    description:
      "La atención al cliente es excepcional. Los vehículos están en excelente estado y el proceso de alquiler fue muy sencillo.",
  },
  {
    name: "Pedro Martinez",
    profession: "Chef",
    rating: 3,
    image:
      "https://img.freepik.com/foto-gratis/retrato-hombre-joven-feliz-tomando-cafe-vaso-llevar_176420-18236.jpg?w=360",
    description:
      "En general, la experiencia fue buena. Sin embargo, creo que podrían mejorar en la rapidez de entrega de los autos.",
  },
  {
    name: "Ana López",
    profession: "Diseñadora",
    rating: 5,
    image:
      "https://img.freepik.com/foto-gratis/retrato-hermosa-mujer-sonriente-feliz_1303-10173.jpg?w=360",
    description:
      "Increíble servicio. Los vehículos están limpios y bien mantenidos. Recomiendo esta plataforma a todos mis amigos.",
  },
  {
    name: "Luis Rodríguez",
    profession: "Estudiante",
    rating: 2,
    image:
      "https://img.freepik.com/foto-gratis/retrato-estudiante-feliz-con-libros_23-2148177946.jpg?w=360",
    description:
      "Tuve algunos problemas con la reserva y no recibí el vehículo que había seleccionado. Esperaba una mejor experiencia.",
  },
];

function Testimoniales() {
  return (
    <div className="bg-white">
      <div>
        <header
          className={`bg-gris_fondo flex items-center h-[175px] ${rubik} text-[1em] md:text-[1.5em] pl-[10%] space-y-0 space-x-2.5`}>
          <p className={`text-[1.9em] mt-2 pl-4`}>Testimoniales</p>
        </header>
      </div>
      <div>
        {testimonios.map((testimonio) => {
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
