import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { PiForkKnife } from "react-icons/pi";
import axios from "axios";
import { Element } from "react-scroll";

const FeaturedMeals = () => {
  const [meals, setMeals] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    axios("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken")
      .then((res) => {
        if (res?.data?.meals) {
          setMeals(res?.data?.meals);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch featured meals:", err);
      });
  }, []);

  useEffect(() => {
    if (listRef.current && meals?.length > 0) {
      gsap.to(listRef.current, {
        xPercent: -50,
        duration: 70,
        ease: "linear",
        repeat: -1,
      });
    }
  }, [meals]);

  return (
    <Element name="featured">
      <div className=" py-10">
        <h2 className="text-4xl font-extrabold text-center text-primary mb-8">
          Featured Meals
        </h2>
        <div className=" overflow-hidden py-4 lg:py-8">
          <div className="flex w-max" ref={listRef}>
            {[...meals, ...meals].map((meal, index) => (
              <div
                key={`${meal?.idMeal}-${index}`}
                className="mx-3 rounded-full shadow-md overflow-hidden"
              >
                <img
                  className="lg:w-50 lg:h-50 md:w-40 md:h-40 w-30 h-30 object-cover rounded-md"
                  src={meal?.strMealThumb}
                  alt={meal?.strMeal}
                />
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-accent text-sm mt-10 font-semibold">
          Designed & Developed by Fabiha Amatullah | GitHub: 
          <a
            href="https://github.com/fabiha23"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            fabiha23
          </a>
        </p>
      </div>
    </Element>
  );
};

export default FeaturedMeals;
