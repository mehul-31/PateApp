import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Background from "./Background"; // Your animated background

function Layout() {
  return (
    <div>
      <Background />
      <Navbar />
      <main className="relative z-10 px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
