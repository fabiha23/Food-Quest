import React, { useState } from "react";
import { Link } from "react-router";
import { FaBookmark, FaGlobeAsia, FaRegBookmark } from "react-icons/fa";
import { PiForkKnife } from "react-icons/pi";

const MealCard = ({ meal, handleBookmark, bookmarks }) => {
  const isBookmarked = bookmarks?.find((m) => m?.idMeal === meal?.idMeal);

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 shadow-base-300 h-full flex flex-col relative">
      <figure className="relative">
        <img
          className="h-70 w-full object-cover rounded-t-lg"
          src={meal?.strMealThumb}
          alt={meal?.strMeal}
        />
        <div
          onClick={() => handleBookmark(meal)}
          className="bg-base-100 absolute top-2 left-2 rounded-full p-2 cursor-pointer"
        >
          {isBookmarked ? (
            <FaBookmark size={22} color="#c92623" />
          ) : (
            <FaRegBookmark size={22} color="#c92623" />
          )}
        </div>
      </figure>

      <div className="p-3 px-4 flex-grow">
        <div className="flex justify-between flex-wrap gap-2 font-semibold">
          <p className="flex items-center gap-1">
            <PiForkKnife />
            {meal?.strCategory}
          </p>
          <p className="text-primary flex items-center gap-1">
            <FaGlobeAsia />
            {meal?.strArea}
          </p>
        </div>
        <h2 className="card-title text-2xl font-bold text-accent mt-3">
          {meal?.strMeal}
        </h2>
        <Link to={`/meal/${meal.idMeal}`}>
          <div className="bg-primary text-base-100 text-center py-2 mt-4 rounded-lg cursor-pointer font-semibold hover:bg-secondary transition duration-300">
            View Recipe
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MealCard;
