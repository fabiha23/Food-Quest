import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div>
      <header className="bg-base-100 sticky top-0 shadow-lg z-50">
        <header className="max-w-7xl xl:mx-auto xl:px-2 lg:px-6 mx-3">
          <Navbar></Navbar>
        </header>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default RootLayout;
