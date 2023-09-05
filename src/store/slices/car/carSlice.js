import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCars: [],
  showCars: [],
  isLoading: false,
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    startLoadingCars: (state /* action */) => {
      state.isLoading = true;
    },
    setCars: (state, action) => {
      state.isLoading = false;
      state.allCars = action.payload.cars;
      state.showCars = action.payload.cars;
    },
    setShowCars: (state, action) => {
      const { modelo, categoria, capacidad, busqueda } = action.payload;

      // Verifica si categoria tiene elementos
      if (categoria && categoria.length > 0) {
        // Filtra los autos cuyo tipo (atributo type) coincida con alguno de los valores seleccionados en categoria
        state.showCars = state.showCars.filter((car) =>
          categoria.some((value) => value.value === car.type)
        );
      } else {
        // Si no se selecciona ningún tipo en categoria, mostrar todos los autos
        state.showCars = state.allCars;
      }

      // Verifica si capacidad tiene elementos
      if (capacidad && capacidad.length > 0) {
        // Filtra los autos cuyo atributo capacidad coincida con alguno de los valores seleccionados en capacidad
        state.showCars = state.showCars.filter((car) =>
          capacidad.some((value) => value.value === car.capacity)
        );
      }

      // Verifica si modelo tiene elementos
      if (modelo && modelo.length > 0) {
        // Filtra los autos cuyo atributo modelo coincida con alguno de los valores seleccionados en modelo
        state.showCars = state.showCars.filter((car) =>
          modelo.some((value) => value.value === car.name)
        );
      }

      if (busqueda && busqueda.length > 0) {
        state.showCars = state.showCars.filter((car) =>
          car.name.toLowerCase().includes(busqueda.toLowerCase())
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingCars, setCars, setShowCars } = carSlice.actions;
