import React, { useEffect, useState } from "react";
import { MdBookmarkAdded } from "react-icons/md";
import MealCard from "../components/MealCard";

const Bookmarked = () => {
  const [bookmarks, setBookmarks] = useState(
    () => JSON.parse(localStorage.getItem("bookmarks")) || []
  );

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  return (
    <div className="py-14 px-4 max-w-6xl mx-auto">
      <h2 className="text-center text-4xl font-extrabold text-primary mb-8 flex items-center justify-center gap-2">
        <MdBookmarkAdded className="text-4xl text-secondary" />
        Your Bookmarked Meals
      </h2>

      {bookmarks?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookmarks.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-accent mt-12">
          You haven't bookmarked any meals yet.
        </p>
      )}
    </div>
  );
};

export default Bookmarked;
