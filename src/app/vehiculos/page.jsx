"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rubik, Poppins } from "next/font/google";
import FiltroVehiculos from "@/components/FiltroVehiculos";
import CarCard from "@/components/CarCard.jsx";
import { getCars } from "@/store/slices/car";

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


function Vehiculos() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, []);

  const cars = useSelector((state) => state.cars.showCars);


async function loadProducts() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  return await data;
}

  const router = useRouter();

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    loadProducts().then((data) => setAllProducts(data));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts]);

  let dataToShow = allProducts;
  let quantityPerPage = 12;
  let max = Math.ceil(dataToShow.length / quantityPerPage);
  let pages = [];
  let x = 0;

  while (x < max) {
    x++;
    pages.push(x);
  }

  let data = sliceData(dataToShow, currentPage, quantityPerPage);
  let currentPages = slicePage(pages, currentPage, 2);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < max) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.innerHTML));
  };

  return (
    <>
      <header
        className={`bg-gris_fondo ${rubik} space-y-0 space-x-2.5 p-10 text-center`}>
        <p className="text-[2em]  leading-6">
          <span className="text-naranja_enf">Nuestros </span>
          vehículos
        </p>
      </header>
      <section
        className={`pt-4 ${poppins} mx-[auto] text-[0.8em] bg-gris_frente pb-12`}>
        <p className={`text-[1rem] ${rubik} mb-2 text-center`}>
          Encuentra el vehículo ideal
        </p>
        <FiltroVehiculos />
      </section>
      <section
        className={`pt-4 ${rubik} mx-[auto] text-[0.8em] bg-gris_frente pb-12 place-items-center w-[95%]`}>
        <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-2 gap-y-10">
          {cars?.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Vehiculos;
