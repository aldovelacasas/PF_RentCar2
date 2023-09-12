"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTest } from "@/store/slices/testimonio";
import TestCard from "./TestCard";

export default function Reviews() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTest());
  }, []);

  const testimonios = useSelector((state) => state.testimonies.testimonies);
  return (
    <div className="flex flex-col items-center pb-8">
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
  );
}
