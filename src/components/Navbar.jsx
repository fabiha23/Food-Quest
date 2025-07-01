import React, { useState } from "react";
import { IoMenu, IoMoonOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { SiGreasyfork } from "react-icons/si";
import { Link, NavLink } from "react-router";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `mr-3 ${
              isActive ? "text-primary" : "text-accent hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <ScrollLink
          to="random"
          smooth={true}
          duration={500}
          offset={-70}
          className="text-accent hover:text-primary cursor-pointer"
        >
          Random Meals
        </ScrollLink>
      </li>
      <li>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            `mr-3 ${
              isActive ? "text-primary" : "text-accent hover:text-primary"
            }`
          }
        >
          Bookmarks
        </NavLink>
      </li>
      <li>
        <ScrollLink
          to="featured"
          smooth={true}
          duration={500}
          offset={-70}
          className="text-accent hover:text-primary cursor-pointer"
        >
          Featured Meals
        </ScrollLink>
      </li>
    </>
  );

  return (
    <nav className="relative z-50">
      <div className="flex justify-between items-center py-5">
        {/* Logo */}
        <div>
          <Link to="/">
            <h1 className=" sm:text-2xl text-xl font-bold flex items-center gap-1">
              <SiGreasyfork color="#8a914d"/>
             <span className="text-primary">Food</span><span className="text-secondary">Quest</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden xl:flex text-lg font-bold">
          <ul className="flex gap-10 items-center">{links}</ul>
        </div>

        {/* Mobile Toggle */}
        <div
          className="xl:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <RxCross2 size={32} /> : <IoMenu size={32} />}
        </div>

        {/* Mobile Nav */}
        <ul
          className={`fixed top-0 left-0 w-2/3 md:w-1/2 lg:w-1/3 h-screen bg-base-300 backdrop-blur-xl p-10 space-y-7 text-xl font-semibold text-accent transform transition-transform duration-500 ${
            open ? "translate-x-0" : "-translate-x-full"
          } xl:hidden`}
        >
          {links}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
