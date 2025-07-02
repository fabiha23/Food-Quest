import React, { useEffect } from "react";
import axios from "axios";
import { MdNoFood } from "react-icons/md";
import Seachbar from "./Seachbar";
import MealCard from "./MealCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  setMeals,
  setSearchText,
  addBookmark,
} from "../features/meals/mealsSlice";

const SearchFood = () => {
  const dispatch = useDispatch();
  const { meals, loading, searchText, bookmarks, error } = useSelector(
    (state) => state.meals
  );

  useEffect(() => {
    if (searchText.trim() === "") {
      dispatch(setMeals(null));
      dispatch(setError(null));
      dispatch(setLoading(false));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((res) => {
        const results = res?.data?.meals || [];
        dispatch(setMeals(results));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.error("Search failed:", err);
        dispatch(setMeals(null));
        dispatch(setError("Something went wrong while fetching meals."));
        dispatch(setLoading(false));
      });
  }, [searchText, dispatch]);

  const handleSearch = (e) => {
    dispatch(setSearchText(e.target.value));
  };

  const handleBookmark = (meal) => {
    dispatch(addBookmark(meal));
  };

  return (
    <div className="py-14">
      <h2 className="text-center font-extrabold sm:text-5xl text-3xl text-primary mb-4">
        What’s Cooking Today?
      </h2>
      <p className="text-center text-primary text-2xl mb-4">
        Search Your Favorite Meal!!
      </p>

      <Seachbar handleSearch={handleSearch} searchText={searchText} />

      <div className="py-6 relative min-h-[150px]">
        {loading ? (
          <span className="loading loading-spinner text-error loading-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
        ) : error ? (
          <p className="text-error text-center text-xl font-semibold mt-8">{error}</p>
        ) : searchText.trim() === "" ? (
          <></>
        ) : meals && meals.length > 0 ? (
          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
            {meals.map((meal) => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
                handleBookmark={handleBookmark}
                bookmarks={bookmarks}
              />
            ))}
          </div>
        ) : (
          <span className="text-error flex justify-center font-semibold text-2xl gap-2 mt-8">
            <MdNoFood />
            No meals found! Try searching something else.
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchFood;
