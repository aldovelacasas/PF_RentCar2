/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTest } from "@/store/slices/testimonio";
import TestCard from "./TestCard";

function getRandomTestimonies(arr, num) {
  const arrCopy = [...arr];
  const shuffled = arrCopy.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export default function Reviews() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTest());
  }, []);
  const testimoniesQuantity = 14;

  let testimonies = useSelector((state) => state.testimonies.testimonies);
  testimonies = getRandomTestimonies(testimonies, testimoniesQuantity);

  return (
    <div className="flex flex-col items-center pb-8">
      {testimonies?.map((testimony) => {
        return (
          <TestCard
            key={testimony.name}
            name={testimony.name}
            profession={testimony.profession}
            rating={testimony.rating}
            description={testimony.description}
            image={testimony.image}
          />
        );
      })}
    </div>
  );
}
