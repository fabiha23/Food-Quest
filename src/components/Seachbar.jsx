import React from "react";
import { IoSearch } from "react-icons/io5";

const Seachbar = ({searchText,handleSearch}) => {
  return (
      <div className="relative sm:w-2/3 mx-auto shadow-lg shadow-base-300  mt-6">
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        className="bg-base-100 w-full sm:pl-6 pl-3 sm:py-5 py-4 rounded-lg text-accent sm:text-lg focus:outline-base-300 focus:outline-2"
        placeholder="Find what do you want to cook today"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 py-3 sm:px-5 px-3 rounded-md bg-secondary hover:bg-error duration-300 cursor-pointer">
        <IoSearch className="text-base-100 text-xl sm:text-3xl" />
      </button>
    </div>
  );
};

export default Seachbar;
