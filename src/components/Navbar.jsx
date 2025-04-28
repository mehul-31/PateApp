import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex gap-6 justify-center py-4 bg-white/10 backdrop-blur-md shadow-md border-b border-white/20 text-white">
      <NavLink
        to="/"
        className="text-[#000000] hover:text-white transition-all duration-300"
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className="text-[#000000] hover:text-white transition-all duration-300"
      >
        Pastes
      </NavLink>
    </nav>
  );
}

export default Navbar;
