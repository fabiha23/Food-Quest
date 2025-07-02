import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import axios from "axios";
import { Element } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { setError, setMeals } from "../features/meals/mealsSlice";

const FeaturedMeals = () => {
  const dispatch = useDispatch();
  const { meals,error } = useSelector((state) => state.meals);
  const listRef = useRef(null);

  useEffect(() => {
    axios("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken")
      .then((res) => {
        if (res?.data?.meals) {
          dispatch(setMeals(res?.data?.meals));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch featured meals:", err);
        dispatch(setError('failed to fecth meal'))
      });
  }, [meals,dispatch]);

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
    <div className="py-10">
      <h2 className="text-4xl font-extrabold text-center text-primary mb-8">
        Featured Meals
      </h2>

      {error ? (
        <p className="text-center text-error font-semibold mb-8">
          {error}
        </p>
      ) : (
        <div className="overflow-hidden py-4 lg:py-8">
          <div className="flex w-max" ref={listRef}>
            {[...(meals || []), ...(meals || [])].map((meal, index) => (
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
      )}

      <p className="text-center text-accent text-sm mt-12 font-semibold">
        Designed & Developed by Fabiha Amatullah | GitHub:{" "}
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
