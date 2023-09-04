"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowCars } from "@/store/slices/car";
import { MultiSelect } from "react-multi-select-component";
import { categorias, modelos, capacidades } from "../libs/categorias";

const optionsCategorias = categorias.map((categoria) => ({
  label: categoria.tipo,
  value: categoria.tipo,
}));

const optionsModelos = modelos.map((modelo) => ({
  label: modelo.tipo,
  value: modelo.tipo,
}));

const optionsCapacidades = capacidades.map((capacidad) => ({
  label: capacidad.capacity,
  value: capacidad.capacity,
}));

export default function FiltroVehiculos() {
  const dispatch = useDispatch();

  const [busqueda, setBusqueda] = useState([]);
  const [modelo, setModelo] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [capacidad, setCapacidad] = useState([]);

  useEffect(() => {
    dispatch(setShowCars({ modelo, categoria, capacidad, busqueda }));
  }, [modelo, categoria, capacidad, busqueda]);

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
          Modelo
        </label>

        <MultiSelect
          options={optionsModelos}
          value={modelo}
          onChange={setModelo}
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
