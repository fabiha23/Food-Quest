import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdNoFood } from "react-icons/md";
import MealCard from "./MealCard";
import Seachbar from "./Seachbar";

const SearchFood = () => {
  const [searchText, setSearchText] = useState("");
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchText.trim() === "") {
      setMeals(null);
      setLoading(false); 
      return;
    }
    setLoading(true);

    axios(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((res) => {
        setMeals(res?.data?.meals || []);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setMeals(null);
      })
  }, [searchText]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="py-14">
      <h2 className="text-center font-extrabold sm:text-5xl text-3xl text-primary mb-4">
        What’s Cooking Today?
      </h2>
      <p className="text-center text-primary text-2xl mb-4">
        Search Your Favorite Meal!!
      </p>

        <Seachbar handleSearch={handleSearch} searchText={searchText}></Seachbar>

      <div className="py-6">
        {loading ? (
          <span className="loading loading-spinner text-error loading-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
        ) : searchText.trim() === "" ? (
          <></>
        ) : meals && meals.length > 0 ? (
          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-6">
            {meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          <span className="text-error flex justify-center font-semibold text-2xl gap-2 mt-8">
            <MdNoFood />
            No meals found! Search Some Other meals!
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchFood;
