import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCars: [],
  showCars: [],
  searchCars: [],
  deletedCars: [],
  modelCars: [],
  categoryCars: [],
  capacityCars: [],
  isLoading: false,
  modelos: [],
  categorias: [],
  marcas: [],
  capacidad: [],
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
      state.deletedCars = action.payload.cars.filter((c) => c.capacity === 0);
      state.showCars = action.payload.cars.filter((c) => c.capacity !== 0);
      state.searchCars = action.payload.cars;
      state.modelCars = action.payload.cars;
      state.categoryCars = action.payload.cars;
      state.capacityCars = action.payload.cars;
    },
    setModels: (state, action) => {
      const allCars = state.allCars;
      const uniqueModels = new Set(allCars.map((car) => car.model));
      const uniqueCategory = new Set(allCars.map((car) => car.type));
      const uniqueMarcas = new Set(allCars.map((car) => car.name));
      const uniqueCapacity = new Set(allCars.map((car) => car.capacity));

      state.modelos = Array.from(uniqueModels);
      state.categorias = Array.from(uniqueCategory);
      state.marcas = Array.from(uniqueMarcas);
      state.capacidad = Array.from(uniqueCapacity);
    },
    setShowCars: (state, action) => {
      const { marca, categoria, capacidad, busqueda } = action.payload;

      if (busqueda === "") {
        state.searchCars = state.allCars;
        state.showCars = state.searchCars;
      } else if (busqueda && busqueda.length > 0) {
        state.showCars = state.allCars.filter((car) =>
          car.model.toLowerCase().includes(busqueda.toLowerCase())
        );
        state.searchCars = state.showCars;
      }

      // Verifica si marca tiene elementos
      if (marca && marca.length > 0) {
        // Filtra los autos cuyo atributo marca coincida con alguno de los valores seleccionados en marca
        state.modelCars = state.searchCars.filter((car) =>
          marca.some((value) => value.value === car.name)
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
    orderFilter: (state, action) => {
      // const { MayorPrecio, MenorPrecio, MayorRating, MenorRating } =
      //   action.payload;

      if (action.payload == "MayorPrecio") {
        state.showCars = state.showCars.sort((a, b) => b.price - a.price);
      }
      if (action.payload === "MenorPrecio") {
        state.showCars = state.showCars.sort((a, b) => a.price - b.price);
      }
      if (action.payload == "MayorRating") {
        state.showCars = state.showCars.sort((a, b) => b.rating - a.rating);
      }
      if (action.payload === "MenorRating") {
        state.showCars = state.showCars.sort((a, b) => a.rating - b.rating);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startLoadingCars,
  setCars,
  setShowCars,
  setModels,
  orderFilter,
} = carSlice.actions;
