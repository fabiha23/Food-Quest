import React, { useState } from "react";
import axios from "axios";
import MealCard from "./MealCard"; 
import { Element } from "react-scroll";

const RandomMeals = () => {
  const [randomMeal, setRandomMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSurpriseClick = async () => {
    setLoading(true);
    try {
      const res = await axios(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setRandomMeal(res?.data?.meals?.[0]);
    } catch (err) {
      console.error("Error fetching random meal:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Element name="random">
      <div className="py-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-brown-800 mb-3 text-primary">
            Feeling Adventurous?
          </h2>
          <p className="text- text-primary mb-6">
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

        {loading && (
          <div className="flex justify-center mt-8">
            <span className="loading loading-spinner loading-xl text-error"></span>
          </div>
        )}

        {!loading && randomMeal && (
          <div className="max-w-sm mx-auto">
            <MealCard meal={randomMeal} />
          </div>
        )}
      </div>
    </Element>
  );
};

export default RandomMeals;
