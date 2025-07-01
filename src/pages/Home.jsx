import React from "react";
import SearchFood from "../components/SearchFood";
import RandomMeals from "../components/RandomMeals";
import FeaturedMeals from "../components/FeaturedMeals";

const Home = () => {
  return (
    <div>
      <div className="bg-base-200 min-h-md">
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <SearchFood></SearchFood>
        </div>
      </div>
      <div className="bg-base-200 min-h-md">
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <RandomMeals></RandomMeals>
        </div>
      </div>
      <div className="bg-base-200 min-h-md">
        <div className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <FeaturedMeals></FeaturedMeals>
        </div>
      </div>
    </div>
  );
};

export default Home;
