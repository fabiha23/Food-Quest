import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaYoutube } from "react-icons/fa";
import axios from "axios";

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        setMeal(res.data.meals[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch meal details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <span className="loading loading-spinner text-error loading-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>);
  if (!meal)
    return <p className="text-center mt-12 text-error">Meal not found.</p>;

  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Image and info */}
        <div>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="rounded-xl w-full object-cover shadow-md"
          />
          <h2 className="text-4xl font-extrabold text-primary mt-4">
            {meal.strMeal}
          </h2>
          <p className="text-accent font-semibold">
            {meal.strCategory} | {meal.strArea}
          </p>
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-error hover:underline font-semibold mt-2"
            >
              <FaYoutube />
              Watch on YouTube
            </a>
          )}
        </div>

        {/* Ingredients and Instructions */}
        <div>
          <h3 className="text-2xl font-bold text-secondary mb-3">
            Ingredients
          </h3>
          <ul className="list-disc list-inside text-base text-base-content space-y-1">
            {ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold text-secondary mt-6 mb-3">
            Instructions
          </h3>
          <p className="text-base leading-relaxed text-base-content whitespace-pre-line">
            {meal.strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
