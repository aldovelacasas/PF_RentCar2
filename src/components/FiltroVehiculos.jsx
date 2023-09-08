"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowCars } from "@/store/slices/car";
import { MultiSelect } from "react-multi-select-component";

export default function FiltroVehiculos() {
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.cars.categorias);
  const marcas = useSelector((state) => state.cars.marcas);
  const capacidades = useSelector((state) => state.cars.capacidad);

  // console.log(categorias);

  const optionsCategorias = categorias.map((categoria) => ({
    label: categoria,
    value: categoria,
  }));

  const optionsMarcas = marcas.map((modelo) => ({
    label: modelo,
    value: modelo,
  }));

  const optionsCapacidades = capacidades?.map((capacidad) => ({
    label: capacidad,
    value: capacidad,
  }));

  const [busqueda, setBusqueda] = useState([]);
  const [marca, setMarca] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [capacidad, setCapacidad] = useState([]);

  useEffect(() => {
    dispatch(setShowCars({ marca, categoria, capacidad, busqueda }));
  }, [marca, categoria, capacidad, busqueda]);

  function handleSearch(e) {
    setBusqueda(e.target.value);
  }

  return (
    <form
      className={`pt-2 text-[0.8em] bg-negro_fondo pb-5 rounded-xl  w-[95%] mx-auto pl-4 justify-center items-center space-y-2 sm:space-y-0 sm:flex sm:flex-wrap`}>
      <div className={`flex  flex-col  sm:w-[20%] w-full`}>
        <label htmlFor="busqueda" className={`text-[1rem] text-white mb-1`}>
          Búsqueda
        </label>
        <input
          type="text"
          className={`bg-white min-w-[80px] w-[95%] rounded h-10  p-2 text-black text-xs`}
          placeholder="Nombre Vehiculo"
          onChange={handleSearch}
        />
      </div>
      <div className={`flex flex-col sm:w-[20%] w-full`}>
        <label htmlFor="Modelo" className={`text-[1rem] text-white mb-1`}>
          Marca
        </label>

        <MultiSelect
          options={optionsMarcas}
          value={marca}
          onChange={setMarca}
          labelledBy="Modelo"
          className={` min-w-[80px] max-w-[95%] rounded py-1`}
          overrideStrings={{
            allItemsAreSelected: "Todos los modelos",
            clearSearch: "Limpiar busqueda",
            clearSelected: "Limpiar seleccion",
            noOptions: "No hay opciones",
            search: "Buscar",
            selectAll: "Seleccionar Todo",
            selectAllFiltered: "Select All (Filtered)",
            selectSomeItems: "Seleccionar...",
            create: "Crear",
          }}
        />
      </div>
      <div className={`flex flex-col sm:w-[20%] w-full`}>
        <label htmlFor="categoria" className={`text-[1rem] text-white mb-1`}>
          Categoría
        </label>

        <MultiSelect
          options={optionsCategorias}
          value={categoria}
          onChange={setCategoria}
          labelledBy="Select"
          className={` min-w-[80px] max-w-[95%] rounded py-1`}
          overrideStrings={{
            allItemsAreSelected: "Todas las categorias",
            clearSearch: "Limpiar busqueda",
            clearSelected: "Limpiar seleccion",
            noOptions: "No hay opciones",
            search: "Buscar",
            selectAll: "Seleccionar Todo",
            selectAllFiltered: "Select All (Filtered)",
            selectSomeItems: "Seleccionar...",
            create: "Crear",
          }}
        />
      </div>
      <div className={`flex flex-col  sm:w-[20%] w-full`}>
        <label htmlFor="categoria" className={`text-[1rem] text-white mb-1`}>
          Capacidad
        </label>
        <MultiSelect
          options={optionsCapacidades}
          value={capacidad}
          onChange={setCapacidad}
          labelledBy="Capacidad"
          className={` min-w-[80px] max-w-[95%] rounded py-1`}
          overrideStrings={{
            allItemsAreSelected: "Todas las capacidades",
            clearSearch: "Limpiar busqueda",
            clearSelected: "Limpiar seleccion",
            noOptions: "No hay opciones",
            search: "Buscar",
            selectAll: "Seleccionar Todo",
            selectAllFiltered: "Select All (Filtered)",
            selectSomeItems: "Seleccionar...",
            create: "Crear",
          }}
        />
      </div>
    </form>
  );
}
