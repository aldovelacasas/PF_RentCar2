import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { Rubik, Poppins } from "next/font/google";
import { getRental, getCars } from "@/store/slices/rental";

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
let completeRentals = {};

function MonthGraph({ visible }) {
  const [aux, setAux] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRental());
    dispatch(getCars());
  }, []);

  let allCars = useSelector((state) => state.rental.allCars);
  let allRentals = useSelector((state) => state.rental.allRentals);

  function createRentalsComplete() {
    completeRentals = allRentals.map((r) => {
      let vehicle = allCars.filter((c) => c.id === r.productID)[0];
      if (vehicle) {
        return {
          ...r,
          vehicle: vehicle.type,
          image: vehicle.image,
          status:
            r.statusB == 1 && new Date() > new Date(r.fecha_fin)
              ? "terminado"
              : r.statusB == 1 && new Date() < new Date(r.fecha_fin)
              ? "activo"
              : "cancelado",
        };
      }
    });
  }

  useEffect(() => {
    if (!allRentals.length || !allCars.length) {
      setAux(true);
    }
  }, [allRentals, allCars]);

  if (aux === true) {
    createRentalsComplete();
    if (completeRentals && completeRentals[1] !== undefined) {
      setAux(!aux);
    }
  }

  let sedanSales = [];
  let suvSales = [];
  let camionetaSales = [];

  if (completeRentals && completeRentals[1] && completeRentals[1].vehicle) {
    sedanSales = completeRentals.filter((r) => r.vehicle === "Sedan");
    suvSales = completeRentals.filter((r) => r.vehicle === "SUV");
    camionetaSales = completeRentals.filter((r) => r.vehicle === "camioneta");
  }

  let currentDay = new Date();
  let currentMonth = currentDay.getMonth() + 1;

  let serieSedan = sortByDays(sedanSales);
  let serieSuv = sortByDays(suvSales);
  let serieCamioneta = sortByDays(camionetaSales);

  function sortByDays(array) {
    if (array.length === 0) return [0, 0, 0, 0, 0, 0];
    let zeroToFive = 0;
    let fiveToTen = 0;
    let tenToFifteen = 0;
    let fifteenToTwenty = 0;
    let twentyToTwentyfive = 0;
    let last = 0;
    array.forEach((r) => {
      if (new Date(r.fecha_inicio) < new Date(`2023-${currentMonth}-5`)) {
        zeroToFive += 1;
      } else if (
        new Date(r.fecha_inicio) < new Date(`2023-${currentMonth}-10`)
      ) {
        fiveToTen += 1;
      } else if (
        new Date(r.fecha_inicio) < new Date(`2023-${currentMonth}-15`)
      ) {
        tenToFifteen += 1;
      } else if (
        new Date(r.fecha_inicio) < new Date(`2023-${currentMonth}-20`)
      ) {
        fifteenToTwenty += 1;
      } else if (
        new Date(r.fecha_inicio) < new Date(`2023-${currentMonth}-25`)
      ) {
        twentyToTwentyfive += 1;
      } else {
        last += 1;
      }
    });
    return [
      zeroToFive,
      fiveToTen,
      tenToFifteen,
      fifteenToTwenty,
      twentyToTwentyfive,
      last,
    ];
  }

  const series = [
    //data on the y-axis
    {
      name: "Sedan",
      data: serieSedan,
    },
    {
      name: "SUV",
      data: serieSuv,
    },
    {
      name: "Camioneta",
      data: serieCamioneta,
    },
  ];

  const options = {
    chart: {
      height: "auto",
      width: "auto",
      type: "line",
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 1,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    title: {
      text: "Rentas del mes",
      align: "left",
      offsetY: 25,
      offsetX: 20,
    },
    subtitle: {
      text: "Ordenadas por tipo de vehículo",
      offsetY: 55,
      offsetX: 20,
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 9,
      },
    },
    grid: {
      show: true,
      padding: {
        bottom: 0,
      },
    },
    labels: [
      `05/${currentMonth}/2023`,
      `10/${currentMonth}/2023`,
      `15/${currentMonth}/2023`,
      `20/${currentMonth}/2023`,
      `25/${currentMonth}/2023`,
      `30/${currentMonth}/2023`,
    ],
    xaxis: {
      tooltip: {
        enabled: false,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: -20,
    },
    responsive: [
      {
        breakpoint: 400,
        options: {
          chart: {
            height: "400px",
            width: "300px",
          },
        },
      },
      {
        breakpoint: 600,
        options: {
          chart: {
            height: "400px",
            width: "400px",
          },
        },
      },
      {
        breakpoint: 800,
        options: {
          chart: {
            height: "400px",
            width: "600px",
          },
        },
      },
      {
        breakpoint: 900,
        options: {
          chart: {
            height: "400px",
            width: "700px",
          },
        },
      },
      {
        breakpoint: 1000,
        options: {
          chart: {
            height: "400px",
            width: "800px",
          },
        },
      },
      {
        breakpoint: 1500,
        options: {
          chart: {
            height: "400px",
            width: "750px",
          },
        },
      },
      {
        breakpoint: 2000,
        options: {
          chart: {
            height: "400px",
            width: "900px",
          },
        },
      },
      {
        theme: {
          mode: "light",
          palette: "palette6",
        },
      },
    ],
  };
  if (visible === false) return null;
  return (
    <figure className="sm:w-full h-[500px] text-black dark:text-white mx-[auto] grid place-content-center bg-white dark:bg-gris_fondo rounded-lg shadow-md shadow-black">
      {typeof window !== undefined && (
        <Chart options={options} series={series} className="w-full" />
      )}
      <section className="grid w-full">
        <ul className="flex flex-wrap justify-evenly items-baseline w-full">
          <li className="text-[0.8em] text-black">
            <span className="w-[10px] h-[10px] mr-2 inline-block rounded-full bg-[#008ffb]" />
            Sedan: {sedanSales.length}
          </li>
          <li className="text-[0.8em] text-black">
            <span className="w-[10px] h-[10px] mr-2 inline-block rounded-full bg-[#00e396]" />
            SUV: {suvSales.length}
          </li>
          <li className="text-[0.8em] text-black">
            <span className="w-[10px] h-[10px] mr-2 inline-block rounded-full bg-[#feb019]" />
            Camioneta: {camionetaSales.length}
          </li>
          <li className="text-[1em] text-black mt-2 font-bold">
            Total: {camionetaSales.length + suvSales.length + sedanSales.length}
          </li>
        </ul>
      </section>
    </figure>
  );
}

export default MonthGraph;
