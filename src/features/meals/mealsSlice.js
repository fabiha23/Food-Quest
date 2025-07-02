import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meals: [],
  loading: false,
  error: null,
  searchText: "",
  bookmarks: JSON.parse(localStorage.getItem("bookmarks")) || [],
  randomMeals:null
};

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    addBookmark: (state, action) => {
      const exists = state.bookmarks.find(
        (meal) => meal.idMeal === action.payload.idMeal
      );
      if (!exists) {
        state.bookmarks.push(action.payload);
        localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
      }
    },
    setRandomMeal: (state, action) => {
      state.randomMeal = action.payload;
    },
  },
});

export const { setMeals, setLoading, setError, setSearchText, addBookmark,setRandomMeal } =
  mealsSlice.actions;

export default mealsSlice.reducer;
