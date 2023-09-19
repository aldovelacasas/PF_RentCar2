import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "@/store/slices/car";
import CarCardDetail from "@/components/CarCardDetail";
import CarCard from "@/components/CarCard.jsx";
import FormRent from "@/components/FormRent";
import { useAuth } from "../app/context/AuthContext";

function CarCarousel() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getCars());
  }, []);
  const [visibility, setVisibility] = useState(false);
  const [detailVisibility, setDetailVisibility] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailData, setDetailData] = useState();

  const cars = useSelector((state) => state.cars.showCars);
  let data = cars.filter((c) => c.type === "Sedan");

  function handleVisibility(data) {
    setDetailData(data);
    setVisibility(!visibility);
    if (document.body.classList.length === 1) {
      document.body.classList.toggle("stopScroll");
    } else if (!detailVisibility) {
      document.body.classList.remove("stopScroll");
    }
  }

  function handleDetail(data) {
    setDetailData(data);
    handleDetailVisibility();
  }

  function handleDetailVisibility() {
    setDetailVisibility(!detailVisibility);
    document.body.classList.toggle("stopScroll");
  }

  return (
    <section className="w-auto h-[420px] overflow-hidden">
      <div className=" flex w-[calc(250px*28)] items-center h-[400px] hover:pause gap-4 px-2 animate-[carousel_65s_linear_infinite]">
        {data?.map((car) => {
          return (
            <CarCard
              key={car.id}
              car={car}
              className="w-[290px] "
              handleVisibility={handleVisibility}
              handleDetailVisibility={handleDetail}
              handleDetail={handleDetail}
            />
          );
        })}
        {data?.map((car) => {
          return (
            <CarCard
              key={car.id}
              car={car}
              className="w-[290px] "
              handleVisibility={handleVisibility}
              handleDetailVisibility={handleDetailVisibility}
              handleDetail={handleDetail}
            />
          );
        })}
      </div>
      <FormRent
        isAuth={user?.displayName !== undefined}
        visible={visibility}
        car={detailData}
        handleVisible={() => handleVisibility(detailData)}
      />
      <CarCardDetail
        visible={detailVisibility}
        product={detailData}
        handleClose={handleDetail}
        handleRentVisibility={handleVisibility}
      />
    </section>
  );
}

export default CarCarousel;
