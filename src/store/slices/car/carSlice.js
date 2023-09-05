import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCars: [],
  showCars: [],
  searchCars: [],
  modelCars: [],
  categoryCars: [],
  capacityCars: [],
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
      state.searchCars = action.payload.cars;
      state.modelCars = action.payload.cars;
      state.categoryCars = action.payload.cars;
      state.capacityCars = action.payload.cars;
    },
    setShowCars: (state, action) => {
      const { modelo, categoria, capacidad, busqueda } = action.payload;

      if (busqueda === "") {
        state.searchCars = state.allCars;
        state.showCars = state.searchCars;
      } else if (busqueda && busqueda.length > 0) {
        state.showCars = state.allCars.filter((car) =>
          car.name.toLowerCase().includes(busqueda.toLowerCase())
        );
        state.searchCars = state.showCars;
      }

      // Verifica si modelo tiene elementos
      if (modelo && modelo.length > 0) {
        // Filtra los autos cuyo atributo modelo coincida con alguno de los valores seleccionados en modelo
        state.modelCars = state.searchCars.filter((car) =>
          modelo.some((value) => value.value === car.name)
        );
        state.showCars = state.modelCars;
      } else {
        state.modelCars = state.searchCars;
        state.showCars = state.modelCars;
      }

      // Verifica si categoria tiene elementos
      if (categoria && categoria.length > 0) {
        // Filtra los autos cuyo tipo (atributo type) coincida con alguno de los valores seleccionados en categoria
        state.categoryCars = state.modelCars.filter((car) =>
          categoria.some((value) => value.value === car.type)
        );
        state.showCars = state.categoryCars;
      } else {
        // Si no se selecciona ningún tipo en categoria, mostrar todos los autos
        state.categoryCars = state.modelCars;
        state.showCars = state.categoryCars;
      }

      // Verifica si capacidad tiene elementos
      if (capacidad && capacidad.length > 0) {
        // Filtra los autos cuyo atributo capacidad coincida con alguno de los valores seleccionados en capacidad
        state.capacityCars = state.categoryCars.filter((car) =>
          capacidad.some((value) => value.value === car.capacity)
        );
        state.showCars = state.capacityCars;
      } else {
        state.capacityCars = state.categoryCars;
        state.showCars = state.capacityCars;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingCars, setCars, setShowCars } = carSlice.actions;
