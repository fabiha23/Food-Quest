import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "../features/meals/mealsSlice.js"

const store = configureStore({
    reducer:{
        meals:mealsReducer
    }
})

export default store;