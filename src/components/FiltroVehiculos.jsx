"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowCars, orderFilter } from "@/store/slices/car";
import { MultiSelect } from "react-multi-select-component";
import DropMenuOrder from "./DropMenuOrder";

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

  const optionsOrden = [
    { label: "Mayor precio", value: "MayorPrecio" },
    { label: "Menor precio", value: "MenorPrecio" },
    { label: "Mayor calificacion", value: "MayorCalificacion" },
    { label: "Menor calificacion", value: "MenorCalificacion" },
  ];

  const [busqueda, setBusqueda] = useState([]);
  const [marca, setMarca] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [capacidad, setCapacidad] = useState([]);
  const [orden, setOrden] = useState("");

  useEffect(() => {
    dispatch(setShowCars({ marca, categoria, capacidad, busqueda }));
  }, [marca, categoria, capacidad, busqueda]);

  const handleOrder = (event) => {
    setOrden(event.target.value); // Actualizamos el estado de orden con el valor seleccionado
    dispatch(orderFilter(event.target.value)); // Enviamos el valor seleccionado al estado global si es necesario
  };

  function handleSearch(e) {
    setBusqueda(e.target.value);
  }

  return (
    <form
      className={`pt-2 text-[0.8em] bg-negro_fondo pb-5 rounded-xl  w-[95%] mx-auto pl-4 justify-center items-center space-y-2 sm:space-y-0 sm:flex sm:flex-wrap text-black dark:text-white`}>
      <div className={`flex  flex-col  sm:w-[20%] w-full`}>
        <label htmlFor="busqueda" className={`text-[1rem] text-white mb-1`}>
          Búsqueda
        </label>
        <input
          type="text"
          className={`bg-white dark:bg-dark_blanco min-w-[80px] w-[95%] rounded h-10  p-2 text-black text-xs`}
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
          closeOnChangedValue={true}
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
      <div className={`flex flex-col  sm:w-[20%] w-full`}>
        <label
          htmlFor="categoria"
          className={`text-[1rem] text-white mb-1 pb-1`}>
          Ordenar por:
        </label>
        <DropMenuOrder></DropMenuOrder>
      </div>
    </form>
  );
}
