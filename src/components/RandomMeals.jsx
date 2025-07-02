import React from "react";
import axios from "axios";
import MealCard from "./MealCard";
import { Element } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setRandomMeal,
  setError,
} from "../features/meals/mealsSlice";

const RandomMeals = () => {
  const { randomMeal, loading, error } = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  const handleSurpriseClick = () => {
    dispatch(setLoading(true));
    dispatch(setError(null)); // Clear previous error

    axios("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => {
        const meal = res?.data?.meals?.[0];
        if (meal) {
          dispatch(setRandomMeal(meal));
        } else {
          dispatch(setRandomMeal(null));
          dispatch(setError("No meal found."));
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.error("Error fetching random meal:", err);
        dispatch(setRandomMeal(null));
        dispatch(setError("Failed to fetch random meal. Please try again."));
        dispatch(setLoading(false));
      });
  };

  return (
    <Element name="random">
      <div className="py-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-primary mb-3">
            Feeling Adventurous?
          </h2>
          <p className="text-primary mb-6">
            Let us pick a random dish for you to try!
          </p>
          <button
            onClick={handleSurpriseClick}
            className="group bg-secondary hover:bg-error font-bold py-3 px-7 rounded-full shadow-sm transition-all duration-300 text-xl text-base-100 cursor-pointer hover:scale-102"
          >
            <span className="transform group-hover:rotate-120 inline-block transition duration-300 mr-2">
              🎲
            </span>
            Surprise Me!
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mt-8">
            <span className="loading loading-spinner loading-xl text-error"></span>
          </div>
        )}

        {/* Error Message */}
        {!loading && error && (
          <p className="text-center text-error mt-6 font-medium">{error}</p>
        )}

        {/* Random Meal Card */}
        {!loading && randomMeal && !error && (
          <div className="max-w-sm mx-auto">
            <MealCard meal={randomMeal} />
          </div>
        )}
      </div>
    </Element>
  );
};

export default RandomMeals;
